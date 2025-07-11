// src/pages/Listing.jsx
import React, { useEffect, useState } from 'react';
import CarList from '../components/CarList'; // adjust path if needed

const Listing = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://koreacar-backend.onrender.com/cars')
      .then(res => res.json())
      .then(data => {
        setCars(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch cars:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-10">Loading car listings...</div>;
  if (cars.length === 0) return <div className="text-center mt-10">No cars found.</div>;

  return (
    <div className="max-w-7xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Available Cars</h1>
      <CarList cars={cars} />
    </div>
  );
};

export default Listing;
