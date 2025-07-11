import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import CarList from '../components/CarList';
import KarabaFilter from '../components/KarabaFilter/KarabaFilter';
import Buy from '../components/Buy';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState(() => {
    // Initialize filter from URL params
    const params = {};
    searchParams.forEach((value, key) => {
      // Skip 'page' parameter as it's handled by CarList
      if (key !== 'page') {
        params[key] = value;
      }
    });
    return params;
  });

  const handleFilterChange = (filterParams) => {
    const newFilter = { ...filter, ...filterParams };
    setFilter(newFilter);
    
    // Update URL with new filter params (remove empty values)
    const updatedParams = new URLSearchParams();
    Object.entries(newFilter).forEach(([key, value]) => {
      if (value && value !== '' && value !== '0') {
        updatedParams.set(key, value);
      }
    });
    setSearchParams(updatedParams);
  };

  const handleManufacturerFilterChange = (manufacturerParams) => {
    const newFilter = { ...filter, ...manufacturerParams };
    setFilter(newFilter);
    
    // Update URL with manufacturer filter params
    const updatedParams = new URLSearchParams();
    Object.entries(newFilter).forEach(([key, value]) => {
      if (value && value !== '' && value !== '0') {
        updatedParams.set(key, value);
      }
    });
    setSearchParams(updatedParams);
  };

  return (
    <div className="w-full bg-gray-50 pb-10">
      <div className="w-full bg-white shadow-md py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto">
          <KarabaFilter 
            onFilterChange={handleFilterChange}
            onManufacturerChange={handleManufacturerFilterChange}
          />
        </div>
      </div>

      <div className="w-full bg-white pt-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto">
          <CarList filter={filter} />
        </div>
      </div>

      <Buy />
     
    
      <div className="text-center my-8">
        <Link
          to="/about"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Learn more about us
        </Link>
      </div>
    </div>
  );
};

export default Home;