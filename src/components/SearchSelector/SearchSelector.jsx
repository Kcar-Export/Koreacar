import React, { useState } from 'react';
import KarabaFilter from '../KarabaFilter/KarabaFilter';
import styles from './SearchSelector.module.css';

const SearchSelector = ({ onFilterChange }) => { // Accept the prop
  const [searchType, setSearchType] = useState('advanced');

  return (
    <div className={styles.searchSelector}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${searchType === 'advanced' ? styles.active : ''}`}
          onClick={() => setSearchType('advanced')}
        >
          Advanced Search
        </button>
        <button
          className={`${styles.tabButton} ${searchType === 'vin' ? styles.active : ''}`}
          onClick={() => setSearchType('vin')}
        >
          VIN Search
        </button>
      </div>
      
      <div className={styles.searchContent}>
        {searchType === 'advanced' ? (
          <KarabaFilter onFilterChange={onFilterChange} /> // Pass the prop down
        ) : (
          <div>VIN Search Form</div>
        )}
      </div>
    </div>
  );
};

export default SearchSelector;