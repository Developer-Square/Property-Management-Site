import React, { useContext } from 'react';
import { Box, Typography, Stack } from '@pankod/refine-mui';
import ReactApexChart from 'react-apexcharts';
import { ArrowCircleUpRounded } from '@mui/icons-material';

import { TotalRevenueOptions, TotalRevenueSeries } from './chart.config';
import { ColorModeContext } from 'contexts';

const TotalRevenue = () => {
  const { mode } = useContext(ColorModeContext);
  return (
    <Box
      p={4}
      flex={1}
      bgcolor={mode === 'light' ? '#fcfcfc' : '#1A1D1F'}
      id='chart'
      display='flex'
      flexDirection='column'
      borderRadius='15px'
    >
      <Typography
        fontSize={18}
        fontWeight={600}
        color={mode === 'light' ? '#11142d' : '#EFEFEF'}
      >
        Total Revenue
      </Typography>

      <Stack my='20px' direction='row' gap={4} flexWrap='wrap'>
        <Typography
          fontSize={28}
          fontWeight={700}
          color={mode === 'light' ? '#11142d' : '#EFEFEF'}
        >
          Ksh 177,879
        </Typography>
        <Stack direction='row' alignItems='center' gap={1}>
          <ArrowCircleUpRounded
            sx={{
              fontSize: 25,
              color: '#475be8',
            }}
          />
          <Stack>
            <Typography fontSize={15} color='#475be8'>
              0.8%
            </Typography>
            <Typography fontSize={12} color='#808191'>
              Than Last Month
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <ReactApexChart
        series={TotalRevenueSeries}
        type='bar'
        height={310}
        options={{
          ...TotalRevenueOptions,
          yaxis: {
            labels: {
              style: { colors: [mode === 'light' ? '#11142d' : '#808191'] },
            },
          },
          xaxis: {
            labels: {
              style: {
                colors: [
                  '#808191',
                  '#808191',
                  '#808191',
                  '#808191',
                  '#808191',
                  '#808191',
                  '#808191',
                ],
              },
            },
          },
          legend: {
            position: 'top',
            horizontalAlign: 'right',
            labels: {
              colors: [mode === 'light' ? '#11142d' : '#808191'],
            },
          },
          tooltip: {
            theme: mode,
            y: {
              formatter(val: number) {
                return `$ ${val} thousands`;
              },
            },
          },
        }}
      />
    </Box>
  );
};

export default TotalRevenue;
