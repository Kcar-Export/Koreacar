import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import placeHolderImage from '../assets/placeholder_image.jpg';
import { moneyFormatter } from '../utils/moneyFormatter';

const CarItem = ({ car }) => {
  const location = useLocation();

  console.log('Car object:', car);
  console.log('car.image_urls:', car.image_urls);

  let imageUrl = placeHolderImage;

  if (car.image_urls && typeof car.image_urls === 'string') {
    const urls = car.image_urls.split(',').map(url => url.trim());
    const firstImage = urls[0];
    console.log('First image candidate:', firstImage);
    if (firstImage && firstImage.startsWith('http')) {
      imageUrl = firstImage;
    }
  } else if (car.seq && typeof car.seq === 'string' && car.seq.length >= 5) {
    const first5 = car.seq.slice(0, 5);
    imageUrl = `https://photo5.autosale.co.kr/car_large/NC${first5}/NC${car.seq}_1.jpg`;
    console.log('Fallback imageUrl from seq:', imageUrl);
  }

  console.log('Final imageUrl used:', imageUrl);

  const onError = (event) => {
    event.target.src = placeHolderImage;
  };

  const detailsLink = car.seq
    ? {
        pathname: `/car_details/${car.seq}`,
        state: {
          from: location.pathname + location.search,
          filter: location.state?.filter || {},
          page: location.state?.page || 1,
        },
      }
    : '#';

  return (
    <li className="bg-white rounded-md overflow-hidden shadow-sm hover:shadow-md transition duration-200 w-full">
      {/* Image with fallback and debug background */}
      <Link to={detailsLink} className="block overflow-hidden group">
        <img
          src={imageUrl}
          onError={onError}
          alt={car.title || car.model || 'Car'}
          referrerPolicy="no-referrer"
          className="w-full h-48 object-cover bg-gray-100 transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </Link>

      {/* Car details */}
      <div className="txt p-3">
        <div className="car1 text-gray-900 font-bold text-base">
          {car.title ? car.title.split(' ')[0] : car.model?.split(' ')[0] || ''}
        </div>

        <div className="car2 text-gray-800 text-sm">
          {car.model ? car.model.split(' ').slice(1).join(' ') : ''}
        </div>

        <div className="etc text-sm text-gray-500 mt-1">
          {car.manufacturer_year || 'N/A'}&nbsp;ㆍ&nbsp;
          {car.mileage && !isNaN(Number(car.mileage.toString().replace(/,/g, '')))
            ? `${Number(car.mileage.toString().replace(/,/g, '')).toLocaleString()} KM`
            : car.mileage ? `${car.mileage} KM` : 'N/A'}
          &nbsp;ㆍ&nbsp;
          {car.transmission || 'Automatic'}
        </div>

<div className="moneyout mt-2 flex justify-between items-center gap-3">
  {/* USD Price */}
  <div className="text-blue-700 font-medium text-sm">
    {`$${(car.price / 1400).toLocaleString(undefined, {
      maximumFractionDigits: 0,
    })} USD`}
  </div>

  {/* WON Price formatted to 만원 */}
  <div className="money text-red-600 font-semibold text-lg">
    {`${Math.floor(car.price / 10000).toLocaleString()} 만원`}
  </div>
</div>

        {/* View Details Button */}
        <div className="mt-3">
          <Link
            to={detailsLink}
            className={`text-white ${
              car.seq ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
            } px-4 py-1.5 rounded text-sm inline-block w-full text-center`}
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
