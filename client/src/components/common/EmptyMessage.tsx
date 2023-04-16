import React from 'react';
import { Box, Stack, Typography } from '@pankod/refine-mui';

import { ChatMessage } from 'assets';

const EmptyMessage = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img
        src={ChatMessage}
        alt='empty message'
        style={{
          display: 'block',
          width: '306px',
          height: '306px',
          marginRight: '40px',
        }}
      />
      <Stack direction='column' gap={3}>
        <Typography fontSize={36} fontWeight={700} textAlign='center'>
          Techive Chat
        </Typography>
        <Typography
          fontSize={16}
          textAlign='center'
          sx={{
            fontSize: '16px',
            textAlign: 'center',
            padding: '0px',
            width: { xs: '300px', sm: '400px', md: '500px' },
            margin: '0px auto',
          }}
        >
          Revolutionize your real estate communication with our messaging
          platform. From connecting with clients to closing deals, our platform
          streamlines every step of the process.
        </Typography>
      </Stack>
    </Box>
  );
};

export default EmptyMessage;