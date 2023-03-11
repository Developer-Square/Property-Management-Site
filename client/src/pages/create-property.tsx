import React, { useState } from 'react';
import { useGetIdentity } from '@pankod/refine-core';
import { FieldValues, useForm } from '@pankod/refine-react-hook-form';

import { Form } from 'components';
import { Box } from '@pankod/refine-mui';

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

  const onFinishHandler = async (data: FieldValues) => {
    if (!propertyImage.length) return alert('Please upload a property image');
    const imageUrls = propertyImage.map((image) => image.url);

    await onFinish({ ...data, photos: imageUrls, email: user.email });
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
      />
    </Box>
  );
};

export default CreateProperty;
