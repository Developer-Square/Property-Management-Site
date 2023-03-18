import { Box, Typography } from '@pankod/refine-mui';
import React, { useContext, useState } from 'react';

import { DarkLogo, LightLogo } from 'assets';
import { CustomButton } from 'components';
import { ColorModeContext } from 'contexts';
import { TextInput } from 'pages/login';

const ResetPasswordComponent = ({
  handleSubmit,
  formLoading,
}: {
  handleSubmit: (data: any) => void;
  formLoading: boolean;
}) => {
  const { mode } = useContext(ColorModeContext);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
      <Typography fontSize={16} color='#808191' textAlign='center'>
        Reset your password then proceed to signin.
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

      <form
        style={{
          marginBottom: '20px',
          width: '100%',
        }}
      >
        <TextInput
          title={'Password'}
          fieldValue={password}
          setFieldValue={setPassword}
          placeholder='Enter your password'
          type='password'
          mode={mode}
          active={formLoading}
        />
        <TextInput
          title={'Confirm Password'}
          fieldValue={confirmPassword}
          setFieldValue={setConfirmPassword}
          placeholder='Re-enter your password'
          type='password'
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
        handleClick={() => handleSubmit({ password, confirmPassword })}
      />
    </Box>
  );
};

export default ResetPasswordComponent;
