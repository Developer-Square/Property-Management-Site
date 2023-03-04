import { useEffect, useState } from 'react';
import { useGetIdentity } from '@pankod/refine-core';
import { FieldValues, useForm } from '@pankod/refine-react-hook-form';
import Form from 'components/common/Form';
import { useParams } from '@pankod/refine-react-router-v6';
import { Box } from '@pankod/refine-mui';

const EditProperty = () => {
  const { data: user } = useGetIdentity();
  const [backendImages, setBackendImages] = useState<string[]>(['']);
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm();
  const { id } = useParams();

  useEffect(() => {
    if (backendImages.length) {
      // fetch property details from the 'api/v1/properties/:id'
      // and set the backendImages state.
      const fetchImages = async () => {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/properties/${id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await response.json();
        setBackendImages(data.photos);
      };
      fetchImages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) =>
      new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(readFile);
      });

    reader(file).then((result: string) =>
      setBackendImages([...backendImages, result])
    );
  };

  const onFinishHandler = async (data: FieldValues) => {
    if (!backendImages.length) return alert('Please upload a property image');

    await onFinish({ ...data, photos: backendImages, email: user.email });
  };

  return (
    <Box mt={{ xs: '45px', sm: '0px' }}>
      <Form
        type='Edit'
        register={register}
        onFinish={onFinish}
        formLoading={formLoading}
        handleSubmit={handleSubmit}
        handleImageChange={handleImageChange}
        onFinishHandler={onFinishHandler}
        backendImages={backendImages}
        setBackendImages={setBackendImages}
      />
    </Box>
  );
};

export default EditProperty;
