import React, { useContext, useState } from 'react';
import { Box, Typography, Stack } from '@pankod/refine-mui';
import { useNavigate } from '@pankod/refine-react-router-v6';
import { FieldValues, useForm } from '@pankod/refine-react-hook-form';

import { CreateAgentImg } from 'assets';
import { CreateAgentForm, CustomButton } from 'components';
import { ColorModeContext } from 'contexts';

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
  const { mode } = useContext(ColorModeContext);

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
    <Box mt={{ xs: '45px', lg: '0px' }}>
      <Typography
        fontSize={25}
        fontWeight={700}
        color={mode === 'light' ? '#11142d' : '#EFEFEF'}
      >
        Add New Agent
      </Typography>
      <Box
        sx={{
          marginTop: '20px',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '15px',
          backgroundColor: mode === 'light' ? '#fcfcfc' : '#1A1D1F',
          paddingBottom: '60px',
        }}
      >
        <img
          src={CreateAgentImg}
          alt='create-agent'
          style={{
            display: 'block',
            width: '100%',
            borderRadius: '15px 15px 0 0',
          }}
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
          <Typography
            fontSize={18}
            fontWeight={600}
            color={mode === 'light' ? '#11142d' : '#EFEFEF'}
          >
            Agent Details
          </Typography>
          <CreateAgentForm
            register={register}
            propertyImage={propertyImage}
            handleImageChange={handleImageChange}
            mode={mode}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CreateAgent;
