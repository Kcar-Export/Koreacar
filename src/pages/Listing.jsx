import React, { useState } from 'react';
import CarList from '../components/CarList';
import KarabaFilter from '../components/KarabaFilter/KarabaFilter';

const Listing = () => {
  const [filter, setFilter] = useState(null);

  return (
    <div className="max-w-7xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Available Cars</h1>
      <KarabaFilter onFilterChange={setFilter} />
      <CarList filter={filter} />
    </div>
  );
};

export default Listing;