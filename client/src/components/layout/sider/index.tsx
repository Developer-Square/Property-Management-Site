import React, { useContext, useState } from 'react';
import {
  Box,
  Drawer,
  Sider as DefaultSider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Tooltip,
  Button,
  IconButton,
  MuiList,
  FormControlLabel,
} from '@pankod/refine-mui';
import {
  ListOutlined,
  Logout,
  ExpandLess,
  ExpandMore,
  ChevronLeft,
  ChevronRight,
  MenuRounded,
  Dashboard,
} from '@mui/icons-material';
import {
  CanAccess,
  ITreeMenu,
  useIsExistAuthentication,
  useLogout,
  useTitle,
  useTranslate,
  useRouterContext,
  useMenu,
  useRefineContext,
} from '@pankod/refine-core';

import { Title as DefaultTitle } from '../title';
import { ColorModeContext } from 'contexts';
import { MaterialUISwitch } from '../header/ProfilePopover';

export const Sider: typeof DefaultSider = ({ render }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [opened, setOpened] = useState(false);

  const drawerWidth = () => {
    if (collapsed) return 64;
    return 200;
  };

  const t = useTranslate();
  const { Link } = useRouterContext();
  const { hasDashboard } = useRefineContext();
  const translate = useTranslate();

  const { menuItems, selectedKey, defaultOpenKeys } = useMenu();
  const isExistAuthentication = useIsExistAuthentication();
  const { mutate: mutateLogout } = useLogout();
  const Title = useTitle();

  const [open, setOpen] = useState<{ [k: string]: any }>({});
  const { mode, setMode } = useContext(ColorModeContext);

  React.useEffect(() => {
    setOpen((previousOpen) => {
      const previousOpenKeys: string[] = Object.keys(previousOpen);
      const uniqueKeys = new Set([...previousOpenKeys, ...defaultOpenKeys]);
      const uniqueKeysRecord = Object.fromEntries(
        Array.from(uniqueKeys.values()).map((key) => [key, true])
      );
      return uniqueKeysRecord;
    });
  }, [defaultOpenKeys]);

  const RenderToTitle = Title ?? DefaultTitle;

  const handleClick = (key: string) => {
    setOpen({ ...open, [key]: !open[key] });
  };

  // const isSelected = route === selectedKey;
  const isSelected = '/' === selectedKey;

  const renderTreeView = (tree: ITreeMenu[], selectedKey: string) => {
    return tree.map((item: ITreeMenu) => {
      const { icon, label, route, name, children, parentName } = item;
      const isOpen = open[route || ''] || false;

      const isSelected = route === selectedKey;
      const isNested = !(parentName === undefined);

      if (children.length > 0) {
        return (
          <CanAccess
            key={route}
            resource={name.toLowerCase()}
            action='list'
            params={{
              resource: item,
            }}
          >
            <div key={route}>
              <Tooltip
                title={label ?? name}
                placement='right'
                disableHoverListener={!collapsed}
                arrow
              >
                <ListItemButton
                  onClick={() => {
                    if (collapsed) {
                      setCollapsed(false);
                      if (!isOpen) {
                        handleClick(route || '');
                      }
                    } else {
                      handleClick(route || '');
                    }
                  }}
                  sx={{
                    pl: isNested ? 4 : 2,
                    justifyContent: 'center',
                    '&.Mui-selected': {
                      '&:hover': {
                        backgroundColor: 'transparent',
                      },
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      justifyContent: 'center',
                      minWidth: 36,
                      color: 'primary.contrastText',
                    }}
                  >
                    {icon ?? <ListOutlined />}
                  </ListItemIcon>
                  <ListItemText
                    primary={label}
                    primaryTypographyProps={{
                      noWrap: true,
                      fontSize: '16px',
                      fontWeight: isSelected ? 'bold' : 'normal',
                    }}
                  />
                  {!collapsed && (isOpen ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
              </Tooltip>
              {!collapsed && (
                <Collapse in={open[route || '']} timeout='auto' unmountOnExit>
                  <MuiList component='div' disablePadding>
                    {renderTreeView(children, selectedKey)}
                  </MuiList>
                </Collapse>
              )}
            </div>
          </CanAccess>
        );
      }

      return (
        <CanAccess
          key={route}
          resource={name.toLowerCase()}
          action='list'
          params={{ resource: item }}
        >
          <Tooltip
            title={label ?? name}
            placement='right'
            disableHoverListener={!collapsed}
            arrow
          >
            <ListItemButton
              component={Link}
              to={route}
              selected={isSelected}
              onClick={() => {
                setOpened(false);
              }}
              sx={{
                pl: isNested ? 4 : 2,
                py: isNested ? 1.25 : 1,
                '&.Mui-selected': {
                  '&:hover': {
                    backgroundColor: isSelected ? '#1e36e8' : 'transparent',
                  },
                  backgroundColor: isSelected ? '#475be8' : 'transparent',
                },
                justifyContent: 'center',
                margin: '10px auto',
                borderRadius: '12px',
                minHeight: '56px',
                width: '90%',
              }}
            >
              <ListItemIcon
                sx={{
                  justifyContent: 'center',
                  minWidth: 36,
                  color: isSelected
                    ? '#fff'
                    : mode === 'light'
                    ? '#808191'
                    : '#6F767E',
                }}
              >
                {icon ?? <ListOutlined />}
              </ListItemIcon>
              <ListItemText
                primary={label}
                primaryTypographyProps={{
                  noWrap: true,
                  fontSize: '16px',
                  fontWeight: isSelected ? 'bold' : 'normal',
                  color: isSelected
                    ? '#fff'
                    : mode === 'light'
                    ? '#808191'
                    : '#6F767E',
                  marginLeft: '10px',
                }}
              />
            </ListItemButton>
          </Tooltip>
        </CanAccess>
      );
    });
  };

  const dashboard = hasDashboard ? (
    <CanAccess resource='dashboard' action='list'>
      <Tooltip
        title={translate('dashboard.title', 'Dashboard')}
        placement='right'
        disableHoverListener={!collapsed}
        arrow
      >
        <ListItemButton
          component={Link}
          to='/'
          selected={selectedKey === '/'}
          onClick={() => {
            setOpened(false);
          }}
          sx={{
            margin: '10px auto',
            width: '90%',
            borderRadius: '12px',
            '&.Mui-selected': {
              '&:hover': {
                backgroundColor: isSelected ? '#1e36e8' : 'transparent',
              },
              backgroundColor: isSelected ? '#475be8' : 'transparent',
            },
            justifyContent: 'center',
          }}
        >
          <ListItemIcon
            sx={{
              justifyContent: 'center',
              minWidth: 36,
              color: isSelected
                ? '#fcfcfc'
                : mode === 'light'
                ? '#808191'
                : '#6F767E',
              marginLeft: '6px',
              marginRight: '14px',
            }}
          >
            <Dashboard />
          </ListItemIcon>
          <ListItemText
            primary={translate('dashboard.title', 'Dashboard')}
            primaryTypographyProps={{
              noWrap: true,
              fontSize: '16px',
              color: isSelected
                ? '#fcfcfc'
                : mode === 'light'
                ? '#808191'
                : '#6F767E',
              fontWeight: selectedKey === '/' ? 'bold' : 'normal',
            }}
          />
        </ListItemButton>
      </Tooltip>
    </CanAccess>
  ) : null;

  const logout = isExistAuthentication && (
    <Tooltip
      title={t('buttons.logout', 'Logout')}
      placement='right'
      disableHoverListener={!collapsed}
      arrow
    >
      <ListItemButton
        key='logout'
        onClick={() => mutateLogout()}
        sx={{
          justifyContent: 'center',
          margin: '10px auto',
          width: '90%',
          borderRadius: '12px',
        }}
      >
        <ListItemIcon
          sx={{
            justifyContent: 'center',
            minWidth: 36,
            color: '#808191',
          }}
        >
          <Logout />
        </ListItemIcon>
        <ListItemText
          primary={t('buttons.logout', 'Logout')}
          primaryTypographyProps={{
            noWrap: true,
            fontSize: '16px',
          }}
        />
      </ListItemButton>
    </Tooltip>
  );

  const items = renderTreeView(menuItems, selectedKey);

  const renderSider = () => {
    if (render) {
      return render({
        dashboard,
        logout,
        items,
        collapsed,
      });
    }
    return (
      <Box>
        {dashboard}
        {items}
        {logout}
      </Box>
    );
  };

  const drawer = (
    <MuiList disablePadding sx={{ mt: 1, color: '#808191' }}>
      {renderSider()}
    </MuiList>
  );

  return (
    <Box>
      <Box
        sx={{
          width: { xs: drawerWidth() },
          display: {
            xs: 'none',
            md: 'block',
          },
          transition: 'width 0.3s ease',
        }}
      />
      <Box
        component='nav'
        sx={{
          position: 'fixed',
          zIndex: 1101,
          width: { sm: drawerWidth() },
          display: 'flex',
        }}
      >
        <Drawer
          variant='temporary'
          open={opened}
          onClose={() => setOpened(false)}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { sm: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              width: 256,
              bgcolor: mode === 'light' ? '#fcfcfc' : '#1A1D1F',
            },
          }}
        >
          <Box
            sx={{
              height: 64,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <RenderToTitle collapsed={false} />
          </Box>
          {drawer}
        </Drawer>
        <Drawer
          variant='permanent'
          PaperProps={{ elevation: 0 }}
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              bgcolor: mode === 'light' ? '#fcfcfc' : '#1A1D1F',
              overflow: 'hidden',
              transition: 'width 200ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
            },
          }}
          open
        >
          <Box
            sx={{
              height: 64,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <RenderToTitle collapsed={collapsed} />
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              overflowX: 'hidden',
              overflowY: 'auto',
            }}
          >
            {drawer}
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              margin: collapsed ? '15px 0 15px 20px' : '15px auto',
            }}
          >
            <FormControlLabel
              sx={{
                fontSize: '16px !important',
                color: '#808191 !important',
              }}
              onClick={() => setMode()}
              control={<MaterialUISwitch checked={mode === 'dark'} />}
              label={
                !collapsed ? `${mode === 'dark' ? 'Dark' : 'Light'} Mode` : ''
              }
            />
          </Box>
          <Button
            sx={{
              background: '#475BE8',
              color: 'primary.contrastText',
              textAlign: 'center',
              borderRadius: 0,
              borderTop: '1px solid #ffffff1a',
              '&:hover': {
                background: '#1e36e8',
              },
            }}
            fullWidth
            size='large'
            onClick={() => setCollapsed((prev) => !prev)}
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </Button>
        </Drawer>
        <Box
          sx={{
            display: { xs: 'block', md: 'none' },
            position: 'fixed',
            top: '64px',
            left: '0px',
            borderRadius: '0 6px 6px 0',
            bgcolor: '#475BE8',
            zIndex: 1199,
            width: '36px',
          }}
        >
          <IconButton
            sx={{ color: '#fff', width: '36px' }}
            onClick={() => setOpened((prev) => !prev)}
          >
            <MenuRounded />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
