import React from 'react';
import { Box, Typography, Stack } from '@pankod/refine-mui';
import ReactApexChart from 'react-apexcharts';

import { PieChartProps } from 'interfaces/home';

const PieChart = ({
  title,
  value,
  series,
  colors,
  location,
}: PieChartProps) => {
  return (
    <Box
      id='pie-chart'
      flex={1}
      display='flex'
      bgcolor='#fcfcfc'
      flexDirection={location === 'agents' ? 'column' : 'row'}
      justifyContent='space-between'
      alignItems='center'
      pl={location === 'agents' ? 0 : 3.5}
      py={2}
      gap={2}
      borderRadius='15px'
      minHeight='110px'
      width='fit-content'
    >
      <Stack
        direction='column'
        textAlign={location === 'agents' ? 'center' : 'initial'}
      >
        <Typography fontSize={14} color='#808191'>
          {title}
        </Typography>
        <Typography fontSize={24} fontWeight={700} mt={1} color='#11142d'>
          {value}
        </Typography>
      </Stack>

      <ReactApexChart
        options={{
          chart: { type: 'donut' },
          colors,
          legend: { show: false },
          dataLabels: { enabled: false },
        }}
        series={series}
        type='donut'
        width='120px'
      />
    </Box>
  );
};

export default PieChart;
