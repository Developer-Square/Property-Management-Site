import React from 'react';
import { Add, Search } from '@mui/icons-material';
import { useTable } from '@pankod/refine-core';
import {
  Box,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@pankod/refine-mui';
import { useNavigate } from '@pankod/refine-react-router-v6';

import { PropertyCard, CustomButton, Pagination } from 'components';

const AllProperties = () => {
  const navigate = useNavigate();
  const {
    tableQueryResult: { data, isLoading, isError },
    current,
    setCurrent,
    pageCount,
    sorter,
    setSorter,
    filters,
    setFilters,
  } = useTable();

  const allProperties = data?.data ?? [];

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
        <Stack direction='row' alignItems='center'>
          <Search sx={{ marginRight: '5px' }} />
          <TextField
            fullWidth
            id='outlined-basic'
            color='info'
            variant='outlined'
            className='search-input'
            placeholder='Enter an address or city...'
            sx={{ marginRight: '30px' }}
          />
          <Select
            fullWidth
            variant='outlined'
            color='info'
            sx={{ height: '43px' }}
            inputProps={{ 'aria-label': 'Without label' }}
            defaultValue='for-sale'
          >
            <MenuItem value='for-sale'>For Sale</MenuItem>
            <MenuItem value='for-rent'>For Rent</MenuItem>
          </Select>
          <Select
            fullWidth
            variant='outlined'
            color='info'
            sx={{ height: '43px', marginLeft: '30px' }}
            inputProps={{ 'aria-label': 'Without label' }}
            defaultValue='apartment'
          >
            <MenuItem value='apartment'>Apartments</MenuItem>
            <MenuItem value='villa'>Villa</MenuItem>
            <MenuItem value='farmhouse'>FarmHouse</MenuItem>
            <MenuItem value='condos'>Condos</MenuItem>
            <MenuItem value='townhouse'>Townhouse</MenuItem>
            <MenuItem value='duplex'>Duplex</MenuItem>
            <MenuItem value='studio'>Studio</MenuItem>
            <MenuItem value='chalet'>Chalet</MenuItem>
          </Select>
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
        {allProperties.map((property) => (
          <PropertyCard
            key={property._id}
            id={property._id}
            title={property.title}
            price={property.price}
            location={property.location}
            photo={property.photo}
          />
        ))}
      </Box>
      {allProperties.length !== 0 ? <Pagination /> : <></>}
    </Box>
  );
};

export default AllProperties;
