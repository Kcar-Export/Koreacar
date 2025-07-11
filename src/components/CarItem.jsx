import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import placeHolderImage from '../assets/placeholder_image.jpg';
import { moneyFormatter } from '../utils/moneyFormatter';

const CarItem = ({ car }) => {
  const location = useLocation();

  // Build proxied image URL from car.seq if available
  let imageUrl = placeHolderImage;
  if (car.seq && typeof car.seq === 'string' && car.seq.length >= 5) {
    const first5 = car.seq.slice(0, 5);
    const originalUrl = `https://photo5.autosale.co.kr/car_large/NC${first5}/NC${car.seq}_1.jpg`;
    imageUrl = `https://koreacar-backend.onrender.com/image-proxy?url=${encodeURIComponent(originalUrl)}`;
  }

  const onError = (event) => {
    event.target.src = placeHolderImage;
  };

  const detailsLink = car.seq ? {
    pathname: `/car_details/${car.seq}`,
    state: { 
      from: location.pathname + location.search,
      filter: location.state?.filter || {},
      page: location.state?.page || 1
    }
  } : "#";

  return (
    <li className="bg-white rounded-md overflow-hidden shadow-sm hover:shadow-md transition duration-200 w-full">
      
      {/* Image section with clickable link */}
      <Link
        to={detailsLink}
        className="block overflow-hidden group"
      >
        <img
          src={imageUrl}
          onError={onError}
          alt={car.title || car.model}
          className="w-full h-auto aspect-[4/3] object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </Link>

      {/* Text details */}
      <div className="txt p-3">

        <div className="car1 text-gray-900 font-bold text-base">
          {/* Show only the first word of the title, or model if no title */}
          {(car.title ? car.title.split(' ')[0] : (car.model ? car.model.split(' ')[0] : ''))}
        </div>

        <div className="car2 text-gray-800 text-sm">
          {car.model ? car.model.split(' ').slice(1).join(' ') : ''}
        </div>

        <div className="etc text-sm text-gray-500 mt-1">
          {car.manufacturer_year || 'N/A'}&nbsp;ㆍ&nbsp;
          {car.mileage && !isNaN(Number(car.mileage.toString().replace(/,/g, '')))
            ? `${Number(car.mileage.toString().replace(/,/g, '')).toLocaleString()} KM`
            : (car.mileage ? `${car.mileage} KM` : 'N/A')}
          &nbsp;ㆍ&nbsp;
          {car.transmission || 'Automatic'}
        </div>

        <div className="moneyout mt-2">
          <span className="money text-red-600 font-semibold text-lg">
            {moneyFormatter(car.price)}
          </span>
          <span className="manwon text-sm text-gray-600"> won</span>
        </div>

        {/* View Details Button */}
        <div className="mt-3">
          <Link
            to={detailsLink}
            className={`text-white ${car.seq ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'} px-4 py-1.5 rounded text-sm inline-block w-full text-center`}
            tabIndex={car.seq ? 0 : -1}
            aria-disabled={!car.seq}
          >
            View Details
          </Link>
        </div>

      </div>
    </li>
  );
};

export default CarItem;