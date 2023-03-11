import React, { useContext } from 'react';
import { Box, Typography, Stack } from '@pankod/refine-mui';
import { useList } from '@pankod/refine-core';
import { ColorModeContext } from 'contexts';

const LatestSale = ({
  name,
  avatar,
  price,
  location,
  mode,
}: {
  name: string;
  avatar: string;
  location: string;
  price: string;
  mode: string;
}) => (
  <Stack direction='row' marginBottom='15px'>
    <img
      src={avatar}
      alt='Profile'
      style={{
        borderRadius: '6px',
        marginRight: '12px',
        width: '49px',
        height: '49px',
      }}
    />
    <Stack
      direction='row'
      sx={{
        width: '100%',
      }}
      justifyContent='space-between'
    >
      <Stack direction='column'>
        <Typography
          fontSize={14}
          fontWeight={500}
          color={mode === 'light' ? '#11142d' : '#EFEFEF'}
        >
          {name}
        </Typography>
        <Typography fontSize={12} fontWeight={400} color='#808191'>
          {location}
        </Typography>
      </Stack>
      <Typography fontSize={16} fontWeight={600} color='#2F80ED'>
        Ksh {price}
      </Typography>
    </Stack>
  </Stack>
);

const LatestSales = () => {
  const { data, isLoading, isError } = useList({
    resource: 'properties',
  });
  const { mode } = useContext(ColorModeContext);

  const allProperties: any[] = data?.data ?? [];

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error!</Typography>;
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
            Latest Sales
          </Typography>
        </Stack>
        <Box
          sx={{
            maxHeight: '360px',
            height: '100%',
            overflow: 'scroll',
          }}
        >
          {allProperties.length ? (
            allProperties.map((property) => (
              <LatestSale
                key={property._id}
                name={property.title}
                avatar={property.photos[0]}
                price={property.price}
                location={property.location}
                mode={mode}
              />
            ))
          ) : (
            <Typography>No Sales yet</Typography>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default LatestSales;
