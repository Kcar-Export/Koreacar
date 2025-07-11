const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());

// MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'kcarexport',
  database: 'car_listings',
});

// Get all cars
app.get('/cars', async (req, res) => {
  console.log('Received query parameters:', req.query);
  try {
    const {
      ord_chk,
      caryear1,
      caryear2,
      oil_type,
      cartype,
      carmoney1,
      carmoney2,
      carauto,
      carcolor,
      carkm1,
      carkm2,
      keyword,
      manufacturer,
      series,
      model
    } = req.query;

    let query = 'SELECT * FROM karaba_cars WHERE 1=1';
    const params = [];

    // Improved Manufacturer/Series/Model filtering
if (manufacturer) {
  query += ' AND title LIKE ?';
  params.push(`%${manufacturer}%`);
}


    if (series) {
      query += ' AND model LIKE ?';
      params.push(`%${series}%`);
    }

    if (model) {
      query += ' AND model LIKE ?';
      params.push(`%${model}%`);
    }

    // Year filters
    if (caryear1 && caryear1 !== '0') {
      query += ' AND manufacturer_year >= ?';
      params.push(caryear1);
    }
    if (caryear2 && caryear2 !== '0') {
      query += ' AND manufacturer_year <= ?';
      params.push(caryear2);
    }

    // Fuel type mapping
    if (oil_type) {
      const fuelMap = {
        '1': 'Gasoline',
        '2': 'Diesel',
        '3': 'LPG',
        '4': 'Electric',
        '5': 'CNG',
        '6': 'Hybrid',
        '7': 'Hydrogen',
        '8': 'Other'
      };
      const fuelValue = fuelMap[oil_type];
      if (fuelValue) {
        query += ' AND fuel = ?';
        params.push(fuelValue);
      }
    }

    // Car type
    if (cartype) {
      query += ' AND cartype = ?';
      params.push(cartype);
    }

    // Price range
    if (carmoney1) {
      query += ' AND price >= ?';
      params.push(carmoney1);
    }
    if (carmoney2) {
      query += ' AND price <= ?';
      params.push(carmoney2);
    }

    // Transmission mapping
    if (carauto) {
      const transMap = {
        '오토': 'Automatic',
        '세미오토': 'Semi-Auto',
        '수동': 'Manual(stick)',
        '무단변속기': 'Single Gear Trans',
        '기타': 'Other'
      };
      const transValue = transMap[carauto];
      if (transValue) {
        query += ' AND transmission = ?';
        params.push(transValue);
      }
    }

    // Color mapping
    if (carcolor) {
      const colorMap = {
        '검정': 'Black',
        '청색': 'Blue',
        '은색': 'Silver',
        '흰색': 'White',
        '빨강': 'Red',
        '회색': 'Gray',
        '금색': 'Gold',
        '남색': 'Navy Blue',
        '분홍': 'Pink',
        '보라': 'Purple',
        '청회': 'Blue Gray',
        '진회': 'Charcoal Gray'
      };
      const colorValue = colorMap[carcolor];
      if (colorValue) {
        query += ' AND color = ?';
        params.push(colorValue);
      }
    }

    // Mileage range (remove commas and cast to number)
    if (carkm1) {
      query += ' AND CAST(REPLACE(mileage, ",", "") AS UNSIGNED) >= ?';
      params.push(carkm1);
    }
    if (carkm2) {
      query += ' AND CAST(REPLACE(mileage, ",", "") AS UNSIGNED) <= ?';
      params.push(carkm2);
    }

    // Keyword search
    if (keyword) {
      query += ' AND (title LIKE ? OR model LIKE ?)';
      params.push(`%${keyword}%`, `%${keyword}%`);
    }

    // Order by
    switch (ord_chk) {
      case '0': // recent models
        query += ' ORDER BY manufacturer_year DESC';
        break;
      case '1': // later models
        query += ' ORDER BY manufacturer_year ASC';
        break;
      case '2': // lowest mileage
        query += ' ORDER BY CAST(REPLACE(mileage, ",", "") AS UNSIGNED) ASC';
        break;
      case '3': // highest mileage
        query += ' ORDER BY CAST(REPLACE(mileage, ",", "") AS UNSIGNED) DESC';
        break;
      case '4': // lowest to highest prices
        query += ' ORDER BY price ASC';
        break;
      case '5': // highest to lowest prices
        query += ' ORDER BY price DESC';
        break;
      case '6': // most recently registered
        query += ' ORDER BY scraped_at DESC';
        break;
      default:
        query += ' ORDER BY manufacturer_year DESC';
    }

    const [rows] = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get car by seq (primary key)
app.get('/cars/:seq', async (req, res) => {
  const carSeq = req.params.seq;
  try {
    const [rows] = await pool.query('SELECT * FROM karaba_cars WHERE seq = ?', [carSeq]);
    res.json(rows[0] || null);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Image Proxy Route to bypass CORS on image URLs
app.get('/image-proxy', async (req, res) => {
  const imageUrl = req.query.url;
  if (!imageUrl) return res.status(400).send('Missing image URL');

  try {
    const response = await fetch(imageUrl);
    if (!response.ok) return res.status(500).send('Failed to fetch image');

    res.setHeader('Content-Type', response.headers.get('Content-Type'));
    const buffer = await response.arrayBuffer();
    res.send(Buffer.from(buffer));
  } catch (err) {
    console.error('Image proxy error:', err);
    res.status(500).send('Error fetching image');
  }
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`✅ Backend API running at http://localhost:${PORT}`);
});