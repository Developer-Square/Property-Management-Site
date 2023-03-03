import React from 'react';
import { Box, Stack, Typography } from '@pankod/refine-mui';
import { useList } from '@pankod/refine-core';

import {
  PieChart,
  TotalRevenue,
  PropertyReferrals,
  PropertyList,
  TopAgent,
  LatestSales,
  Customer,
} from 'components';

const Home = () => {
  const { data, isLoading, isError } = useList({
    resource: 'properties',
  });

  const allProperties = data?.data ?? [];

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color='#11142d'>
        Dashboard
      </Typography>

      <Box mt='20px' display='flex' flexWrap='wrap' gap={4}>
        <PieChart
          title='Properties for Sale'
          value={32}
          series={[75, 25]}
          colors={['#475be8', '#F2F6FC']}
        />
        <PieChart
          title='Properties for Rent'
          value={73}
          series={[60, 40]}
          colors={['#FD8539', '#F2F6FC']}
        />
        <PieChart
          title='Total Customers'
          value={323}
          series={[75, 25]}
          colors={['#2ED480', '#F2F6FC']}
        />
        <PieChart
          title='Properties for Cities'
          value={52}
          series={[60, 40]}
          colors={['#FE6D8E', '#F2F6FC']}
        />
      </Box>

      <Stack
        mt='25px'
        width='100%'
        direction={{ xs: 'column', lg: 'row' }}
        gap={4}
      >
        <TotalRevenue />
        <PropertyReferrals />
      </Stack>
      <Stack
        mt='25px'
        gap={4}
        flexWrap='wrap'
        direction={{ xs: 'column', sm: 'row' }}
      >
        <TopAgent />
        <Customer />
        <LatestSales />
      </Stack>
      {!isLoading ? (
        <PropertyList type='home' properties={allProperties} />
      ) : (
        <Typography>Loading...</Typography>
      )}
      {isError && <Typography>Error fecthing properties</Typography>}
    </Box>
  );
};

export default Home;
