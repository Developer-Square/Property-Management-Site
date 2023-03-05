import React, { useContext } from 'react';
import { LayoutProps } from '@pankod/refine-core';
import { Box } from '@pankod/refine-mui';

import { Sider as DefaultSider } from '../sider';
import { Header as DefaultHeader } from '../header';
import { ColorModeContext } from 'contexts';

export const Layout: React.FC<LayoutProps> = ({
  Sider,
  Header,
  Footer,
  OffLayoutArea,
  children,
}) => {
  const SiderToRender = Sider ?? DefaultSider;
  const HeaderToRender = Header ?? DefaultHeader;
  const { mode } = useContext(ColorModeContext);

  return (
    <Box display='flex' flexDirection='row' sx={{ overflowX: 'hidden' }}>
      <SiderToRender />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minHeight: '100vh',
          width: '100%',
        }}
      >
        <HeaderToRender />
        <Box
          component='main'
          sx={{
            p: { xs: 1, md: 2, lg: 3 },
            flexGrow: 1,
            bgcolor: mode === 'light' ? '#F4F4F4' : '#111315',
          }}
        >
          {children}
        </Box>
        {Footer && <Footer />}
      </Box>
      {OffLayoutArea && <OffLayoutArea />}
    </Box>
  );
};
