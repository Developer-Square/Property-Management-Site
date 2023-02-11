import React from 'react';
import { useRouterContext, TitleProps } from '@pankod/refine-core';
import { Button } from '@pankod/refine-mui';

import { DarkLogo } from 'assets';

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  const { Link } = useRouterContext();

  return (
    <Button fullWidth variant='text' disableRipple>
      <Link to='/'>
        {collapsed ? (
          <img
            src={DarkLogo}
            alt='Logo'
            style={{ width: '45px', borderRadius: '50%' }}
          />
        ) : (
          <img
            src={DarkLogo}
            alt='Refine'
            style={{ marginTop: '10px', width: '50px', borderRadius: '50%' }}
          />
        )}
      </Link>
    </Button>
  );
};
