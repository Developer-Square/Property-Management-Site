import React from 'react';
import { Stack, Box, Typography } from '@pankod/refine-mui';

const MoreOptions = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1px',
      fontSize: '18px',
      fontWeight: 'bold',
      marginTop: '2px',
      marginBottom: 'auto',
      cursor: 'pointer',
    }}
  >
    <span style={{ height: '4px' }}>.</span>
    <span style={{ height: '4px' }}>.</span>
    <span style={{ height: '4px' }}>.</span>
  </Box>
);

const Text = ({
  avatar,
  message,
  createdAt,
  position,
  mode,
}: {
  avatar: string;
  message: string;
  createdAt: string;
  position: 'left' | 'right';
  mode: string | undefined;
}) => {
  return (
    <Stack
      sx={{
        padding: { xs: '20px 20px 20px 0px', sm: '20px' },
        justifyContent: position === 'left' ? 'flex-start' : 'flex-end',
      }}
      direction='row'
      gap='15px'
    >
      {position === 'left' && (
        <img
          src={avatar}
          alt='profile'
          style={{
            display: 'block',
            width: '46px',
            height: '46px',
            borderRadius: '50%',
          }}
        />
      )}
      <Stack direction='column' gap='10px'>
        <Stack direction='row' gap='10px'>
          {position === 'right' && <MoreOptions />}
          <Box
            sx={{
              padding: '10px 15px',
              maxWidth: { xs: 320, sm: 340 },
              width: 'auto',
              height: 'auto',
              border: `1px solid ${mode === 'light' ? '#E4E4E4' : '#272B30'}`,
              borderRadius: '10px 10px 10px 0px',
              background:
                position === 'left'
                  ? mode === 'light'
                    ? '#fcfcfc'
                    : '#1A1D1F'
                  : mode === 'light'
                  ? '#F2F2F2'
                  : '#333333',
            }}
          >
            <Typography
              fontSize={16}
              color={mode === 'light' ? '#11142d' : '#EFEFEF'}
            >
              {message}
            </Typography>
          </Box>
          {position === 'left' && <MoreOptions />}
        </Stack>
        <Typography
          fontSize={12}
          textAlign={position === 'right' ? 'right' : 'left'}
          color='#808191'
        >
          {new Date(createdAt).toLocaleTimeString('en-US', {
            timeZone: 'UTC',
            hour12: true,
            hour: 'numeric',
            minute: 'numeric',
          })}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Text;
