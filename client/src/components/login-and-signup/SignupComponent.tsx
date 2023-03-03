import React, { SetStateAction } from 'react';
import { Typography, Box } from '@pankod/refine-mui';
import { FieldValues, UseFormRegister } from '@pankod/refine-react-hook-form';
import CustomButton from 'components/common/CustomButton';
import { DarkLogo } from 'assets';
import { TextInput } from 'pages/login';

const SignupComponent = ({
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
      <Typography fontSize={37} fontWeight={700} color='#11142D'>
        Hi! Welcome
      </Typography>
      <Typography fontSize={16} color='#808191'>
        Sign up for our site and make your life easier
      </Typography>
      <img
        src={DarkLogo}
        style={{
          height: '70px',
          margin: '40px 0',
          width: '70px',
          borderRadius: '50%',
        }}
        alt='Techive Logo'
      />
      <TextInput
        title={'Username'}
        fieldValue={'username'}
        placeholder='Enter your username'
        register={register}
        type='text'
      />
      <TextInput
        title={'Email'}
        fieldValue={'email'}
        placeholder='Enter your email'
        register={register}
        type='text'
      />
      <TextInput
        title={'Password'}
        fieldValue={'password'}
        placeholder='********'
        register={register}
        type='password'
      />
      <TextInput
        title={'Confirm Password'}
        fieldValue={'confirmPassword'}
        placeholder='********'
        register={register}
        type='password'
      />
      <Box marginBottom='20px'></Box>
      <CustomButton
        fullWidth
        title={formLoading ? 'Loading...' : 'Sign up'}
        backgroundColor='#475BE8'
        color='#fcfcfc'
        // @ts-ignore
        handleClick={handleSubmit}
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
        Already have an account?{' '}
        <span
          style={{ color: '#475BE8', cursor: 'pointer' }}
          onClick={() => setForm('signin')}
        >
          Sign in
        </span>
      </Typography>
    </Box>
  );
};

export default SignupComponent;
