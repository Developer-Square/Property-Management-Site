import { Box, Typography } from '@pankod/refine-mui';
import { useNavigate } from '@pankod/refine-react-router-v6';
import { DarkLogo, LightLogo } from 'assets';
import { CustomButton } from 'components';
import { ColorModeContext } from 'contexts';
import { TextInput } from 'pages/login';
import React, { SetStateAction, useContext, useState } from 'react';

const ForgotPasswordComponent = ({
  handleSubmit,
  formLoading,
  formComplete,
  setFormComplete,
}: {
  handleSubmit: (data: any) => void;
  formLoading: boolean;
  formComplete: boolean;
  setFormComplete: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const { mode } = useContext(ColorModeContext);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: { lg: '362px' },
      }}
    >
      <Typography
        fontSize={37}
        fontWeight={700}
        color={mode === 'light' ? '#11142d' : '#EFEFEF'}
      >
        Reset Password
      </Typography>
      <Typography fontSize={16} color='#808191'>
        Forgot your password? No worries.
      </Typography>
      <img
        src={mode === 'light' ? DarkLogo : LightLogo}
        style={{
          height: '70px',
          margin: '40px 0',
          width: '70px',
          borderRadius: '50%',
        }}
        alt='Techive Logo'
      />
      {formComplete ? (
        <Typography>
          Kindly check your email, you should receive a link to reset your
          password
        </Typography>
      ) : (
        <>
          <form
            style={{
              marginBottom: '20px',
              width: '100%',
            }}
          >
            <TextInput
              title={'Email'}
              fieldValue={email}
              setFieldValue={setEmail}
              placeholder='Enter your email'
              type='text'
              mode={mode}
              active={formLoading}
            />
          </form>
          <CustomButton
            type='submit'
            fullWidth
            title={formLoading ? 'Loading...' : 'Send'}
            backgroundColor='#475BE8'
            color='#fcfcfc'
            active={formLoading}
            handleClick={() => handleSubmit(email)}
          />
          <span style={{ marginBottom: '15px' }}></span>
          <CustomButton
            type='button'
            fullWidth
            title={'Back'}
            backgroundColor='#d42e2e'
            color='#fcfcfc'
            active={formLoading}
            handleClick={() => navigate(-1)}
          />
        </>
      )}
    </Box>
  );
};

export default ForgotPasswordComponent;
