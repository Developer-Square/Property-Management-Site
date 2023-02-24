import { Box, Rating, Stack, Typography } from '@pankod/refine-mui';
import React, { useState } from 'react';

import { RyanProfile } from '../../assets';

const ReviewCard = () => {
  const [value, setValue] = useState(4);
  return (
    <Box
      sx={{
        padding: '20px',
        marginBottom: '30px',
        background: '#fcfcfc',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: {
          xs: 'column',
          sm: 'row',
        },
      }}
    >
      <Stack
        direction='row'
        gap={2}
        sx={{ width: { xs: '100%', sm: '35%', xl: '25%' } }}
      >
        <img
          src={RyanProfile}
          alt='Profile'
          style={{
            width: '70px',
            height: '70px',
            borderRadius: '10px',
          }}
        />
        <Stack gap={0.5}>
          <Typography fontSize={14} color='#475BE8'>
            #C01234
          </Typography>
          <Typography fontSize={16} color='#11142d'>
            Ryan Njoroge
          </Typography>
          <Typography fontSize={14} color='#808191'>
            Join On 25-04-2022
          </Typography>
          <Typography fontSize={14} color='#808191'>
            12:42 PM
          </Typography>
        </Stack>
      </Stack>
      <Stack
        paddingBottom='20px'
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', xl: 'row' },
          width: { xs: '100%', sm: '65%', xl: '75%' },
          marginTop: { xs: '20px', sm: '0px' },
        }}
      >
        <Box
          sx={{
            width: { xl: '70%' },
          }}
        >
          <Typography fontSize={13} color='#808191'>
            Friendly service Josh, Lunar and everyone at Just Property in
            Hastings deserved a big Thank You from us for moving us from Jakarta
            to Medan during the lockdown.
          </Typography>
          <Stack direction='row' gap='10px' marginTop='15px'>
            <Box
              sx={{
                padding: '6px 10px',
                textTransform: 'uppercase',
                borderRadius: '15px',
                border: '1px solid #475BE8',
                fontSize: '12px',
                color: '#475BE8',
              }}
            >
              Excellent
            </Box>
            <Box
              sx={{
                padding: '6px 10px',
                textTransform: 'uppercase',
                borderRadius: '15px',
                border: '1px solid #475BE8',
                fontSize: '12px',
                color: '#475BE8',
              }}
            >
              Great
            </Box>
            <Box
              sx={{
                padding: '6px 10px',
                textTransform: 'uppercase',
                borderRadius: '15px',
                border: '1px solid #475BE8',
                fontSize: '12px',
                color: '#475BE8',
              }}
            >
              Best Service
            </Box>
          </Stack>
        </Box>
        <Stack
          direction='column'
          marginTop='15px'
          alignItems='center'
          sx={{
            width: { xl: '30%' },
          }}
        >
          <Stack direction='row'>
            <Typography fontSize={22} marginRight='10px' color='#11142d'>
              5.0
            </Typography>
            <Rating
              name='simple-controlled'
              sx={{
                alignItems: 'center',
              }}
              value={value}
              onChange={(event, newValue: any) => {
                setValue(newValue);
              }}
            />
          </Stack>
          <Stack direction='row' gap='10px' marginTop='15px'>
            <Box
              sx={{
                padding: '10px 16px',
                border: '1px solid #EB5757',
                borderRadius: '18px',
                color: '#EB5757',
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              Reject
            </Box>
            <Box
              sx={{
                padding: '10px 16px',
                backgroundColor: '#2ED480',
                borderRadius: '18px',
                color: '#fcfcfc',
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              Approve
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ReviewCard;
