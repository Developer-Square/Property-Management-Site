import React, { useState } from 'react';
import { Box, Typography, Stack } from '@pankod/refine-mui';
import { useNavigate } from '@pankod/refine-react-router-v6';
import { FieldValues, useForm } from '@pankod/refine-react-hook-form';

import { CreateAgentImg } from 'assets';
import { CreateAgentForm, CustomButton } from 'components';

// Todo: Only admins can create agents
// Hide create agent button from agents page
const CreateAgent = () => {
  const [propertyImage, setPropertyImage] = useState<{
    name: string;
    url: string;
  }>({ name: '', url: '' });
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) =>
      new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(readFile);
      });

    reader(file).then((result: string) => {
      setPropertyImage({ name: file?.name, url: result });
    });
  };

  const onFinishHandler = async (data: FieldValues) => {
    if (propertyImage.name === '')
      return alert('Please upload a property image');

    await onFinish({ ...data, avatar: propertyImage.url, type: 'agent' });
  };
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color='#11142d'>
        Add New Agent
      </Typography>
      <Box
        sx={{
          marginTop: '20px',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '15px',
          backgroundColor: '#fcfcfc',
          paddingBottom: '60px',
        }}
      >
        <img
          src={CreateAgentImg}
          alt='create-agent'
          style={{ width: '100%', borderRadius: '15px 15px 0 0' }}
        />
        <Stack
          sx={{
            marginTop: '10px',
            gap: '10px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <CustomButton
            title='Cancel'
            backgroundColor='#F7F7F7'
            color='#11142d'
            handleClick={() => navigate(-1)}
          />
          <CustomButton
            title={formLoading ? 'Saving...' : 'Save'}
            backgroundColor='#475BE8'
            color='#fcfcfc'
            handleClick={handleSubmit(onFinishHandler)}
          />
        </Stack>
        <Box
          sx={{
            marginLeft: { xs: '0px', sm: '40px' },
            padding: { xs: '18px', sm: '0px' },
            marginTop: '30px',
            marginBottom: '20px',
          }}
        >
          <Typography fontSize={18} fontWeight={600} color='#11142D'>
            My Details
          </Typography>
          <CreateAgentForm
            register={register}
            propertyImage={propertyImage}
            handleImageChange={handleImageChange}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CreateAgent;
