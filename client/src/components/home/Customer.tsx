import { Box, Stack, Typography } from '@pankod/refine-mui';
import {
  NewCustomersSeries,
  TotalCustomersOptions,
  TotalCutomersSeries,
} from 'components/charts/chart.config';
import { ColorModeContext } from 'contexts';
import React, { useContext } from 'react';
import ReactApexChart from 'react-apexcharts';

const CustomerItem = ({
  title,
  number,
  rate,
  series,
  options,
  mode,
}: {
  title: string;
  number: string;
  rate: string;
  series: any;
  options: any;
  mode: string;
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
        <Typography
          fontSize={26}
          fontWeight={600}
          color={mode === 'light' ? '#11142d' : '#EFEFEF'}
        >
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
  const { mode } = useContext(ColorModeContext);
  return (
    <Box
      sx={{
        padding: '20px',
        width: '100%',
        background: mode === 'light' ? '#fcfcfc' : '#1A1D1F',
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
          <Typography
            fontSize={18}
            fontWeight={600}
            color={mode === 'light' ? '#11142d' : '#EFEFEF'}
          >
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
            options={{
              ...TotalCustomersOptions,
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
            mode={mode}
          />
          <CustomerItem
            title='New customers'
            number='234'
            rate='89.07%'
            series={NewCustomersSeries}
            options={{
              ...TotalCustomersOptions,
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
            mode={mode}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default Customer;
