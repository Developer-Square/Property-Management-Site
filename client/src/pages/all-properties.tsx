import React, { useMemo } from 'react';
import { Add, Search } from '@mui/icons-material';
import { useTable } from '@pankod/refine-core';
import { Box, Stack, TextField, Typography } from '@pankod/refine-mui';
import { useNavigate } from '@pankod/refine-react-router-v6';

import { PropertyCard, CustomButton, Pagination, Filters } from 'components';

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
    <Box>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Typography fontSize={25} fontWeight={700} color='#11142d'>
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
          backgroundColor: '#fcfcfc',
          padding: '10px',
          borderRadius: '15px',
          height: 'fit-content',
        }}
      >
        <Stack
          sx={{
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
          }}
          alignItems='center'
        >
          <Stack
            direction='row'
            alignItems='center'
            sx={{
              marginBottom: {
                xs: '15px',
                sm: '0px',
              },
              width: '100% !important',
            }}
          >
            <Search sx={{ marginRight: '5px' }} />
            <TextField
              fullWidth
              id='outlined-basic'
              color='info'
              variant='outlined'
              value={currentFilterValues.title}
              onChange={(e) => {
                setFilters([
                  {
                    field: 'title',
                    operator: 'contains',
                    value: e.target.value ? e.target.value : undefined,
                  },
                ]);
              }}
              className='search-input'
              placeholder='Enter an address or city...'
              sx={{ marginRight: '30px' }}
            />
          </Stack>
          <Filters
            defaultValue='for-sale'
            style={{
              height: '43px',
              marginBottom: {
                xs: '15px',
                sm: '0px',
              },
            }}
            type='propertyStatus'
            onChange={setFilters}
            menuItems={['For Sale', 'For Rent']}
          />
          <Filters
            defaultValue='apartment'
            style={{
              height: '43px',
            }}
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
            type='price'
            label='Price'
            onChange={toggleSort}
            menuItems={['High to Low', 'Low to High']}
          />
        </Stack>
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
              photo={property.photo}
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
