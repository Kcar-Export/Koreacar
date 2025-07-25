import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CarItem from './CarItem';
import Papa from 'papaparse'; // CSV parsing library

const ITEMS_PER_PAGE = 20;

const CarList = ({ filter }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [allCars, setAllCars] = useState([]); // All cars from CSV
  const [filteredCars, setFilteredCars] = useState([]); // Filtered cars
  const [pageWindowStart, setPageWindowStart] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize currentPage from URL or default to 1
  const searchParams = new URLSearchParams(location.search);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get('page')) || 1
  );

  // When page changes, update URL
  const updatePage = (page) => {
    setCurrentPage(page);
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set('page', page);
    navigate({ search: newSearchParams.toString() }, { replace: true });
  };

  // Load and parse CSV data
  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      setError(null);

      try {
        // Using public URL path instead of absolute path
        const response = await fetch('/karaba.csv');
        const text = await response.text();
        
        // Parse CSV text to JSON
Papa.parse(text, {
  header: false,
  dynamicTyping: true,
  skipEmptyLines: true,
  complete: (results) => {
    // Map each row to an object with correct keys
    const keys = [
      'seq', 'safe_url', 'title', 'summary', 'price', 'model', 'manufacturer_year', 'transmission', 'color',
      'year', 'mileage', 'fuel', 'plate', 'accidents', 'features', 'image_urls', 'scraped_at'
    ];
    const cars = results.data.map(row => {
      const obj = {};
      keys.forEach((key, idx) => obj[key] = row[idx]);
      return obj;
    });
    setAllCars(cars);
  }
});
      } catch (err) {
        console.error('❌ Error loading CSV:', err);
        setError('Failed to load car data');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Apply filtering whenever filter changes or allCars updates
useEffect(() => {
  if (!allCars.length) return;

  let result = [...allCars];

  const colorMap = {
    '베이지': 'Beige',
    '검정': 'Black',
    '검쥐': 'Black Gray',
    '흑장': 'Black Rose',
    '검투': 'Black Two Tone',
    '청색': 'Blue',
    '청회': 'Blue Gray',
    '청투': 'Blue Two Tone',
    '진녹': 'Bottle Green',
    '벽돌': 'Brick Red',
    '갈색': 'Brown',
    '갈투': 'Brown Two Tone',
    '진회': 'Charcoal Gray',
    '밤색': 'Chestnut',
    '쥐색': 'Dark Gray',
    '진청': 'Dark Blue',
    '청옥': 'Emerald',
    '금색': 'Gold',
    '금투': 'Gold Two Tone',
    '회색': 'Gray',
    '회투': 'Gray Two Tone',
    '녹색': 'Green',
    '녹투': 'Green Two Tone',
    '카키': 'Khaki',
    '갈대': 'Light Brown',
    '연금': 'Light Gold',
    '명은': 'Light Silver Blue',
    '겨자': 'Mustard',
    '남색': 'Navy Blue',
    '남투': 'Navy Blue Two Tone',
    '황토': 'Ocher',
    '주황': 'Orange',
    '담녹': 'Pale Green',
    '진주': 'Pearl',
    '진투': 'Pearl Two Tone',
    '분홍': 'Pink',
    '보라': 'Purple',
    '빨강': 'Red',
    '빨투': 'Red Two Tone',
    '자주': 'Reddish Purple',
    '군청': 'Sea Blue',
    '은색': 'Silver',
    '은회': 'Silver Gray',
    '은하': 'Silver Sky Blue',
    '은투': 'Silver Two Tone',
    '하늘': 'Sky Blue',
    '흰색': 'White',
    '흰투': 'White Two Tone',
    '노란': 'Yellow',
    '연두': 'Yellow Green'
  };

  if (filter) {
    // Manufacturer
    if (filter.manufacturer) {
      result = result.filter(car =>
        car.title && car.title.toLowerCase().includes(filter.manufacturer.toLowerCase())
      );
    }
    // Series
    if (filter.series) {
      result = result.filter(car =>
        car.model && car.model.toLowerCase().includes(filter.series.toLowerCase())
      );
    }
    // Model
    if (filter.model) {
      result = result.filter(car =>
        car.model && car.model.toLowerCase().includes(filter.model.toLowerCase())
      );
    }
    // Year range
    if (filter.caryear1 && filter.caryear1 !== '0') {
      result = result.filter(car =>
        car.manufacturer_year && parseInt(car.manufacturer_year) >= parseInt(filter.caryear1)
      );
    }
    if (filter.caryear2 && filter.caryear2 !== '0') {
      result = result.filter(car =>
        car.manufacturer_year && parseInt(car.manufacturer_year) <= parseInt(filter.caryear2)
      );
    }
    // Fuel type
    if (filter.oil_type) {
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
      result = result.filter(car =>
        car.fuel && car.fuel.toLowerCase() === fuelMap[filter.oil_type].toLowerCase()
      );
    }
    // Price range
    if (filter.carmoney1) {
      result = result.filter(car =>
        car.price && parseInt(car.price) >= parseInt(filter.carmoney1) * 10000
      );
    }
    if (filter.carmoney2) {
      result = result.filter(car =>
        car.price && parseInt(car.price) <= parseInt(filter.carmoney2) * 10000
      );
    }
    // Transmission
    if (filter.carauto) {
      const transMap = {
        '오토': 'Automatic',
        '세미오토': 'Semi-Auto',
        '수동': 'Manual(stick)',
        '무단변속기': 'Single Gear Trans',
        '기타': 'Other'
      };
      result = result.filter(car =>
        car.transmission && car.transmission === transMap[filter.carauto]
      );
    }
    // Color
if (filter.carcolor) {
  const colorValue = colorMap[filter.carcolor] || filter.carcolor;
  result = result.filter(car =>
    car.color && car.color.includes(colorValue)
  );
}
    // Mileage range
    if (filter.carkm1) {
      result = result.filter(car => {
        const km = parseInt((car.mileage || '').toString().replace(/,/g, '').replace(/[^0-9]/g, ''));
        return !isNaN(km) && km >= parseInt(filter.carkm1);
      });
    }
    if (filter.carkm2) {
      result = result.filter(car => {
        const km = parseInt((car.mileage || '').toString().replace(/,/g, '').replace(/[^0-9]/g, ''));
        return !isNaN(km) && km <= parseInt(filter.carkm2);
      });
    }
    // Keyword
    if (filter.keyword) {
      result = result.filter(car =>
        (car.title && car.title.toLowerCase().includes(filter.keyword.toLowerCase())) ||
        (car.model && car.model.toLowerCase().includes(filter.keyword.toLowerCase()))
      );
    }
  }
  // Sorting
switch (filter.ord_chk) {
  case '4': // lowest to highest prices
    result.sort((a, b) => parseInt(a.price) - parseInt(b.price));
    break;
  case '5': // highest to lowest prices
    result.sort((a, b) => parseInt(b.price) - parseInt(a.price));
    break;
  case '2': // lowest mileage
    result.sort((a, b) =>
      parseInt((a.mileage || '').replace(/,/g, '').replace(/[^0-9]/g, '')) -
      parseInt((b.mileage || '').replace(/,/g, '').replace(/[^0-9]/g, ''))
    );
    break;
  case '3': // highest mileage
    result.sort((a, b) =>
      parseInt((b.mileage || '').replace(/,/g, '').replace(/[^0-9]/g, '')) -
      parseInt((a.mileage || '').replace(/,/g, '').replace(/[^0-9]/g, ''))
    );
    break;
  case '1': // later models
    result.sort((a, b) => parseInt(a.manufacturer_year) - parseInt(b.manufacturer_year));
    break;
  case '0': // recent models
    result.sort((a, b) => parseInt(b.manufacturer_year) - parseInt(a.manufacturer_year));
    break;
  case '6': // most recently registered
    result.sort((a, b) => new Date(b.scraped_at) - new Date(a.scraped_at));
    break;
  default:
    break;
}

  setFilteredCars(result);

  // Reset pagination to first page when filters change
  setCurrentPage(1);
  setPageWindowStart(1);
}, [filter, allCars]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredCars.length / ITEMS_PER_PAGE);
  const pageWindowEnd = Math.min(pageWindowStart + 4, totalPages);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCars = filteredCars.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  // Pagination handlers (same as before)
  const handlePrev = () => {
    const newPage = Math.max(currentPage - 1, 1);
    updatePage(newPage);
    if (newPage < pageWindowStart) {
      setPageWindowStart(Math.max(pageWindowStart - 5, 1));
    }
  };

  const handleNext = () => {
    const newPage = Math.min(currentPage + 1, totalPages);
    updatePage(newPage);
    if (newPage > pageWindowEnd) {
      setPageWindowStart(pageWindowStart + 5);
    }
  };

  const handlePageClick = (page) => {
    updatePage(page);
  };

  const handleWindowBack = () => {
    setPageWindowStart(Math.max(pageWindowStart - 5, 1));
  };

  const handleWindowNext = () => {
    if (pageWindowEnd < totalPages) {
      setPageWindowStart(pageWindowStart + 5);
    }
  };

  return (
    <div className="px-4">
      {loading && <p className="text-center py-4">Loading cars...</p>}
      {error && <p className="text-center py-4 text-red-600">{error}</p>}

      {!loading && !error && (
        <>
          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {paginatedCars.length > 0 ? (
              paginatedCars.map((car, idx) => (
                <CarItem key={car.seq || idx} car={car} />
              ))
            ) : (
              <p className="col-span-full text-center py-4">No cars found.</p>
            )}
          </ul>

          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-6 gap-2 text-sm flex-wrap">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-40"
              >
                Prev
              </button>

              {pageWindowStart > 1 && (
                <button
                  onClick={handleWindowBack}
                  className="px-3 py-1 border rounded hover:bg-gray-100"
                >
                  ◀
                </button>
              )}

              {Array.from({ length: pageWindowEnd - pageWindowStart + 1 }, (_, i) => {
                const pageNum = pageWindowStart + i;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageClick(pageNum)}
                    className={`px-3 py-1 rounded border ${
                      currentPage === pageNum
                        ? 'bg-black text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {pageWindowEnd < totalPages && (
                <button
                  onClick={handleWindowNext}
                  className="px-3 py-1 border rounded hover:bg-gray-100"
                >
                  ▶
                </button>
              )}

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CarList;