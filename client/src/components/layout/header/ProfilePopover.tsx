import { AccountCircle, Logout, ToggleOff } from '@mui/icons-material';
import { useLogout } from '@pankod/refine-core';
import { Popover, Stack, Typography } from '@pankod/refine-mui';
import { useNavigate } from '@pankod/refine-react-router-v6';
import { ColorModeContext } from 'contexts';
import React, { useContext } from 'react';

const PopoverItem = ({
  Icon,
  color,
  navigateFn,
  text,
}: {
  Icon: any;
  color: string;
  navigateFn: () => void;
  text: string;
}) => (
  <Stack
    direction='row'
    gap='8px'
    sx={{ padding: '10px', cursor: 'pointer' }}
    onClick={navigateFn}
  >
    <Icon />
    <Typography fontSize={14} fontWeight={600} color={color}>
      {text}
    </Typography>
  </Stack>
);

const ProfilePopover = ({
  popoverId,
  open,
  anchorEl,
  setAnchorEl,
}: {
  popoverId: string | undefined;
  open: any;
  anchorEl: any;
  setAnchorEl: any;
}) => {
  const navigate = useNavigate();
  const { mutate: mutateLogout } = useLogout();
  const { setMode } = useContext(ColorModeContext);
  return (
    <Popover
      id={popoverId}
      open={open}
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(null)}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <PopoverItem
        Icon={() => (
          <AccountCircle
            sx={{
              fontSize: '20px',
              color: '#475BE8',
              fontWeight: 'bold',
            }}
          />
        )}
        color='#475BE8'
        navigateFn={() => navigate('/my-profile')}
        text={'Edit Profile'}
      />
      <PopoverItem
        Icon={() => (
          <Logout
            sx={{
              fontSize: '20px',
              color: '#808191',
              fontWeight: 'bold',
            }}
          />
        )}
        color='#808191'
        navigateFn={() => mutateLogout()}
        text={'Logout'}
      />
      <PopoverItem
        Icon={() => (
          <ToggleOff
            sx={{
              fontSize: '24px',
              color: '#808191',
              fontWeight: 'bold',
            }}
          />
        )}
        color='#808191'
        navigateFn={() => setMode()}
        text={'Dark mode'}
      />
    </Popover>
  );
};

export default ProfilePopover;
