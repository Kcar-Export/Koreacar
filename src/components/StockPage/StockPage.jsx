import React, { useState, useEffect } from 'react';
import KarabaFilter from './KarabaFilter';
import CarList from './CarList';
import styles from './StockPage.module.css';

const StockPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState({});
  const [sortOption, setSortOption] = useState('latest');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
      if (window.innerWidth >= 992) {
        setShowMobileFilters(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // Here you would typically fetch filtered data from your API
  };

  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  return (
    <div className={styles.stockPage}>
      {/* Mobile Filter Toggle Button */}
      {isMobile && (
        <button className={styles.mobileFilterToggle} onClick={toggleMobileFilters}>
          {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      )}

      <div className={`${styles.container} ${showMobileFilters ? styles.showFilters : ''}`}>
        {/* Filter Sidebar - shown on desktop or when mobile filters are toggled */}
        <div className={styles.filterSidebar}>
          <KarabaFilter onFilterChange={handleFilterChange} />
        </div>

        {/* Main Content Area */}
        <div className={styles.mainContent}>
          {/* Sort Options */}
          <div className={styles.sortOptions}>
            <span>Sort by:</span>
            <select 
              value={sortOption} 
              onChange={(e) => setSortOption(e.target.value)}
              className={styles.sortSelect}
            >
              <option value="latest">Latest Added</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="year_desc">Year: New to Old</option>
              <option value="year_asc">Year: Old to New</option>
              <option value="mileage_asc">Mileage: Low to High</option>
              <option value="mileage_desc">Mileage: High to Low</option>
            </select>
          </div>

          {/* Car List */}
          <CarList filters={filters} sortOption={sortOption} />

          {/* Pagination would go here */}
          <div className={styles.pagination}>
            <button className={styles.paginationButton}>Previous</button>
            <span className={styles.pageNumber}>Page 1 of 10</span>
            <button className={styles.paginationButton}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockPage;