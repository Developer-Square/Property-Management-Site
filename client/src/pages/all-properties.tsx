import React, { useContext, useMemo } from 'react';
import { Add } from '@mui/icons-material';
import { useTable } from '@pankod/refine-core';
import { Box, Stack, Typography } from '@pankod/refine-mui';
import { useNavigate } from '@pankod/refine-react-router-v6';

import {
  PropertyCard,
  CustomButton,
  Pagination,
  Filters,
  SearchField,
} from 'components';
import { ColorModeContext } from 'contexts';

const AllProperties = () => {
  const navigate = useNavigate();
  const {
    tableQueryResult: { data, isLoading, isError },
    current,
    setCurrent,
    pageCount,
    pageSize,
    setPageSize,
    sorter,
    setSorter,
    filters,
    setFilters,
  } = useTable();
  const { mode } = useContext(ColorModeContext);

  const allProperties: any[] = data?.data ?? [];

  const currentPriceOrder = sorter?.find(
    // @ts-ignore
    (item) => item.field === 'price'
  )?.order;

  const toggleSort = (field: string) => {
    setSorter([{ field, order: currentPriceOrder === 'asc' ? 'desc' : 'asc' }]);
  };

  const currentFilterValues = useMemo(() => {
    const logicalFilters = filters.flatMap((item) =>
      'field' in item ? item : []
    );

    return {
      title: logicalFilters.find((item) => item.field === 'title')?.value || '',
      propertyType:
        logicalFilters.find((item) => item.field === 'propertyType')?.value ||
        '',
    };
  }, [filters]);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error!</Typography>;

  return (
    <Box mt={{ xs: '45px', lg: '0px' }}>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Typography
          fontSize={25}
          fontWeight={700}
          color={mode === 'light' ? '#11142d' : '#EFEFEF'}
        >
          Propery List
        </Typography>
        <CustomButton
          title='Add Property'
          handleClick={() => navigate('/properties/create')}
          backgroundColor='#475be8'
          color='#fcfcfc'
          icon={<Add />}
        />
      </Stack>

      <Box
        sx={{
          marginTop: '20px',
          backgroundColor: mode === 'light' ? '#fcfcfc' : '#1A1D1F',
          padding: '15px',
          borderRadius: '15px',
          height: 'fit-content',
          display: 'flex',
          flexDirection: {
            xs: 'row',
            sm: 'row',
          },
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <SearchField
          field='title'
          placeholder='Enter an address or city...'
          currentFilterValues={currentFilterValues}
          setFilters={setFilters}
        />
        <Filters
          defaultValue='for-sale'
          style={{
            height: '43px',
          }}
          margin='0px'
          type='propertyStatus'
          onChange={setFilters}
          menuItems={['For Sale', 'For Rent']}
        />
        <Filters
          defaultValue='apartment'
          style={{
            height: '43px',
          }}
          margin='20px'
          type='propertyType'
          onChange={setFilters}
          menuItems={[
            'Apartment',
            'Villa',
            'FarmHouse',
            'Condos',
            'Townhouse',
            'Duplex',
            'Studio',
            'Chalet',
          ]}
        />
        <Filters
          defaultValue='high-to-low'
          style={{
            height: '43px',
          }}
          margin='20px'
          type='price'
          label='Price'
          onChange={toggleSort}
          menuItems={['High to Low', 'Low to High']}
        />
      </Box>

      <Box
        mt='20px'
        id='property-cards'
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 3,
        }}
      >
        {allProperties.length ? (
          allProperties.map((property) => (
            <PropertyCard
              key={property._id}
              id={property._id}
              title={property.title}
              price={property.price}
              location={property.location}
              photos={property.photos}
              mode={mode}
            />
          ))
        ) : (
          <Box>No Results Found</Box>
        )}
      </Box>
      {allProperties.length !== 0 ? (
        <Pagination
          pageSize={pageSize}
          pageCount={pageCount}
          setPageSize={setPageSize}
          current={current}
          setCurrent={setCurrent}
        />
      ) : (
        <></>
      )}
    </Box>
  );
};

export default AllProperties;
