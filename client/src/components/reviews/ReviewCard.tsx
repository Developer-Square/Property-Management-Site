/* eslint-disable @typescript-eslint/no-redeclare */
import { Box, Rating, Stack, Typography } from '@pankod/refine-mui';
import React, { useState } from 'react';
interface IReviewCardProps {
  id: string;
  profileUrl: string;
  ratingValue: number;
  name: string;
  comment: string;
}

const ReviewCard = ({
  profileUrl,
  id,
  ratingValue,
  name,
  comment,
}: IReviewCardProps) => {
  const [value, setValue] = useState(ratingValue);

  // A function that returns a random date between two set dates
  function randomDate(
    start: Date,
    end: Date,
    startHour: number,
    endHour: number
  ) {
    // @ts-ignore
    var date = new Date(+start + Math.random() * (end - start));
    var hour = (startHour + Math.random() * (endHour - startHour)) | 0;
    date.setHours(hour);
    return date.toString();
  }

  const timeString12hr = new Date(
    '1970-01-01T' +
      randomDate(new Date(2020, 0, 1), new Date(), 0, 24).slice(16, 24) +
      'Z'
  ).toLocaleTimeString('en-US', {
    timeZone: 'UTC',
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
  });
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
          src={profileUrl}
          alt='Profile'
          style={{
            width: '70px',
            height: '70px',
            borderRadius: '10px',
          }}
        />
        <Stack gap={0.5}>
          <Typography fontSize={14} color='#475BE8'>
            #{id.slice(0, 5).toUpperCase()}
          </Typography>
          <Typography fontSize={16} color='#11142d'>
            {name}
          </Typography>
          <Typography fontSize={14} color='#808191'>
            Join On{' '}
            {randomDate(new Date(2020, 0, 1), new Date(), 0, 24).slice(0, 15)}
          </Typography>
          <Typography fontSize={14} color='#808191'>
            {timeString12hr}
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
            {comment}
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
              {ratingValue.toFixed(1)}
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
