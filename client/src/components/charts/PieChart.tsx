import React, { useContext } from 'react';
import { Box, Typography, Stack } from '@pankod/refine-mui';
import ReactApexChart from 'react-apexcharts';

import { PieChartProps } from 'interfaces/home';
import { ColorModeContext } from 'contexts';

const PieChart = ({
  title,
  value,
  series,
  colors,
  location,
}: PieChartProps) => {
  const { mode } = useContext(ColorModeContext);
  return (
    <Box
      id='pie-chart'
      flex={1}
      display='flex'
      bgcolor={mode === 'light' ? '#fcfcfc' : '#1A1D1F'}
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
        <Typography
          fontSize={14}
          color={mode === 'light' ? '#808191' : '#6F767E'}
        >
          {title}
        </Typography>
        <Typography
          fontSize={24}
          fontWeight={700}
          mt={1}
          color={mode === 'light' ? '#11142d' : '#EFEFEF'}
        >
          {value}
        </Typography>
      </Stack>

      <ReactApexChart
        options={{
          chart: { type: 'donut' },
          colors,
          legend: { show: false },
          dataLabels: { enabled: false },
          grid: {
            show: false,
          },
          stroke: {
            colors: ['transparent'],
            width: 4,
          },
        }}
        series={series}
        type='donut'
        width='120px'
      />
    </Box>
  );
};

export default PieChart;
