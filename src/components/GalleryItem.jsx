import React from 'react'
import placeHolderImage from '../assets/placeholder_image.jpg'

const GalleryItem = ({ itemClass, imageSrc, lastItem, onClick }) => {
  const imageClass = `${itemClass} rounded overflow-hidden cursor-pointer relative`;

  const onError = (event) => {
    event.target.src = placeHolderImage;
  };

  return (
    <>
      <div className={imageClass} onClick={onClick}>
        {
          lastItem ? <div className="absolute inset-0 w-full h-full bg-gray-900 bg-opacity-50 hover:bg-opacity-75 flex justify-center items-center cursor-pointer transition ease-in-out duration-300">
            <div className='text-white text-xs md:text-sm'>View gallery</div>
          </div> : null
        }
        <img className='h-full w-full object-cover' src={imageSrc} alt="gallery_image" onError={onError} />
      </div>
    </>
  )
}

export default GalleryItem