import React from 'react';
import { Carousel } from 'react-responsive-carousel';

const ImageCarousel = ({ propertyDetails }) => (
  <Carousel showIndicators={false}>
    {[
      'http://res.cloudinary.com/ryansimageupload/image/upload/v1676526858/erfyvku4vgmpmkzaghij.webp',
      'http://res.cloudinary.com/ryansimageupload/image/upload/v1676526858/erfyvku4vgmpmkzaghij.webp',
      'http://res.cloudinary.com/ryansimageupload/image/upload/v1676526858/erfyvku4vgmpmkzaghij.webp',
    ].map((photo, index) => (
      <div>
        <img
          src={propertyDetails.photo}
          alt={propertyDetails.title}
          style={{ borderRadius: '10px' }}
        />
      </div>
    ))}
  </Carousel>
);

export default ImageCarousel;
