import React, { SetStateAction, useState } from 'react';
import { Box } from '@mui/system';
import {
  ArrowBackIosNewOutlined,
  ArrowForwardIosOutlined,
} from '@mui/icons-material';
import { MenuItem, Select } from '@pankod/refine-mui';
import { isMobile } from 'react-device-detect';

const PageNumber = ({
  selected,
  number,
  setPageNumber,
}: {
  selected: boolean;
  number: number;
  setPageNumber: React.Dispatch<SetStateAction<number>>;
}) => (
  <Box
    fontSize={16}
    sx={{
      padding: '7px 15px',
      backgroundColor: selected ? '#475be8' : 'transparent',
      color: selected ? '#fcfcfc' : '',
      borderRadius: '5px',
      marginRight: '10px',
      cursor: 'pointer',
    }}
    onClick={() => setPageNumber(number)}
  >
    {number}
  </Box>
);

const Pagination = () => {
  const [pageNumber, setPageNumber] = useState(1);
  return (
    <Box
      id='pagination'
      sx={{
        marginTop: '30px',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        background: '#fcfcfc',
        width: 'fit-content',
        padding: '10px',
        marginLeft: 'auto',
      }}
    >
      <ArrowBackIosNewOutlined
        sx={{ fontSize: '16px', marginRight: '15px', cursor: 'pointer' }}
        onClick={
          pageNumber > 1
            ? () => setPageNumber((prevPageNumber) => prevPageNumber - 1)
            : () => {}
        }
      />
      {[...Array(5)].map((_, i) => (
        <PageNumber
          key={i}
          selected={pageNumber === i + 1}
          setPageNumber={setPageNumber}
          number={i + 1}
        />
      ))}
      <ArrowForwardIosOutlined
        sx={{ fontSize: '16px', marginLeft: '5px', cursor: 'pointer' }}
        onClick={
          pageNumber < 5
            ? () => setPageNumber((prevPageNumber) => prevPageNumber + 1)
            : () => {}
        }
      />
      {!isMobile ? (
        <Select
          variant='outlined'
          color='info'
          inputProps={{ 'aria-label': 'Without label' }}
          defaultValue={10}
          onChange={() => {}}
          sx={{
            marginLeft: '10px',
          }}
        >
          {[10, 20, 30, 40, 50].map((number) => (
            <MenuItem key={number} value={number}>
              Show {number}
            </MenuItem>
          ))}
        </Select>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default Pagination;
