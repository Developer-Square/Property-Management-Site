import { Search } from '@mui/icons-material';
import { Stack, TextField } from '@pankod/refine-mui';
import React from 'react';

const SearchField = ({
  placeholder,
  currentFilterValues,
  setFilters,
  field,
}: {
  placeholder: string;
  currentFilterValues: {
    title?: any;
    name?: any;
    propertyType?: any;
  };
  setFilters: any;
  field: string;
}) => {
  return (
    <Stack
      direction='row'
      alignItems='center'
      sx={{
        minWidth: '169px',
        height: '43px',
        width: '100% !important',
        flex: 1,
      }}
      className='filter'
    >
      <Search sx={{ marginRight: '5px' }} />
      <TextField
        fullWidth
        id='outlined-basic'
        color='info'
        variant='outlined'
        value={
          field === 'title'
            ? currentFilterValues.title
            : currentFilterValues.name
        }
        onChange={(e: any) => {
          setFilters([
            {
              field: field,
              operator: 'contains',
              value: e.target.value ? e.target.value : undefined,
            },
          ]);
        }}
        className='search-input'
        placeholder={placeholder}
        sx={{ marginRight: '15px' }}
      />
    </Stack>
  );
};

export default SearchField;
