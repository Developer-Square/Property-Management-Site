import React from 'react';
import { Box, Typography } from '@pankod/refine-mui';
import { useList } from '@pankod/refine-core';
import { MessageContent, MessagesList } from 'components';

const Messages = () => {
  const { data, isLoading, isError } = useList({
    resource: 'users',
  });

  const users = data?.data || [];

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error!</Typography>;
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color='#11142d'>
        Messages
      </Typography>
      <Box
        sx={{
          marginTop: '30px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'row',
          background: '#fcfcfc',
          borderRadius: '15px',
          gap: '40px',
        }}
      >
        <Box sx={{ width: '30%' }}>
          <MessagesList users={users} />
        </Box>
        <Box sx={{ width: '70%', borderLeft: '1px solid #E4E4E4' }}>
          <MessageContent users={users} />
        </Box>
      </Box>
    </Box>
  );
};

export default Messages;
