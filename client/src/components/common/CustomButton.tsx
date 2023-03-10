import React from 'react';
import { Button } from '@pankod/refine-mui';

import { CustomButtonProps } from 'interfaces/common';

const CustomButton = ({
  type,
  title,
  backgroundColor,
  color,
  fullWidth,
  active,
  icon,
  border,
  handleClick,
}: CustomButtonProps) => {
  return (
    <Button
      type={type === 'submit' ? 'submit' : 'button'}
      disabled={active}
      sx={{
        padding: '10px 15px',
        width: fullWidth ? '100%' : 'fit-content',
        minWidth: 130,
        backgroundColor,
        color,
        fontSize: 16,
        fontWeight: 600,
        gap: '10px',
        border,
        textTransform: 'capitalize',
        '&:hover': {
          opacity: 0.9,
          backgroundColor,
        },
        height: '46px',
      }}
      onClick={handleClick}
    >
      {icon}
      {title}
    </Button>
  );
};

export default CustomButton;
