import { Box, Typography } from '@pankod/refine-mui';
import React, { useContext } from 'react';

import { DarkLogo, LightLogo } from 'assets';
import { CustomButton } from 'components';
import { ColorModeContext } from 'contexts';

const VerifyEmailComponent = ({
  handleSubmit,
  formLoading,
  formComplete,
}: {
  handleSubmit: () => void;
  formLoading: boolean;
  formComplete: boolean;
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
        Verify Email
      </Typography>
      <Typography fontSize={16} color='#808191' textAlign='center'>
        Verify your email then proceed to signin.
      </Typography>
      <img
        src={mode === 'light' ? DarkLogo : LightLogo}
        style={{
          display: 'block',
          height: '70px',
          margin: '40px 0',
          width: '70px',
          borderRadius: '50%',
        }}
        alt='Techive Logo'
      />
      {formComplete ? (
        <Typography>Email verified successfully!</Typography>
      ) : (
        <CustomButton
          type='submit'
          fullWidth
          title={formLoading ? 'Loading...' : 'Verify'}
          backgroundColor='#475BE8'
          color='#fcfcfc'
          active={formLoading}
          handleClick={() => handleSubmit()}
        />
      )}
    </Box>
  );
};

export default VerifyEmailComponent;
