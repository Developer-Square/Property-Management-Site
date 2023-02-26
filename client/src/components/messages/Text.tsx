import React from 'react';
import { Stack, Box, Typography } from '@pankod/refine-mui';
import { timeString12hr } from 'utils/randomDateAndTime';

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
  users,
  message,
  position,
}: {
  users: any;
  message: string;
  position: string;
}) => {
  return (
    <Stack
      sx={{
        padding: '20px 0px 20px 20px',
        justifyContent: position === 'left' ? 'flex-start' : 'flex-end',
      }}
      direction='row'
      gap='15px'
    >
      {position === 'left' && (
        <img
          src={users[0].avatar}
          alt='profile'
          style={{
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
              border: '1px solid #E4E4E4',
              borderRadius: '10px 10px 10px 0px',
              background: position === 'left' ? '#fcfcfc' : '#F2F2F2',
            }}
          >
            <Typography fontSize={16} color='#11142D'>
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
          {timeString12hr()}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Text;
