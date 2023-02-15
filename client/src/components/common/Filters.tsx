import { FormControl, InputLabel, MenuItem, Select } from '@pankod/refine-mui';
import React from 'react';
import { convertString } from 'utils/convertString';

interface IProps {
  defaultValue: string;
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
  label,
  onChange,
  type,
}: IProps) => {
  return (
    <FormControl fullWidth sx={{ marginRight: '30px' }}>
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
          type === 'propertyType'
            ? (e) =>
                onChange([
                  {
                    field: 'propertyType',
                    operator: 'eq',
                    value: e.target.value ? e.target.value : 'apartment',
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
