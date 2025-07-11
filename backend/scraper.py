import re, json, time, requests, subprocess, tempfile, os, sys
from pathlib import Path
from bs4 import BeautifulSoup
from typing import List, Dict, Optional, Set
import mysql.connector

TOR_SOCKS_PROXY = "socks5h://127.0.0.1:9050"
PROXIES = {
    "http": TOR_SOCKS_PROXY,
    "https": TOR_SOCKS_PROXY,
}

UA = "Mozilla/5.0 (Linux; Android 10)"
BASE_PAGE = "https://m.karaba.co.kr/?m=sale&s=list&p={page}"
BASE_DETAIL = "https://m.karaba.co.kr/?m=sale&s=detail&seq={seq}"
BASE_SAFE = "https://photo5.autosale.co.kr/safe.php?seq={seq}&t=kimko"

RE_CARD = re.compile(
    r'<a href="[^"]*seq=(\d+)">.*?<div class="cartitle">(.*?)</div>.*?'
    r'<div class="carinfo">(.*?)</div>.*?<div class="money">(.*?)<span',
    re.DOTALL
)

HEADERS = [
    "seq", "url", "title", "info", "price",
    "model", "registration_date", "transmission", "color",
    "manufacturer_year", "mileage", "fuel",
    "car_number", "accidents", "features", "image_urls"
]

# Path to your tor.exe
TOR_EXE_PATH = r"C:\Users\DELL\Downloads\tor-expert-bundle-windows-x86_64-14.5.4 (1)\tor\tor.exe"

def restart_tor():
    print("🔁 (Skipping Tor restart – already running)")
    try:
        subprocess.run(["taskkill", "/F", "/IM", "tor.exe"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    except Exception as e:
        print(f"Could not kill tor.exe: {e}")
    time.sleep(2)
    try:
        subprocess.Popen([TOR_EXE_PATH], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        print("Tor restarted.")
    except Exception as e:
        print(f"Could not start tor.exe: {e}")

def wget_fetch(url: str, tmp_path: str) -> bool:
    try:
        resp = requests.get(url, headers={"User-Agent": UA}, timeout=20, proxies=PROXIES)
        if resp.status_code == 200:
            with open(tmp_path, "wb") as f:
                f.write(resp.content)
            return True
        return False
    except Exception as e:
        print(f"wget_fetch error: {e}")
        return False

def parse_card(m: re.Match) -> dict:
    seq, title, info, price = m.groups()
    clean = lambda s: re.sub(r"<[^>]+>", "", s).strip().replace("\xa0", " ")
    return {
        "seq": seq,
        "url": BASE_SAFE.format(seq=seq),
        "title": clean(title),
        "info": clean(info),
        "price": re.sub(r"[^\d]", "", price)
    }

def fix_image_url(url: str) -> str:
    url = url.replace("car_small", "car_large").replace("car/", "car_large/")
    url = re.sub(r'/S([A-Z0-9]+_\d+\.jpg)', r'/\1', url)
    return url

def scrape_page_with_retry(page: int) -> List[Dict]:
    url = BASE_PAGE.format(page=page)
    while True:
        try:
            html = requests.get(
                url,
                headers={"User-Agent": UA},
                timeout=15,
                proxies=PROXIES
            ).text
            if "세션에러" in html:
                print(f"[Page {page}] ⚠️ 세션에러 detected. Restarting Tor...")
                restart_tor()
                time.sleep(20)
                continue
            return [parse_card(m) for m in RE_CARD.finditer(html)]
        except requests.RequestException as e:
            print(f"[Page {page}] ⚠️ {e}. Retrying in 60s...")
            time.sleep(60)

def scrape_detail(seq: str) -> Optional[Dict]:
    url = BASE_DETAIL.format(seq=seq)
    retries = 5
    tor_wait = 20
    tmp_fd, tmp_path = tempfile.mkstemp(suffix=".html")
    os.close(tmp_fd)

    for attempt in range(1, retries + 1):
        if not wget_fetch(url, tmp_path):
            print(f"[{seq}] ❌ wget failed ({attempt}/{retries})")
            restart_tor()
            time.sleep(tor_wait)
            continue

        with open(tmp_path, encoding="utf-8", errors="ignore") as f:
            html = f.read()

        if "detail_list" not in html or "carinfo" not in html:
            print(f"[{seq}] 🚫 not loaded ({attempt}/{retries})")
            restart_tor()
            time.sleep(tor_wait)
            continue

        soup = BeautifulSoup(html, "html.parser")
        table = soup.select_one("div.detail_list div.carinfo table")
        if not table:
            print(f"[{seq}] 🚫 table missing ({attempt}/{retries})")
            restart_tor()
            time.sleep(tor_wait)
            continue

        car_info = {}
        for row in table.select("tr"):
            tds = row.find_all("td")
            if len(tds) == 3:
                car_info[tds[0].get_text(strip=True)] = tds[2].get_text(strip=True)

        features = [
            span.get_text(strip=True)
            for span in soup.select("table.opouter td.on span")
        ]

        image_urls = []
        for div in soup.select("div.swiper-container.gallery-thumbs div.swiper-slide"):
            style = div.get("style", "")
            match = re.search(r'url\((.*?)\)', style)
            if match:
                img_url = fix_image_url(match.group(1))
                image_urls.append(img_url)

        extra_imgs = [
            fix_image_url(img['src'])
            for img in soup.select("div#smallimage img")
            if 'noimage' not in img.get('src', '')
        ]
        image_urls.extend(extra_imgs)

        os.remove(tmp_path)
        return {
            "model": car_info.get("Car model", ""),
            "registration_date": car_info.get("Registration Date", ""),
            "transmission": car_info.get("Transmission", ""),
            "color": car_info.get("Color", ""),
            "manufacturer_year": car_info.get("Manufacturer Year", ""),
            "mileage": car_info.get("Mileage (km)", ""),
            "fuel": car_info.get("Fuel", ""),
            "car_number": car_info.get("Car's Mumber", ""),
            "accidents": car_info.get("Accidents", ""),
            "features": ", ".join(features),
            "image_urls": ", ".join(image_urls)
        }

    os.remove(tmp_path)
    print(f"[{seq}] ❌ Failed after {retries} attempts.")
    return None

def get_mysql_connection():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='kcarexport',
        database='car_listings'
    )

def load_existing_seqs_mysql(cursor):
    cursor.execute("SELECT seq FROM karaba_cars")
    return {str(row[0]) for row in cursor.fetchall()}

def insert_car_to_mysql(cursor, row):
    cursor.execute("""
        INSERT IGNORE INTO karaba_cars (
            seq, url, title, info, price, model, registration_date, transmission,
            color, manufacturer_year, mileage, fuel, car_number, accidents,
            features, image_urls
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, (
        row.get('seq'),
        row.get('url'),
        row.get('title'),
        row.get('info'),
        row.get('price'),
        row.get('model'),
        row.get('registration_date'),
        row.get('transmission'),
        row.get('color'),
        row.get('manufacturer_year'),
        row.get('mileage'),
        row.get('fuel'),
        row.get('car_number'),
        row.get('accidents'),
        row.get('features'),
        row.get('image_urls'),
    ))

def main():
    conn = get_mysql_connection()
    cursor = conn.cursor()
    existing = load_existing_seqs_mysql(cursor)
    print(f"📄 MySQL already has {len(existing)} cars.")

    start_page = 1056

    for p in range(start_page, 3000):
        print(f"\n[Page {p}] Scraping list...")
        cards = scrape_page_with_retry(p)

        if not cards:
            print(f"[Page {p}] (empty) – stopping.")
            break

        new_rows = []
        for card in cards:
            if card["seq"] in existing:
                continue
            detail = scrape_detail(card["seq"])
            if not detail:
                print(f"[{card['seq']}] skipped (no detail)")
                continue
            row = {**card, **detail}
            insert_car_to_mysql(cursor, row)
            conn.commit()
            existing.add(card["seq"])
            print(json.dumps(row, ensure_ascii=False, indent=2))
            new_rows.append(row)

        if new_rows:
            print(f"[Page {p}] 💾 Inserted {len(new_rows)} rows into MySQL.")
        else:
            print(f"[Page {p}] All items already saved – skipping.")

        time.sleep(1)

    cursor.close()
    conn.close()

if __name__ == "__main__":
    main()