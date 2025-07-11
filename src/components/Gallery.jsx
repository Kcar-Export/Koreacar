import React from 'react'
import { useEffect, useState } from 'react';
import { PhotoSlider } from 'react-photo-view';
import GalleryItem from './GalleryItem';

const Gallery = ({ imageCollection }) => {
  const [galleryView, setGalleryView] = useState(false);
  const [index, setIndex] = useState(0);
  const [galleryConfig, setGalleryConfig] = useState({
    itemClass: 0,
    lastItem: 0,
  });
  const galleryItemClass = [
    {
      classes: [
        "col-span-5 row-span-3 md:row-span-4 md:col-span-3",
      ]
    },
    {
      classes: [
        "col-span-3 row-span-2 md:row-span-4 md:col-span-3",
        "col-span-3 row-span-2 md:row-span-4 md:col-span-2",
      ]
    },
    {
      classes: [
        "col-span-3 row-span-3 md:row-span-4 md:col-span-3",
        "md:row-span-2 md:col-span-2",
        "md:row-span-2 md:col-span-2",
      ]
    },
    {
      classes: [
        "col-span-3 row-span-3 md:row-span-4 md:col-span-3",
        "md:row-span-2 md:col-span-2",
        "md:row-span-2 md:col-span-1",
        "md:row-span-2 md:col-span-1",
      ]
    }
  ]

  const handleGalleryView = (i) => {
    setIndex(i);
    setGalleryView(true);
  }

  const handleGalleryConfig = (itemClass, index) => {
    const indexItemClass = imageCollection.length >= 4 ? 3 : (imageCollection.length - 1);
    const lastItem = imageCollection.length >= 4 ? 3 : (index-1);

    setGalleryConfig({
      itemClass: indexItemClass,
      lastItem
    })
  }

  useEffect(() => {
    console.log('imageCollection', imageCollection);
  }, [])

  return (
    <>
      <div className='grid grid-cols-3 md:grid-cols-5 grid-rows-4 h-[300px] md:h-[400px] gap-4 md:mb-4'>
        {
          imageCollection.slice(0, 4).map((image, index) => (
            <GalleryItem itemClass={galleryItemClass[imageCollection.length >= 4 ? 3 : (imageCollection.length - 1)].classes[index]} imageSrc={image} onClick={() => handleGalleryView(index)} lastItem={imageCollection.length >= 4 ? index === 3 : index === (imageCollection.length - 1)} key={index} />
          ))
        }
      </div>

      <PhotoSlider
        images={imageCollection.map((item) => ({ src: item, key: item }))}
        visible={galleryView}
        onClose={() => setGalleryView(false)}
        index={index}
        onIndexChange={setIndex}
      />
    </>
  )
}

export default Gallery