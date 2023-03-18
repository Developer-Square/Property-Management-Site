import React, { useContext, useState } from 'react';
import { Email } from '@mui/icons-material';
import { Alert, Box, Stack, Typography } from '@pankod/refine-mui';

import { CustomButton } from 'components';
import { ColorModeContext } from 'contexts';
import Api from 'utils/api';

const EmailVerification = ({
  email,
  emailVerified,
}: {
  email: string;
  emailVerified: boolean | undefined;
}) => {
  const { mode } = useContext(ColorModeContext);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [formComplete, setFormComplete] = useState(false);
  const api = new Api();

  const handleEmailVerification = async () => {
    setIsFormLoading(true);
    api
      .auth()
      .sendVerificationEmail()
      .then(() => {
        setFormComplete(true);
        setIsFormLoading(false);
      })
      .catch(() => {
        setIsFormLoading(false);
      });
  };

  return (
    <Stack flex={1} gap='15px'>
      {formComplete ? (
        <Alert severity='success'>
          Email verification link sent to your email
        </Alert>
      ) : (
        <>
          <Stack direction='row' gap={1} alignItems='center'>
            <Typography fontSize={14} fontWeight={500} color='#808191'>
              Email
            </Typography>

            {!emailVerified && (
              <Alert severity='info'>Your email is not verified</Alert>
            )}
          </Stack>
          {!emailVerified && (
            <CustomButton
              type='submit'
              fullWidth
              title={isFormLoading ? 'Loading...' : 'Verify'}
              backgroundColor='#475BE8'
              color='#fcfcfc'
              active={isFormLoading}
              handleClick={handleEmailVerification}
            />
          )}

          <Box
            display='flex'
            flexDirection='row'
            alignItems='center'
            gap='10px'
          >
            <Email
              sx={{
                color: mode === 'light' ? '#11142d' : '#EFEFEF',
              }}
            />
            <Typography
              fontSize={14}
              color={mode === 'light' ? '#11142d' : '#EFEFEF'}
            >
              {email}
            </Typography>
          </Box>
        </>
      )}
    </Stack>
  );
};

export default EmailVerification;
