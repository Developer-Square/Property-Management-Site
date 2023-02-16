import React, { SetStateAction } from 'react';
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

interface IPaginationProps {
  current: number;
  setCurrent: React.Dispatch<SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<SetStateAction<number>>;
  pageCount: number;
}

const Pagination = ({
  pageSize,
  current,
  setCurrent,
  setPageSize,
  pageCount,
}: IPaginationProps) => {
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
          current > 1
            ? () => setCurrent((prevPageNumber) => prevPageNumber - 1)
            : () => {}
        }
      />
      {[...Array(pageCount)].map((_, i) => (
        <PageNumber
          key={i}
          selected={current === i + 1}
          setPageNumber={setCurrent}
          number={i + 1}
        />
      ))}
      <ArrowForwardIosOutlined
        sx={{ fontSize: '16px', marginLeft: '5px', cursor: 'pointer' }}
        onClick={
          current < pageCount
            ? () => setCurrent((prevPageNumber) => prevPageNumber + 1)
            : () => {}
        }
      />
      {!isMobile ? (
        <Select
          variant='outlined'
          color='info'
          inputProps={{ 'aria-label': 'Without label' }}
          defaultValue={10}
          value={pageSize}
          onChange={(e) =>
            setPageSize(e.target.value ? Number(e.target.value) : 10)
          }
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
