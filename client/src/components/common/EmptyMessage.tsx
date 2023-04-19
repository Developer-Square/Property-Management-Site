import React from 'react';
import { Box, Stack, Typography } from '@pankod/refine-mui';

import { ChatMessage, SearchChat } from 'assets';

const tecHiveChat =
  'Revolutionize your real estate communication with our messaging platform. From connecting with clients to closing deals, our platform streamlines every step of the process.';
const searchChat = 'Search for a chat to start messaging.';

const EmptyMessage = ({ component }: { component?: string }) => {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img
        src={component === 'message-list' ? SearchChat : ChatMessage}
        alt='empty message'
        style={{
          display: 'block',
          width:
            component === 'video-call' || component === 'message-list'
              ? '206px'
              : '306px',
          height:
            component === 'video-call' || component === 'message-list'
              ? '206px'
              : '306px',
          marginRight: '40px',
        }}
      />
      <Stack direction='column' gap={3}>
        <Typography fontSize={36} fontWeight={700} textAlign='center'>
          {component === 'message-list' ? 'No Chats' : 'No Messages'}
        </Typography>
        <Typography
          fontSize={16}
          textAlign='center'
          sx={{
            fontSize: component === 'video-call' ? '15px' : '16px',
            textAlign: 'center',
            padding: '0px',
            width: {
              xs: '300px',
              sm: '400px',
              md:
                component === 'video-call' || component === 'message-list'
                  ? '300px'
                  : '500px',
            },
            margin: '0px auto',
          }}
        >
          {component === 'message-list' ? searchChat : tecHiveChat}
        </Typography>
      </Stack>
    </Box>
  );
};

export default EmptyMessage;
