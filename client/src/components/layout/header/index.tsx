import React, { useContext } from 'react';
import { useGetIdentity } from '@pankod/refine-core';
import { AppBar, Stack, Toolbar, Avatar, Typography } from '@pankod/refine-mui';

import ProfilePopover from './ProfilePopover';
import { NotificationsOutlined } from '@mui/icons-material';
import NotificationPopover from './NotificationPopover';
import { ColorModeContext } from 'contexts';
// import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';

// import { ColorModeContext } from 'contexts';

export const Header: React.FC = () => {
  // const { mode, setMode } = useContext(ColorModeContext);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [notificationAnchor, setNotificationAnchor] =
    React.useState<HTMLButtonElement | null>(null);
  const { mode } = useContext(ColorModeContext);

  const { data: user } = useGetIdentity();
  const shouldRenderHeader = true; // since we are using the dark/light toggle; we don't need to check if user is logged in or not.

  const open = Boolean(anchorEl);
  const openNotifications = Boolean(notificationAnchor);
  const popoverId = open ? 'simple-popover' : undefined;
  const notificationsPopoverId = openNotifications
    ? 'simple-popover'
    : undefined;

  return shouldRenderHeader ? (
    <AppBar
      color='default'
      position='sticky'
      elevation={0}
      sx={{
        backgroundColor: mode === 'light' ? '#fcfcfc' : '#1A1D1F',
      }}
    >
      <Toolbar>
        <Stack
          direction='row'
          width='100%'
          justifyContent='flex-end'
          alignItems='center'
        >
          <Stack
            direction='row'
            gap='16px'
            alignItems='center'
            justifyContent='center'
            marginRight={{ sm: '20px' }}
          >
            <NotificationsOutlined
              id={notificationsPopoverId}
              onClick={(e: any) => setNotificationAnchor(e.currentTarget)}
              sx={{ cursor: 'pointer' }}
            />
            <NotificationPopover
              popoverId={notificationsPopoverId}
              open={openNotifications}
              anchorEl={notificationAnchor}
              setAnchorEl={setNotificationAnchor}
            />
            {user?.avatar ? (
              <Stack direction='row' sx={{ cursor: 'pointer' }} gap='10px'>
                <Avatar
                  id={popoverId}
                  onClick={(e: any) => setAnchorEl(e.currentTarget)}
                  src={user?.avatar}
                  alt={user?.name}
                />
                <Stack direction='column' display={{ xs: 'none', sm: 'flex' }}>
                  <Typography fontSize={14} fontWeight={600}>
                    {user?.name}
                  </Typography>
                  <Typography fontSize={14} color='#808191'>
                    Admin
                  </Typography>
                </Stack>
              </Stack>
            ) : null}
          </Stack>
          <ProfilePopover
            popoverId={popoverId}
            open={open}
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
          />
        </Stack>
      </Toolbar>
    </AppBar>
  ) : null;
};
