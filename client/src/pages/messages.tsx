import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@pankod/refine-mui';
import { useList } from '@pankod/refine-core';
import { MessageContent, MessagesList } from 'components';

const Messages = () => {
  const { data, isLoading, isError } = useList({
    resource: 'users',
  });
  const [showMessageContent, setShowMessageContent] = useState(true);
  const [showMessageList, setShowMessageList] = useState(true);
  const screenSize: number = window.innerWidth;

  useEffect(() => {
    if (screenSize <= 576) {
      setShowMessageContent(false);
    } else {
      setShowMessageContent(true);
    }
  }, [screenSize]);

  const handleScreenSwitch = () => {
    setShowMessageContent((prevState) => !prevState);
    setShowMessageList((prevState) => !prevState);
  };

  const users = data?.data || [];

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error!</Typography>;
  return (
    <Box mt={{ xs: '45px', sm: '0px' }}>
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
        {showMessageList ? (
          <Box sx={{ width: { xs: '100%', sm: '30%' } }}>
            <MessagesList
              users={users}
              handleScreenSwitch={handleScreenSwitch}
            />
          </Box>
        ) : (
          <></>
        )}
        {showMessageContent ? (
          <Box
            sx={{
              width: { xs: '100%', sm: '70%' },
              borderLeft: { xs: 'none', sm: '1px solid #E4E4E4' },
            }}
          >
            <MessageContent users={users} />
          </Box>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};

export default Messages;
