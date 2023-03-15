import React, { SetStateAction, useContext } from 'react';
import { Typography, Box } from '@pankod/refine-mui';
import { FieldValues, UseFormRegister } from '@pankod/refine-react-hook-form';
import CustomButton from 'components/common/CustomButton';
import { DarkLogo, LightLogo } from 'assets';
import { TextInput } from 'pages/login';
import { ColorModeContext } from 'contexts';

const LoginComponent = ({
  GoogleButton,
  register,
  handleSubmit,
  formLoading,
  setForm,
}: {
  GoogleButton: any;
  register: UseFormRegister<FieldValues>;
  handleSubmit: any;
  formLoading: boolean;
  setForm: React.Dispatch<SetStateAction<string>>;
}) => {
  const { mode } = useContext(ColorModeContext);

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
        Welcome Back
      </Typography>
      <Typography fontSize={16} color='#808191'>
        Welcome back! Please enter your details.
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
      <form>
        <TextInput
          title={'Email'}
          fieldValue={'email'}
          register={register}
          placeholder='Enter your email'
          type='text'
          mode={mode}
        />
        <TextInput
          title={'Password'}
          fieldValue={'password'}
          placeholder='********'
          register={register}
          type='password'
          mode={mode}
        />
        <Typography
          sx={{
            fontSize: '14px',
            textAlign: 'right',
            width: '100%',
            color: '#475BE8',
            marginTop: '10px',
            marginBottom: '20px',
          }}
        >
          Forgot Password
        </Typography>
      </form>
      <CustomButton
        fullWidth
        title={formLoading ? 'Loading...' : 'Signin'}
        backgroundColor='#475BE8'
        color='#fcfcfc'
        // @ts-ignore
        handleClick={handleSubmit()}
      />
      <Typography
        fontSize={16}
        sx={{
          margin: '15px 0',
        }}
      >
        or
      </Typography>
      <Box>
        <GoogleButton />
      </Box>
      <Typography
        fontSize={15}
        sx={{
          marginTop: '15px',
          marginBottom: '85px',
          color: '#808191',
        }}
      >
        Don't have an account?{' '}
        <span
          style={{ color: '#475BE8', cursor: 'pointer' }}
          onClick={() => setForm('signup')}
        >
          Sign up
        </span>
      </Typography>
    </Box>
  );
};

export default LoginComponent;
