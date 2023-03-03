import { Box, Stack, Typography } from '@pankod/refine-mui';
import {
  NewCustomersSeries,
  TotalCustomersOptions,
  TotalCutomersSeries,
} from 'components/charts/chart.config';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const CustomerItem = ({
  title,
  number,
  rate,
  series,
  options,
}: {
  title: string;
  number: string;
  rate: string;
  series: any;
  options: any;
}) => (
  <Box
    sx={{
      borderBottom: '2px solid  #E4E4E4',
      marginBottom: '30px',
    }}
  >
    <Typography fontSize={12} fontWeight={600}>
      {title}
    </Typography>
    <Stack direction='row' justifyContent='space-between'>
      <Stack direction='column' mt='12px'>
        <Typography fontSize={26} fontWeight={600} color='#11142d'>
          {number}
        </Typography>
        <Typography fontSize={12} fontWeight={600} color='#2ED480'>
          {rate}
        </Typography>
      </Stack>
      <ReactApexChart
        series={series}
        height={150}
        width={230}
        options={options}
      />
    </Stack>
  </Box>
);

const Customer = () => {
  return (
    <Box
      sx={{
        padding: '20px',
        width: '100%',
        background: '#fcfcfc',
        borderRadius: '10px',
        flex: 1,
      }}
    >
      <Stack direction='column'>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          marginBottom='20px'
        >
          <Typography fontSize={18} fontWeight={600} color='#11142d'>
            Customer
          </Typography>
        </Stack>
        <Box
          sx={{
            maxHeight: '360px',
            height: '100%',
            overflow: 'scroll',
          }}
        >
          <CustomerItem
            title='Total customers'
            number='10k'
            rate='21.88%'
            series={TotalCutomersSeries}
            options={TotalCustomersOptions}
          />
          <CustomerItem
            title='New customers'
            number='234'
            rate='89.07%'
            series={NewCustomersSeries}
            options={TotalCustomersOptions}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default Customer;
