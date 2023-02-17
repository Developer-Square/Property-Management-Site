import React from 'react';
import { Carousel } from 'react-responsive-carousel';

const ImageCarousel = ({ propertyDetails }) => (
  <Carousel showIndicators={false}>
    {propertyDetails.photos.map((image) => (
      <div>
        <img
          src={image}
          alt={propertyDetails.title}
          style={{ borderRadius: '10px' }}
        />
      </div>
    ))}
  </Carousel>
);

export default ImageCarousel;
