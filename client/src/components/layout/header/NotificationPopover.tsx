import { Popover, Stack, Typography } from '@pankod/refine-mui';
import { Calendar, NotificationSettings, Payment } from 'assets';
import React from 'react';

const NotificationItem = ({
  img,
  title,
  content,
  time,
}: {
  img: string;
  title: string;
  content: string;
  time: string;
}) => (
  <Stack
    direction='row'
    gap='10px'
    sx={{
      padding: '20px',
      cursor: 'pointer',
      maxWidth: '411px',
      width: '100%',
      maxHeight: '705px',
      height: 'auto',
      overflow: 'scroll',
      borderBottom: '1px solid #E4E4E4',
    }}
  >
    <img
      src={img}
      style={{
        width: '38px',
        height: '38px',
      }}
      alt='notification'
    />
    <Stack direction='column'>
      <Typography fontSize={14} fontWeight={600} color='#11142d'>
        {title}
      </Typography>
      <Typography
        fontSize={12}
        fontWeight={400}
        color='#808191'
        sx={{
          marginBottom: '8px',
        }}
      >
        {content}
      </Typography>
      <Typography fontSize={14} fontWeight={400} color='#11142d'>
        {time}
      </Typography>
    </Stack>
  </Stack>
);

const NotificationPopover = ({
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
      <NotificationItem
        img={Payment}
        title='Payment Success'
        content='Your success an order payment from star
sun appartment in the amount of Ksh 30,000'
        time='10 minutes ago'
      />
      <NotificationItem
        img={NotificationSettings}
        title='Update apps'
        content='The Apps application has made updates to improve services'
        time='1 Mar 2023'
      />
      <NotificationItem
        img={Calendar}
        title='Booking Success'
        content='You completed the order from star sun hotel and Appartment'
        time='23 Feb 2023'
      />
      <NotificationItem
        img={Payment}
        title='Payment Success'
        content='Your success an order payment from star
sun appartment in the amount of Ksh 30,000'
        time='10 minutes ago'
      />
      <NotificationItem
        img={NotificationSettings}
        title='Update apps'
        content='The Apps application has made updates to improve services'
        time='1 Mar 2023'
      />
    </Popover>
  );
};

export default NotificationPopover;
