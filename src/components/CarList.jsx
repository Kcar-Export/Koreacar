import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CarItem from './CarItem';

const ITEMS_PER_PAGE = 20;

const CarList = ({ filter }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
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

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      Object.entries(filter || {}).forEach(([key, value]) => {
        if (value !== '' && value !== '0' && value != null) {
          params.append(key, value);
        }
      });

      // Preserve page in URL params if it exists
      if (searchParams.get('page')) {
        params.set('page', searchParams.get('page'));
      }

      console.log('Fetching cars with params:', params.toString());
      try {
        const res = await fetch(`http://localhost:4000/cars?${params.toString()}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setCars(data);
        
        // Only reset pagination if it's a new filter search
        if (!location.search.includes('page=')) {
          setCurrentPage(1);
          setPageWindowStart(1);
        }
      } catch (err) {
        console.error('Error fetching cars:', err);
        setError('Failed to load cars');
        setCars([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [filter, location.search]);

  const totalPages = Math.ceil(cars.length / ITEMS_PER_PAGE);
  const pageWindowEnd = Math.min(pageWindowStart + 4, totalPages);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCars = cars.slice(startIdx, startIdx + ITEMS_PER_PAGE);

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

