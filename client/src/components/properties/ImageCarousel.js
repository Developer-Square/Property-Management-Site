import React from 'react';
import { Carousel } from 'react-responsive-carousel';

const ImageCarousel = ({ propertyDetails }) => (
  <Carousel showIndicators={false}>
    {propertyDetails.photos.map((image, index) => (
      <div key={index}>
        <img
          src={image}
          alt={propertyDetails.title}
          style={{
            display: 'block',
            borderRadius: '10px',
          }}
        />
      </div>
    ))}
  </Carousel>
);

export default ImageCarousel;
