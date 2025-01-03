import React, { useContext, useState } from 'react';
import { useGetIdentity } from '@pankod/refine-core';
import { FieldValues, useForm } from '@pankod/refine-react-hook-form';
import { toast } from 'react-toastify';

import { Form } from 'components';
import { Box } from '@pankod/refine-mui';
import { ColorModeContext } from 'contexts';

const CreateProperty = () => {
  const { data: user } = useGetIdentity();
  const [propertyImage, setPropertyImage] = useState<
    { name: string; url: string }[]
  >([]);
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm();
  const { mode } = useContext(ColorModeContext);

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) =>
      new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(readFile);
      });

    reader(file).then((result: string) => {
      setPropertyImage([...propertyImage, { name: file?.name, url: result }]);
    });
  };

  const getCoordinates = async (location: string): Promise<{lat: number, lng: number} | null> => {
    try {
      if (!window.google?.maps) {
        toast.error('Google Maps API not loaded');
        return null;
      }

      return new Promise((resolve, reject) => {
        const geocoder = new window.google.maps.Geocoder();
        
        geocoder.geocode({ address: location }, (results, status) => {
          if (status === "OK" && results?.[0]) {
            const lat = results[0].geometry.location.lat();
            const lng = results[0].geometry.location.lng();
            resolve({ lat, lng });
          } else {
            console.error("Geocoding failed:", status);
            resolve(null);
          }
        });
      });
    } catch (error) {
      console.error("Error getting coordinates:", error);
      return null;
    }
  };

  const onFinishHandler = async (data: FieldValues) => {
    if (!propertyImage.length) return alert('Please upload a property image');
    
    // Get coordinates before submission
    const coordinates = await getCoordinates(data.location);
    if (!coordinates) {
      toast.error('Could not find coordinates for the given location');
      return;
    }

    const imageUrls = propertyImage.map((image) => image.url);
    await onFinish({ 
      ...data, 
      photos: imageUrls, 
      email: user.email,
      coordinates: {
        latitude: coordinates.lat,
        longitude: coordinates.lng
      }
    });
  };

  return (
    <Box mt={{ xs: '45px', lg: '0px' }}>
      <Form
        type='Create'
        register={register}
        onFinish={onFinish}
        formLoading={formLoading}
        handleSubmit={handleSubmit}
        propertyImage={propertyImage}
        handleImageChange={handleImageChange}
        onFinishHandler={onFinishHandler}
        mode={mode}
      />
    </Box>
  );
};

export default CreateProperty;
