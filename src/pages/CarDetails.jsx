import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { moneyFormatter } from '../utils/moneyFormatter';
import { dateFormatter } from '../utils/dateFormatter';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import Papa from 'papaparse';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FaSquareWhatsapp } from "react-icons/fa6";
import placeHolderImage from '../assets/placeholder_image.jpg';
import SwiperCore from 'swiper';

// Initialize Swiper modules
SwiperCore.use([Navigation, Thumbs]);

// Global cache for CSV data
let cachedCarsData = null;

// Improved image URL handler with better error handling
// Build fallback image URL from seq and image index (1-based)
const buildImageUrlFromSeq = (seq, index = 1) => {
  if (!seq || seq.length < 5) return placeHolderImage;
  const first5 = seq.slice(0, 5);
  return `https://photo5.autosale.co.kr/car_large/NC${first5}/NC${seq}_${index}.jpg`;
};

// Improved image URL handler that works with both direct URLs and sequence-based URLs
// Remove the proxy version and use this simple getImageUrl function instead
const getImageUrl = (url) => {
  // If we have a valid URL, use it directly
  if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
    return url;
  }
  // Otherwise use placeholder
  return placeHolderImage;
};

// Process image collection from the CSV data
const getImageCollection = (image_urls_string) => {
  if (!image_urls_string) return [placeHolderImage];
  
  // Split the string and filter valid URLs
  const urls = image_urls_string
    .split(',')
    .map(url => url.trim())
    .filter(url => url && (url.startsWith('http://') || url.startsWith('https://')));
  
  return urls.length > 0 ? urls : [placeHolderImage];
};

const CarDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [data, setData] = useState(null);
  const [imageCollection, setImageCollection] = useState([]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mainSwiperRef = useRef(null);
  const navigate = useNavigate();
  const [mainSwiper, setMainSwiper] = useState(null);

  const parseFeatures = (featuresString) => {
    if (!featuresString) return [];
    return featuresString.split(',').map(feature => feature.trim());
  };

useEffect(() => {
const processCarData = (car) => {
  setData(car);
  
  // Process image URLs directly from CSV
  const images = getImageCollection(car.image_urls);
  console.log('Images array:', images);
  setImageCollection(images);
};

  const fetchCarDetails = async () => {
    try {
      // Use cached data if available
      if (cachedCarsData) {
        // Pad id to 10 digits with leading zeros
const paddedId = id.toString().padStart(7, '0');
const car = cachedCarsData.find(c => c.seq === paddedId || c.seq === id || c.seq == id);
        if (car) {
          processCarData(car);
        } else {
          setError('Car not found');
        }
        setLoading(false);
        return;
      }

      // Fetch and parse CSV data
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
          cachedCarsData = results.data.map(row => {
            const obj = {};
            keys.forEach((key, idx) => obj[key] = row[idx]);
            return obj;
          });

          // Pad id to 10 digits with leading zeros
const paddedId = id.toString().padStart(7, '0');
console.log('Requested id:', id);
console.log('Padded id (7):', paddedId);
console.log('All seqs:', cachedCarsData.map(c => c.seq));
const car = cachedCarsData.find(c => c.seq === paddedId || c.seq === id || c.seq == id);
console.log('Found car:', car);  

          if (car) {
            processCarData(car);
          } else {
            setError('Car not found');
          }
          setLoading(false);
        },
        error: (err) => {
          console.error("CSV parsing error:", err);
          setError('Failed to load car data');
          setLoading(false);
        }
      });
    } catch (err) {
      setError('Failed to load car data');
      setLoading(false);
    }
  };

  fetchCarDetails();
}, [id]);
  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  function WhatsAppContact() {
    const iconRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const observer = new window.IntersectionObserver(
        ([entry]) => setIsVisible(entry.isIntersecting),
        { threshold: 0.5 }
      );
      if (iconRef.current) observer.observe(iconRef.current);
      return () => observer.disconnect();
    }, []);

    const handleClick = () => {
      window.open("https://wa.me/821021597173", "_blank");
    };

    return (
      <button
        ref={iconRef}
        onClick={handleClick}
        className={`transition-transform duration-500 ${
          isVisible ? "animate-bounce" : ""
        } focus:outline-none`}
        aria-label="Contact on WhatsApp"
        style={{ fontSize: "4rem", color: "#25D366" }}
      >
        <FaSquareWhatsapp />
      </button>
    );
  }

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-600">{error}</div>;
  if (!data) return <div className="flex justify-center items-center h-screen">Car not found</div>;
  
  const availableFeatures = parseFeatures(data.features);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Back Button */}
      <div className="bg-white py-3 px-5 shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-900 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to List
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-5 px-4">
        {/* Title and Price */}
        <div className="detailTop border-b border-black py-2 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center">
          <span className="text-xl md:text-2xl font-bold mb-2 md:mb-0">
            {(data.title ? data.title.replace(/&nbsp;/g, '') : data.model)}
          </span>
<div className="text-red-800 font-bold text-xl md:text-2xl">
  <span className="text-blue-700 font-medium">
    {`$${(data.price / 1400).toLocaleString(undefined, {
      maximumFractionDigits: 0,
    })} USD`}
  </span>
  <span className="mx-1 text-gray-500">/</span>
  <span>
    {`${Math.floor(data.price / 10000).toLocaleString()} 만원`}
  </span>
</div>

</div>

        {/* Image Gallery */}
        <div className="topleft bg-white p-4 mb-5 rounded-lg shadow">
          <div className="relative mb-4 max-w-5xl mx-auto">
            {/* Main Image Swiper */}
            {imageCollection.length > 0 ? (
<Swiper
  key={imageCollection.join(',')} // <-- ADD THIS LINE
  ref={mainSwiperRef}
  modules={[Navigation, Thumbs]}
  navigation
  thumbs={{
    swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
  }}
  spaceBetween={10}
  slidesPerView={1}
  onSlideChange={handleSlideChange}
  onSwiper={setMainSwiper}
  className="rounded-lg overflow-hidden mb-4"
>
  {imageCollection.map((img, index) => (
    <SwiperSlide key={`main-${index}`}>
      <div className="relative w-full pt-[60%] bg-gray-200 rounded overflow-hidden">
<img
  src={getImageUrl(img)}
  alt={`${data.make} ${data.model} ${index + 1}`}
  className="absolute top-0 left-0 w-full h-full object-cover"
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = placeHolderImage;
  }}
  loading="lazy"
  referrerPolicy="no-referrer" // Important for external images
/>
      </div>
    </SwiperSlide>
  ))}
</Swiper>
            ) : (
              <div className="relative w-full pt-[60%] bg-gray-200 rounded overflow-hidden">
                <img
                  src={placeHolderImage}
                  alt="Placeholder"
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
            )}

            {/* Thumbnail Swiper (Desktop Only) */}
            {imageCollection.length > 1 && (
              <div className="hidden md:block">
                <Swiper
                  key={imageCollection.join(',')} // <-- ADD THIS LINE
                  onSwiper={setThumbsSwiper}
                  modules={[Thumbs]}
                  watchSlidesProgress
                  spaceBetween={8}
                  slidesPerView={Math.min(8, imageCollection.length)}
                  className="thumbnail-swiper"
                >
                  {imageCollection.map((img, index) => (
                    <SwiperSlide key={`thumb-${index}`}>
                      <div
                        onClick={() => mainSwiper?.slideTo(index)}
                        className={`relative pt-[75%] border-2 ${
                          activeIndex === index ? 'border-blue-500' : 'border-transparent'
                        } rounded overflow-hidden cursor-pointer`}
                      >
<img
  src={getImageUrl(img)}
  alt={`${data.make} ${data.model} ${index + 1}`}
  className="absolute top-0 left-0 w-full h-full object-cover"
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = placeHolderImage;
  }}
  loading="lazy"
  referrerPolicy="no-referrer" // Important for external images
/>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
        </div>

        {/* Vehicle Information Table - Responsive */}
        <div className="bg-white p-4 mb-5 rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Column */}
            <div className="space-y-2">
              <div className="flex justify-between border-b pb-2">
                <span className="font-bold">Manufacturer Year</span>
                <span>{data.manufacturer_year || 'N/A'}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-bold">Mileage (km)</span>
                <span>{data.mileage && typeof data.mileage === 'string' ? data.mileage : 'N/A'}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-bold">Transmission</span>
                <span>{data.transmission || 'Automatic'}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-bold">Accidents</span>
                <span>{data.accidents && data.accidents !== '0' && data.accidents !== 'None' && data.accidents !== '' ? data.accidents : 'Non Accident'}</span>
              </div>
            </div>
            
            {/* Second Column */}
            <div className="space-y-2">
              <div className="flex justify-between border-b pb-2">
                <span className="font-bold">Registration Date</span>
                <span>{data.registration_date || 'N/A'}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-bold">Fuel</span>
                <span>{data.fuel || 'N/A'}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-bold">Color</span>
                <span>{data.color || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Inspection Terms */}
        <div className="bg-white p-4 mb-5 rounded-lg shadow">
          <div className="text-lg md:text-xl font-bold mb-3">Inspection Terms:</div>
          <div className="safehelp text-xs md:text-sm flex flex-wrap gap-x-4 gap-y-2">
            <span className="font-bold">X - replaced</span>
            <span className="font-bold">W - cutting</span>
            <span className="font-bold">A - scratch</span>
            <span className="font-bold">U - dent</span>
            <span className="font-bold">C - rust</span>
          </div>
        </div>

{/* Performance Log Button */}
<div className="bg-white p-4 mb-5 rounded-lg shadow text-center">
  <button 
    className="border-2 border-black px-4 py-2 md:px-6 md:py-2 font-bold hover:bg-gray-100 transition-colors text-sm md:text-base"
    onClick={() => {
      const seq = String(data.seq); // Just use as-is
      const inspectionUrl = `https://photo5.autosale.co.kr/safe.php?seq=${seq}&t=kimko`;
      window.open(inspectionUrl, "smspopup", "width=1000,height=800,scrollbars=yes,resizable=no");
    }}
  >
    View Performance Log
  </button>
</div>
        {/* Options Table - Responsive */}
        <div className="bg-white p-4 mb-5 rounded-lg shadow">
          <div className="text-xl font-bold mb-3">Vehicle Options</div>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1">
              {/* Row 1 */}
              <div className={`p-2 ${availableFeatures.includes('HID Lamp') ? 'bg-blue-600 text-white' : ''}`}>HID Lamp</div>
              <div className={`p-2 ${availableFeatures.includes('LED Lamp') ? 'bg-blue-600 text-white' : ''}`}>LED Lamp</div>
              <div className={`p-2 ${availableFeatures.includes('Adaptive Lamp') ? 'bg-blue-600 text-white' : ''}`}>Adaptive Lamp</div>
              <div className={`p-2 ${availableFeatures.includes('High Beam') ? 'bg-blue-600 text-white' : ''}`}>High Beam</div>
              <div className={`p-2 ${availableFeatures.includes('Auto Folding Side Mirror') ? 'bg-blue-600 text-white' : ''}`}>Auto Folding Side Mirror</div>
              <div className={`p-2 ${availableFeatures.includes('Heating Wire Side Mirror') ? 'bg-blue-600 text-white' : ''}`}>Heating Wire Side Mirror</div>
              
              {/* Row 2 */}
              <div className={`p-2 ${availableFeatures.includes('Automatic Angling During Parking') ? 'bg-blue-600 text-white' : ''}`}>Automatic Angling During Parking</div>
              <div className={`p-2 ${availableFeatures.includes('Sunroof') ? 'bg-blue-600 text-white' : ''}`}>Sunroof</div>
              <div className={`p-2 ${availableFeatures.includes('Dual Sunroof') ? 'bg-blue-600 text-white' : ''}`}>Dual Sunroof</div>
              <div className={`p-2 ${availableFeatures.includes('Panorama Sunroof') ? 'bg-blue-600 text-white' : ''}`}>Panorama Sunroof</div>
              <div className={`p-2 ${availableFeatures.includes('Wiper Wind Shield') ? 'bg-blue-600 text-white' : ''}`}>Wiper Wind Shield</div>
              <div className={`p-2 ${availableFeatures.includes('Ultraviolet Light Glass') ? 'bg-blue-600 text-white' : ''}`}>Ultraviolet Light Glass</div>
              
              {/* Row 3 */}
              <div className={`p-2 ${availableFeatures.includes('Aluminium Wheel') ? 'bg-blue-600 text-white' : ''}`}>Aluminium Wheel</div>
              <div className={`p-2 ${availableFeatures.includes('Chrome Wheel') ? 'bg-blue-600 text-white' : ''}`}>Chrome Wheel</div>
              <div className={`p-2 ${availableFeatures.includes('Wide Tires') ? 'bg-blue-600 text-white' : ''}`}>Wide Tires</div>
              <div className={`p-2 ${availableFeatures.includes('Leather Steering Wheel') ? 'bg-blue-600 text-white' : ''}`}>Leather Steering Wheel</div>
              <div className={`p-2 ${availableFeatures.includes('Wood Steering Wheel') ? 'bg-blue-600 text-white' : ''}`}>Wood Steering Wheel</div>
              <div className={`p-2 ${availableFeatures.includes('Heated Steering Wheel') ? 'bg-blue-600 text-white' : ''}`}>Heated Steering Wheel</div>
              
              {/* Row 4 */}
              <div className={`p-2 ${availableFeatures.includes('Fabric Seat') ? 'bg-blue-600 text-white' : ''}`}>Fabric Seat</div>
              <div className={`p-2 ${availableFeatures.includes('Leather Seat') ? 'bg-blue-600 text-white' : ''}`}>Leather Seat</div>
              <div className={`p-2 ${availableFeatures.includes('Electric Seat (Driver)') ? 'bg-blue-600 text-white' : ''}`}>Electric Seat (Driver)</div>
              <div className={`p-2 ${availableFeatures.includes('Electric Seat (Passenger)') ? 'bg-blue-600 text-white' : ''}`}>Electric Seat (Passenger)</div>
              <div className={`p-2 ${availableFeatures.includes('Electric Seat (Rear)') ? 'bg-blue-600 text-white' : ''}`}>Electric Seat (Rear)</div>
              <div className={`p-2 ${availableFeatures.includes('Heated Seats (Front)') ? 'bg-blue-600 text-white' : ''}`}>Heated Seats (Front)</div>
              
              {/* Row 5 */}
              <div className={`p-2 ${availableFeatures.includes('Heated Seats (Rear)') ? 'bg-blue-600 text-white' : ''}`}>Heated Seats (Rear)</div>
              <div className={`p-2 ${availableFeatures.includes('Memory Seat (Driver)') ? 'bg-blue-600 text-white' : ''}`}>Memory Seat (Driver)</div>
              <div className={`p-2 ${availableFeatures.includes('Memory Seat (Passenger)') ? 'bg-blue-600 text-white' : ''}`}>Memory Seat (Passenger)</div>
              <div className={`p-2 ${availableFeatures.includes('Cooled Seats (Driver)') ? 'bg-blue-600 text-white' : ''}`}>Cooled Seats (Driver)</div>
              <div className={`p-2 ${availableFeatures.includes('Cooled Seats (Passenger)') ? 'bg-blue-600 text-white' : ''}`}>Cooled Seats (Passenger)</div>
              <div className={`p-2 ${availableFeatures.includes('Massage Seat') ? 'bg-blue-600 text-white' : ''}`}>Massage Seat</div>
              
              {/* Continue with all other rows... */}
              {/* Row 6 */}
              <div className={`p-2 ${availableFeatures.includes('Electronic Chromic Mirror') ? 'bg-blue-600 text-white' : ''}`}>Electronic Chromic Mirror</div>
              <div className={`p-2 ${availableFeatures.includes('Hi-Pass Room Mirror') ? 'bg-blue-600 text-white' : ''}`}>Hi-Pass Room Mirror</div>
              <div className={`p-2 ${availableFeatures.includes('Rearview Room Mirror') ? 'bg-blue-600 text-white' : ''}`}>Rearview Room Mirror</div>
              <div className={`p-2 ${availableFeatures.includes('Foot Parking Brake') ? 'bg-blue-600 text-white' : ''}`}>Foot Parking Brake</div>
              <div className={`p-2 ${availableFeatures.includes('Electronic Parking Brake') ? 'bg-blue-600 text-white' : ''}`}>Electronic Parking Brake</div>
              <div className={`p-2 ${availableFeatures.includes('Drivers Airbag') ? 'bg-blue-600 text-white' : ''}`}>Drivers Airbag</div>
              
              {/* Row 7 */}
              <div className={`p-2 ${availableFeatures.includes('Passenger Airbag') ? 'bg-blue-600 text-white' : ''}`}>Passenger Airbag</div>
              <div className={`p-2 ${availableFeatures.includes('Side Airbag') ? 'bg-blue-600 text-white' : ''}`}>Side Airbag</div>
              <div className={`p-2 ${availableFeatures.includes('Curtain Airbag') ? 'bg-blue-600 text-white' : ''}`}>Curtain Airbag</div>
              <div className={`p-2 ${availableFeatures.includes('Knee Airbag') ? 'bg-blue-600 text-white' : ''}`}>Knee Airbag</div>
              <div className={`p-2 ${availableFeatures.includes('Front Proximity Sensor') ? 'bg-blue-600 text-white' : ''}`}>Front Proximity Sensor</div>
              <div className={`p-2 ${availableFeatures.includes('Rear Proximity Sensor') ? 'bg-blue-600 text-white' : ''}`}>Rear Proximity Sensor</div>
              
              {/* Continue with all remaining features... */}
              {/* Row 8 */}
              <div className={`p-2 ${availableFeatures.includes('Front Camera') ? 'bg-blue-600 text-white' : ''}`}>Front Camera</div>
              <div className={`p-2 ${availableFeatures.includes('Rear Camera') ? 'bg-blue-600 text-white' : ''}`}>Rear Camera</div>
              <div className={`p-2 ${availableFeatures.includes('LDWS Lane Change Warning') ? 'bg-blue-600 text-white' : ''}`}>LDWS Lane Change Warning</div>
              <div className={`p-2 ${availableFeatures.includes('Around View(AVM)') ? 'bg-blue-600 text-white' : ''}`}>Around View(AVM)</div>
              <div className={`p-2 ${availableFeatures.includes('Blind Spot Detection / Balance Shaft Module (BSD/BSW)') ? 'bg-blue-600 text-white' : ''}`}>Blind Spot Detection</div>
              <div className={`p-2 ${availableFeatures.includes('ABS Anti-lock Braking System') ? 'bg-blue-600 text-white' : ''}`}>ABS</div>
              
              {/* Row 9 */}
              <div className={`p-2 ${availableFeatures.includes('TCS Traction Control System') ? 'bg-blue-600 text-white' : ''}`}>TCS</div>
              <div className={`p-2 ${availableFeatures.includes('VDC(ESP) Vehicle Dynamic Control (Electronic Stability Program)') ? 'bg-blue-600 text-white' : ''}`}>VDC(ESP)</div>
              <div className={`p-2 ${availableFeatures.includes('ECS Electronic Control Suspension') ? 'bg-blue-600 text-white' : ''}`}>ECS</div>
              <div className={`p-2 ${availableFeatures.includes('ESS Emergency Stop Signal') ? 'bg-blue-600 text-white' : ''}`}>ESS</div>
              <div className={`p-2 ${availableFeatures.includes('Hill-Start Assist Control') ? 'bg-blue-600 text-white' : ''}`}>Hill-Start Assist</div>
              <div className={`p-2 ${availableFeatures.includes('TPMS Tire Pressure Monitoring') ? 'bg-blue-600 text-white' : ''}`}>TPMS</div>
              
              {/* Row 10 */}
              <div className={`p-2 ${availableFeatures.includes('Child Safety Seats') ? 'bg-blue-600 text-white' : ''}`}>Child Safety Seats</div>
              <div className={`p-2 ${availableFeatures.includes('Safety Window') ? 'bg-blue-600 text-white' : ''}`}>Safety Window</div>
              <div className={`p-2 ${availableFeatures.includes('Active Head Rest') ? 'bg-blue-600 text-white' : ''}`}>Active Head Rest</div>
              <div className={`p-2 ${availableFeatures.includes('Electric Power Steering') ? 'bg-blue-600 text-white' : ''}`}>Electric Power Steering</div>
              <div className={`p-2 ${availableFeatures.includes('Active Geometry Control System') ? 'bg-blue-600 text-white' : ''}`}>Active Geometry Control</div>
              <div className={`p-2 ${availableFeatures.includes('Air Conditioning') ? 'bg-blue-600 text-white' : ''}`}>Air Conditioning</div>
              
              {/* Row 11 */}
              <div className={`p-2 ${availableFeatures.includes('Fully Automatic AC') ? 'bg-blue-600 text-white' : ''}`}>Fully Automatic AC</div>
              <div className={`p-2 ${availableFeatures.includes('Dual Fully Automatic AC') ? 'bg-blue-600 text-white' : ''}`}>Dual Fully Automatic AC</div>
              <div className={`p-2 ${availableFeatures.includes('CD') ? 'bg-blue-600 text-white' : ''}`}>CD</div>
              <div className={`p-2 ${availableFeatures.includes('CD Changer') ? 'bg-blue-600 text-white' : ''}`}>CD Changer</div>
              <div className={`p-2 ${availableFeatures.includes('DVD') ? 'bg-blue-600 text-white' : ''}`}>DVD</div>
              <div className={`p-2 ${availableFeatures.includes('AUX Port') ? 'bg-blue-600 text-white' : ''}`}>AUX Port</div>
              
              {/* Row 12 */}
              <div className={`p-2 ${availableFeatures.includes('MP3') ? 'bg-blue-600 text-white' : ''}`}>MP3</div>
              <div className={`p-2 ${availableFeatures.includes('USB') ? 'bg-blue-600 text-white' : ''}`}>USB</div>
              <div className={`p-2 ${availableFeatures.includes('iPod') ? 'bg-blue-600 text-white' : ''}`}>iPod</div>
              <div className={`p-2 ${availableFeatures.includes('Navigation') ? 'bg-blue-600 text-white' : ''}`}>Navigation</div>
              <div className={`p-2 ${availableFeatures.includes('Smart Key') ? 'bg-blue-600 text-white' : ''}`}>Smart Key</div>
              <div className={`p-2 ${availableFeatures.includes('Button Engine Start') ? 'bg-blue-600 text-white' : ''}`}>Button Engine Start</div>
              
              {/* Row 13 */}
              <div className={`p-2 ${availableFeatures.includes('Cruise Control') ? 'bg-blue-600 text-white' : ''}`}>Cruise Control</div>
              <div className={`p-2 ${availableFeatures.includes('Hands Free') ? 'bg-blue-600 text-white' : ''}`}>Hands Free</div>
              <div className={`p-2 ${availableFeatures.includes('Electric Power Trunk') ? 'bg-blue-600 text-white' : ''}`}>Electric Power Trunk</div>
              <div className={`p-2 ${availableFeatures.includes('Automated Parking System') ? 'bg-blue-600 text-white' : ''}`}>Automated Parking</div>
              <div className={`p-2 ${availableFeatures.includes('Rain Sensing Wiper') ? 'bg-blue-600 text-white' : ''}`}>Rain Sensing Wiper</div>
              <div className={`p-2 ${availableFeatures.includes('Twin Orifice vehicle-speed-sensing Power Steering') ? 'bg-blue-600 text-white' : ''}`}>Twin Orifice Steering</div>
              
              {/* Row 14 */}
              <div className={`p-2 ${availableFeatures.includes('Steering Wheel Remote Control') ? 'bg-blue-600 text-white' : ''}`}>Steering Wheel Remote</div>
              <div className={`p-2 ${availableFeatures.includes('Trip Computer') ? 'bg-blue-600 text-white' : ''}`}>Trip Computer</div>
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="bg-white p-4 mb-5 rounded-lg shadow">
          <div className="text-lg md:text-xl font-bold mb-3">Description</div>
          <p className="text-gray-700 text-sm md:text-base">{data.info || data.description || ''}</p>
        </div>

        {/* WhatsApp Contact Section */}
        {data.ownership && data.ownership.length > 0 && (
          <div className="bg-white p-4 mb-5 rounded-lg shadow flex flex-col items-center">
            <div className="text-lg md:text-xl font-bold mb-3">Contact Owner on WhatsApp</div>
            <img
              src="/Ceo.jpg"
              alt="CEO"
              className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-green-500 shadow-lg"
              style={{ objectPosition: "center" }}
            />
            <WhatsAppContact />
          </div>
        )}

        {/* Accident History */}
        {Array.isArray(data.accidents) && data.accidents.length > 0 && (
          <div className="bg-white p-4 mb-5 rounded-lg shadow">
            <div className="text-xl font-bold mb-3">Accident History</div>
            <ol className="relative border-l border-gray-200">
              {data.accidents.slice().reverse().map((accident, index) => (
                <li key={index} className="mb-6 ml-4">
                  <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5"></div>
                  <time className="mb-1 text-sm text-gray-500">{dateFormatter(accident.date)}</time>
                  <p className="text-gray-700">{accident.description}</p>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>

    </div>
  );
};

export default CarDetails;