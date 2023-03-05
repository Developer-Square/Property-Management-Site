import React, { useContext } from 'react';
import { Box, Typography, Stack } from '@pankod/refine-mui';

import { propertyReferralsInfo } from 'constants/index';
import { ColorModeContext } from 'contexts';

interface IProgressBarProps {
  title: string;
  percentage: number;
  color: string;
  mode: string;
}

const ProgressBar = ({ title, percentage, color, mode }: IProgressBarProps) => (
  <Box width='100%'>
    <Stack direction='row' alignItems='center' justifyContent='space-between'>
      <Typography
        fontSize={16}
        fontWeight={500}
        color={mode === 'light' ? '#11142d' : '#EFEFEF'}
      >
        {title}
      </Typography>
      <Typography
        fontSize={16}
        fontWeight={500}
        color={mode === 'light' ? '#11142d' : '#EFEFEF'}
      >
        {percentage}%
      </Typography>
    </Stack>

    <Box
      mt={2}
      position='relative'
      width='100%'
      height='8px'
      borderRadius={1}
      bgcolor='#e4e8ef'
    >
      <Box
        width={`${percentage}%`}
        bgcolor={color}
        position='absolute'
        height='100%'
        borderRadius={1}
      />
    </Box>
  </Box>
);

const PropertyReferrals = () => {
  const { mode } = useContext(ColorModeContext);
  return (
    <Box
      p={4}
      bgcolor={mode === 'light' ? '#fcfcfc' : '#1A1D1F'}
      id='chart'
      minWidth={340}
      display='flex'
      flexDirection='column'
      borderRadius='15px'
    >
      <Typography
        fontSize={18}
        fontWeight={600}
        color={mode === 'light' ? '#11142d' : '#EFEFEF'}
      >
        Property Referrals
      </Typography>

      <Stack my='20px' direction='column' gap={4}>
        {propertyReferralsInfo.map((item) => (
          <ProgressBar key={item.title} {...item} mode={mode} />
        ))}
      </Stack>
    </Box>
  );
};

export default PropertyReferrals;
