import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams, useLocation } from 'react-router-dom'; // <-- add useLocation
import { moneyFormatter } from '../utils/moneyFormatter';
import { dateFormatter } from '../utils/dateFormatter';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import Gallery from '../components/Gallery';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FaSquareWhatsapp } from "react-icons/fa6";
import placeHolderImage from '../assets/placeholder_image.jpg';

const getProxiedImageUrl = (url) =>
  url ? `http://localhost:4000/image-proxy?url=${encodeURIComponent(url)}` : placeHolderImage;

const CarDetails = () => {
  const { id } = useParams();
  const location = useLocation(); // <-- get location
  const [data, setData] = useState(null);
  const [imageCollection, setImageCollection] = useState([]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const mainSwiperRef = useRef(null);
  const carsData = useSelector(state => state.car.carsData);

  const parseFeatures = (featuresString) => {
    if (!featuresString) return [];
    return featuresString.split(',').map(feature => feature.trim());
  };

  const getPageFromQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get('page') || 1;
  };

  const page = getPageFromQuery();

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const res = await fetch(`http://localhost:4000/cars/${id}`);
        const result = await res.json();
        if (result) {
          const images = result.image_urls
            ? result.image_urls.split(',').map(url => url.trim()).filter(Boolean)
            : [];
          setImageCollection(images);
          setData(result);
        }
      } catch (err) {
        console.error("Failed to fetch car details:", err);
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

  if (!data) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  
  const availableFeatures = parseFeatures(data.features);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Back Button */}
      <div className="bg-white py-3 px-5 shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto">
<Link
  to={{
    pathname: location.state?.from || '/',
    search: location.state?.from?.includes('?') ? '' : location.search,
    state: {
      filter: location.state?.filter,
      page: location.state?.page
    }
  }}
  className="text-gray-600 hover:text-gray-900 flex items-center"
>

            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to List
          </Link>
        </div>
      </div>


      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-5 px-4">
        {/* Title and Price */}
        <div className="detailTop border-b border-black py-2 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center">
          <span className="text-xl md:text-2xl font-bold mb-2 md:mb-0">
            {(data.title ? data.title.replace(/&nbsp;/g, '') : data.model)}
          </span>
          <div className="flex items-center">
            <div id="carprice" className="text-2xl md:text-3xl text-red-800 font-bold mr-1">
              {moneyFormatter(data.price)}
            </div>
            <div className="text-base md:text-lg font-bold mt-1">won</div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="topleft bg-white p-4 mb-5 rounded-lg shadow">
          <div className="relative mb-4 max-w-5xl mx-auto">
            {/* Main Image Swiper */}
            <Swiper
              ref={mainSwiperRef}
              modules={[Navigation, Thumbs]}
              navigation
              thumbs={{ swiper: thumbsSwiper }}
              spaceBetween={10}
              slidesPerView={1}
              onSlideChange={handleSlideChange}
              className="rounded-lg overflow-hidden mb-4"
            >
              {imageCollection.map((img, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full pt-[60%] bg-gray-200 rounded overflow-hidden">
                    <img
                      src={getProxiedImageUrl(img)}
                      alt={`${data.make} ${data.model} ${index + 1}`}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                      onError={e => { e.target.onerror = null; e.target.src = placeHolderImage; }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Thumbnail Swiper - Mobile layout changes */}
            <div className="md:hidden">
              <Swiper
                onSwiper={setThumbsSwiper}
                modules={[Thumbs]}
                watchSlidesProgress
                spaceBetween={8}
                slidesPerView={4}
                className="thumbnail-swiper"
              >
                {imageCollection.map((img, index) => (
                  <SwiperSlide key={index}>
                    <div
                      onClick={() => mainSwiperRef.current.swiper.slideTo(index)}
                      className={`relative pt-[75%] border-2 ${
                        activeIndex === index ? 'border-blue-500' : 'border-transparent'
                      } rounded overflow-hidden cursor-pointer`}
                    >
                      <img
                        src={getProxiedImageUrl(img)}
                        alt={`Thumbnail ${index + 1}`}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        onError={e => { e.target.onerror = null; e.target.src = placeHolderImage; }}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Thumbnail Swiper - Desktop layout */}
            <div className="hidden md:block">
              <Swiper
                onSwiper={setThumbsSwiper}
                modules={[Thumbs]}
                watchSlidesProgress
                spaceBetween={8}
                slidesPerView={8}
                className="thumbnail-swiper"
              >
                {imageCollection.map((img, index) => (
                  <SwiperSlide key={index}>
                    <div
                      onClick={() => mainSwiperRef.current.swiper.slideTo(index)}
                      className={`relative pt-[75%] border-2 ${
                        activeIndex === index ? 'border-blue-500' : 'border-transparent'
                      } rounded overflow-hidden cursor-pointer`}
                    >
                      <img
                        src={getProxiedImageUrl(img)}
                        alt={`Thumbnail ${index + 1}`}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        onError={e => { e.target.onerror = null; e.target.src = placeHolderImage; }}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
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
            onClick={() => window.open("#", "smspopup", "width=1000,height=800,scrollbars=yes,resizable=no")}
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