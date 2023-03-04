import { FormControl, InputLabel, MenuItem, Select } from '@pankod/refine-mui';
import React from 'react';
import { convertString } from 'utils/convertString';

interface IProps {
  defaultValue: string;
  margin: string;
  style: any;
  menuItems: string[];
  label?: string;
  type: string;
  onChange: (e: any) => void;
}

const Filters = ({
  defaultValue,
  style,
  menuItems,
  margin,
  label,
  onChange,
  type,
}: IProps) => {
  return (
    <FormControl
      fullWidth
      sx={{
        marginRight: '15px',
        marginTop: { xs: margin, sm: '0px' },
        flex: 1,
        minWidth: '169px',
      }}
      className='filter'
    >
      {label ? (
        <InputLabel id='demo-simple-select-label'>Price</InputLabel>
      ) : (
        <></>
      )}
      <Select
        labelId='demo-simple-select-label'
        fullWidth
        variant='outlined'
        label='Price'
        color='info'
        sx={style}
        defaultValue={defaultValue}
        onChange={
          type === 'propertyType' || type === 'propertyStatus'
            ? (e) =>
                onChange([
                  {
                    field: type,
                    operator: 'eq',
                    value: e.target.value,
                  },
                ])
            : () => onChange('price')
        }
      >
        {menuItems.map((item, index) => (
          <MenuItem key={index} value={`${convertString(item)}`}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Filters;
