import React, { useContext } from 'react';
import { useRouterContext, TitleProps } from '@pankod/refine-core';
import { Button } from '@pankod/refine-mui';

import { DarkLogo, LightLogo } from 'assets';
import { ColorModeContext } from 'contexts';

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  const { Link } = useRouterContext();
  const { mode } = useContext(ColorModeContext);

  return (
    <Button fullWidth variant='text' disableRipple>
      <Link to='/'>
        {collapsed ? (
          <img
            src={mode === 'light' ? DarkLogo : LightLogo}
            alt='Logo'
            style={{
              display: 'block',
              width: '45px',
              borderRadius: '50%',
            }}
          />
        ) : (
          <img
            src={mode === 'light' ? DarkLogo : LightLogo}
            alt='Refine'
            style={{
              display: 'block',
              marginTop: '10px',
              width: '50px',
              borderRadius: '50%',
            }}
          />
        )}
      </Link>
    </Button>
  );
};
