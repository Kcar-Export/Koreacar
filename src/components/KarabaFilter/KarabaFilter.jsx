import React, { useState } from 'react';
import styles from './KarabaFilter.module.css';
import ManufacturerList from '../ManufacturerList/ManufacturerList';
import Papa from 'papaparse';

const KarabaFilter = ({ onFilterChange }) => {
  const initialFormData = {
    m: 'sale',
    s: 'list',
    ord_chk: '0',
    caryear1: '0',
    caryear2: '0',
    oil_type: '',
    cartype: '',
    carmoney1: '',
    carmoney2: '',
    carauto: '',
    carcolor: '',
    carkm1: '',
    carkm2: '',
    keyword: ''
  };

  const initialManufacturerFilter = {
    manufacturer: '',
    series: '',
    model: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [manufacturerFilter, setManufacturerFilter] = useState(initialManufacturerFilter);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch filtered cars from CSV
  const fetchFilteredCars = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/karaba.csv');
      const text = await response.text();

      Papa.parse(text, {
        header: false,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          const keys = [
            'seq', 'safe_url', 'title', 'summary', 'price', 'model', 'manufacturer_year', 'transmission', 'color',
            'year', 'mileage', 'fuel', 'plate', 'accidents', 'features', 'image_urls', 'scraped_at'
          ];
          const cars = results.data.map(row => {
            const obj = {};
            keys.forEach((key, idx) => obj[key] = row[idx]);
            return obj;
          });

          let filtered = cars;

          // Manufacturer, series, model
          if (manufacturerFilter.manufacturer) {
            filtered = filtered.filter(car =>
              car.title && car.title.toLowerCase().includes(manufacturerFilter.manufacturer.toLowerCase())
            );
          }
          if (manufacturerFilter.series) {
            filtered = filtered.filter(car =>
              car.model && car.model.toLowerCase().includes(manufacturerFilter.series.toLowerCase())
            );
          }
          if (manufacturerFilter.model) {
            filtered = filtered.filter(car =>
              car.model && car.model.toLowerCase().includes(manufacturerFilter.model.toLowerCase())
            );
          }

          // Year range
          if (formData.caryear1 && formData.caryear1 !== '0') {
            filtered = filtered.filter(car =>
              car.manufacturer_year && parseInt(car.manufacturer_year) >= parseInt(formData.caryear1)
            );
          }
          if (formData.caryear2 && formData.caryear2 !== '0') {
            filtered = filtered.filter(car =>
              car.manufacturer_year && parseInt(car.manufacturer_year) <= parseInt(formData.caryear2)
            );
          }

          // Fuel type
          if (formData.oil_type) {
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
            filtered = filtered.filter(car =>
              car.fuel && car.fuel.toLowerCase() === fuelMap[formData.oil_type].toLowerCase()
            );
          }

          // Price range
          if (formData.carmoney1) {
            filtered = filtered.filter(car =>
              car.price && parseInt(car.price) >= parseInt(formData.carmoney1) * 10000
            );
          }
          if (formData.carmoney2) {
            filtered = filtered.filter(car =>
              car.price && parseInt(car.price) <= parseInt(formData.carmoney2) * 10000
            );
          }

          // Transmission
          if (formData.carauto) {
            const transMap = {
              '오토': 'Automatic',
              '세미오토': 'Semi-Auto',
              '수동': 'Manual(stick)',
              '무단변속기': 'Single Gear Trans',
              '기타': 'Other'
            };
            filtered = filtered.filter(car =>
              car.transmission && car.transmission === transMap[formData.carauto]
            );
          }

          // Color
          if (formData.carcolor) {
            filtered = filtered.filter(car =>
              car.color && car.color.includes(formData.carcolor)
            );
          }

          // Mileage range
          if (formData.carkm1) {
            filtered = filtered.filter(car => {
              const km = parseInt((car.mileage || '').toString().replace(/,/g, '').replace(/[^0-9]/g, ''));
              return !isNaN(km) && km >= parseInt(formData.carkm1);
            });
          }
          if (formData.carkm2) {
            filtered = filtered.filter(car => {
              const km = parseInt((car.mileage || '').toString().replace(/,/g, '').replace(/[^0-9]/g, ''));
              return !isNaN(km) && km <= parseInt(formData.carkm2);
            });
          }

          // Keyword
          if (formData.keyword) {
            filtered = filtered.filter(car =>
              (car.title && car.title.toLowerCase().includes(formData.keyword.toLowerCase())) ||
              (car.model && car.model.toLowerCase().includes(formData.keyword.toLowerCase()))
            );
          }

          onFilterChange({ ...formData, ...manufacturerFilter });
        },
        error: (err) => {
          console.error('Error parsing CSV:', err);
          setError('Failed to parse car data. Please try again.');
        }
      });
    } catch (err) {
      console.error('Error fetching filtered data:', err);
      setError('Failed to load cars. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOrderChange = (orderValue) => {
    setFormData(prev => ({ ...prev, ord_chk: orderValue }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleManufacturerChange = (mf) => {
    setManufacturerFilter(mf);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchFilteredCars();
  };

  // Function to reset all filters
  const handleReset = () => {
    setFormData(initialFormData);
    setManufacturerFilter(initialManufacturerFilter);
    onFilterChange({ ...initialFormData, ...initialManufacturerFilter });
  };

  return (
    <form name="homecarlist" className={styles.filterForm} onSubmit={handleSubmit}>
      <input type="hidden" name="m" value={formData.m} />
      <input type="hidden" name="s" value={formData.s} />
      <input type="hidden" name="ord_chk" value={formData.ord_chk} />

      {/* Order By Section */}
      <div className={styles.orderBar}>
        <ul>
          {[
            { value: '4', label: 'lowest to highest prices' },
            { value: '5', label: 'highest to lowest prices' },
            { value: '2', label: 'lowest mileage' },
            { value: '3', label: 'highest mileage' },
            { value: '1', label: 'later models' },
            { value: '0', label: 'recent models', active: formData.ord_chk === '0' },
            { value: '6', label: 'most recently registered' }
          ].map((item) => (
            <li key={item.value}>
              <button
                type="button"
                className={`${styles.orderLink} ${formData.ord_chk === item.value ? styles.active : ''}`}
                onClick={() => handleOrderChange(item.value)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Manufacturer and Model Selection - Made vertical for mobile */}
      <div className={styles.manufacturerContainer}>
        <ManufacturerList onManufacturerFilterChange={handleManufacturerChange} />
      </div>

      {/* Filter Options */}
      <div className={styles.filterOptions}>
        {/* Year Range */}
        <div className={styles.filterGroup}>
          <label>Year</label>
          <div className={styles.rangeSelect}>
            <select 
              name="caryear1" 
              className={styles.filterSelect}
              value={formData.caryear1}
              onChange={handleInputChange}
            >
              <option value="0">above</option>
              {Array.from({length: 21}, (_, i) => 2025 - i).map(year => (
                <option key={`min-${year}`} value={year}>{year} year</option>
              ))}
            </select>
            <span>-</span>
            <select 
              name="caryear2" 
              className={styles.filterSelect}
              value={formData.caryear2}
              onChange={handleInputChange}
            >
              <option value="0">below</option>
              {Array.from({length: 21}, (_, i) => 2025 - i).map(year => (
                <option key={`max-${year}`} value={year}>{year} year</option>
              ))}
            </select>
          </div>
        </div>

        {/* Fuel Type */}
        <div className={styles.filterGroup}>
          <label>Fuel</label>
          <select 
            name="oil_type" 
            className={styles.filterSelect}
            value={formData.oil_type}
            onChange={handleInputChange}
          >
            <option value="">:::choose one:::</option>
            <option value="1">Gasoline</option>
            <option value="2">Diesel</option>
            <option value="3">LPG</option>
            <option value="4">Electric</option>
            <option value="5">CNG</option>
            <option value="6">Hybrid</option>
            <option value="7">Hydrogen</option>
            <option value="8">Other</option>
          </select>
        </div>

        {/* Type of Car */}
        <div className={styles.filterGroup}>
          <label>Type of Car</label>
          <select 
            name="cartype" 
            className={styles.filterSelect}
            value={formData.cartype}
            onChange={handleInputChange}
          >
            <option value="">:::choose one:::</option>
            <option value="1">Subcompact</option>
            <option value="2">Compact</option>
            <option value="3">Small Midsized</option>
            <option value="4">Midsized</option>
            <option value="5">Large</option>
            <option value="6">RV/SUV</option>
            <option value="7">Sports Car</option>
          </select>
        </div>

        {/* Price Range */}
        <div className={styles.filterGroup}>
          <label>Price (Ten thousand won)</label>
          <div className={styles.rangeSelect}>
<select 
  name="carmoney1" 
  className={styles.filterSelect}
  value={formData.carmoney1}
  onChange={handleInputChange}
>
  <option value="">above</option>
  {[100, 200, 300, 400, 500, 600, 700, 800, 900, 
    1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 
    2000, 2500, 3000, 3500, 4000, 5000, 6000, 7000, 8000, 9000, 10000].map(value => {
      const wonValue = value;
      const usdValue = Math.round((value * 10000) / 1450).toLocaleString();
      return (
        <option key={`min-${value}`} value={value}>
          {`${wonValue.toLocaleString()} 만원 / $${usdValue} USD`}
        </option>
      );
  })}
</select>
            <span>-</span>
<select 
  name="carmoney2" 
  className={styles.filterSelect}
  value={formData.carmoney2}
  onChange={handleInputChange}
>
  <option value="">below</option>
  {[100, 200, 300, 400, 500, 600, 700, 800, 900, 
    1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 
    2000, 2500, 3000, 3500, 4000, 5000, 6000, 7000, 8000, 9000, 10000].map(value => {
      const wonValue = value;
      const usdValue = Math.round((value * 10000) / 1450).toLocaleString();
      return (
        <option key={`max-${value}`} value={value}>
          {`${wonValue.toLocaleString()} 만원 / $${usdValue} USD`}
        </option>
      );
  })}
</select>
          </div>
        </div>

        {/* Transmission */}
        <div className={styles.filterGroup}>
          <label>Transmission</label>
          <select 
            name="carauto" 
            className={styles.filterSelect}
            value={formData.carauto}
            onChange={handleInputChange}
          >
            <option value="">:::choose one:::</option>
            <option value="오토">Automatic</option>
            <option value="세미오토">Semi-Auto</option>
            <option value="수동">Manual(stick)</option>
            <option value="무단변속기">Single Gear Trans</option>
            <option value="기타">Other</option>
          </select>
        </div>

        {/* Color */}
        <div className={styles.filterGroup}>
          <label>Color</label>
          <select 
            name="carcolor" 
            className={styles.filterSelect}
            value={formData.carcolor}
            onChange={handleInputChange}
          >
            <option value="">:::choose one:::</option>
            <option value="베이지">Beige</option>
            <option value="검정">Black</option>
            <option value="검쥐">Black Gray</option>
            <option value="흑장">Black Rose</option>
            <option value="검투">Black Two Tone</option>
            <option value="청색">Blue</option>
            <option value="청회">Blue Gray</option>
            <option value="청투">Blue Two Tone</option>
            <option value="진녹">Bottle Green</option>
            <option value="벽돌">Brick Red</option>
            <option value="갈색">Brown</option>
            <option value="갈투">Brown Two Tone</option>
            <option value="진회">Charcoal Gray</option>
            <option value="밤색">Chestnut</option>
            <option value="쥐색">Dark Gray</option>
            <option value="진청">Dark Blue</option>
            <option value="청옥">Emerald</option>
            <option value="금색">Gold</option>
            <option value="금투">Gold Two Tone</option>
            <option value="회색">Gray</option>
            <option value="회투">Gray Two Tone</option>
            <option value="녹색">Green</option>
            <option value="녹투">Green Two Tone</option>
            <option value="카키">Khaki</option>
            <option value="갈대">Light Brown</option>
            <option value="연금">Light Gold</option>
            <option value="명은">Light Silver Blue</option>
            <option value="겨자">Mustard</option>
            <option value="남색">Navy Blue</option>
            <option value="남투">Navy Blue Two Tone</option>
            <option value="황토">Ocher</option>
            <option value="주황">Orange</option>
            <option value="담녹">Pale Green</option>
            <option value="진주">Pearl</option>
            <option value="진투">Pearl Two Tone</option>
            <option value="분홍">Pink</option>
            <option value="보라">Purple</option>
            <option value="빨강">Red</option>
            <option value="빨투">Red Two Tone</option>
            <option value="자주">Reddish Purple</option>
            <option value="군청">Sea Blue</option>
            <option value="은색">Silver</option>
            <option value="은회">Silver Gray</option>
            <option value="은하">Silver Sky Blue</option>
            <option value="은투">Silver Two Tone</option>
            <option value="하늘">Sky Blue</option>
            <option value="흰색">White</option>
            <option value="흰투">White Two Tone</option>
            <option value="노란">Yellow</option>
            <option value="연두">Yellow Green</option>
          </select>
        </div>

        {/* Mileage Range */}
        <div className={styles.filterGroup}>
          <label>Mileage (Km)</label>
          <div className={styles.rangeSelect}>
            <select 
              name="carkm1" 
              className={styles.filterSelect}
              value={formData.carkm1}
              onChange={handleInputChange}
            >
              <option value="">above</option>
              {[1000, 5000, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 
                80000, 90000, 100000, 110000, 120000, 130000, 140000, 150000, 
                160000, 170000, 180000, 190000, 200000, 250000, 300000].map(value => (
                <option key={`min-${value}`} value={value}>
                  {value >= 1000 ? `${(value/1000).toFixed(0)},000` : value} Km
                </option>
              ))}
            </select>
            <span>-</span>
            <select 
              name="carkm2" 
              className={styles.filterSelect}
              value={formData.carkm2}
              onChange={handleInputChange}
            >
              <option value="">below</option>
              {[1000, 5000, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 
                80000, 90000, 100000, 110000, 120000, 130000, 140000, 150000, 
                160000, 170000, 180000, 190000, 200000, 250000, 300000].map(value => (
                <option key={`max-${value}`} value={value}>
                  {value >= 1000 ? `${(value/1000).toFixed(0)},000` : value} Km
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Keywords */}
        <div className={styles.filterGroup}>
          <label>Key words</label>
          <input 
            type="text" 
            name="keyword" 
            className={styles.keywordInput}
            value={formData.keyword}
            onChange={handleInputChange}
            placeholder="Enter keywords"
          />
        </div>

        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          <button 
            type="button" 
            className={styles.resetButton}
            onClick={handleReset}
          >
            RESET
          </button>
          <button 
            type="submit" 
            className={styles.searchButton}
            disabled={isLoading}
          >
            <i className={styles.searchIcon}></i>
            {isLoading ? 'SEARCHING...' : 'SEARCH'}
          </button>
        </div>

        {/* Error message */}
        {error && <div className={styles.errorMessage}>{error}</div>}
      </div>
    </form>
  );
};

export default KarabaFilter;