import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography } from '@pankod/refine-mui';
import { MessageContent, MessagesList } from 'components';
import { ColorModeContext } from 'contexts';
import { useSocketContext } from 'contexts/socket.ctx';

const Messages = () => {
  const [showMessageContent, setShowMessageContent] = useState(true);
  const [showMessageList, setShowMessageList] = useState(true);
  const screenSize: number = window.innerWidth;
  const { mode } = useContext(ColorModeContext);
  const { currentRoom } = useSocketContext();

  useEffect(() => {
    if (screenSize <= 576) {
      setShowMessageContent(false);
    } else {
      setShowMessageContent(true);
    }
  }, [screenSize]);

  const handleScreenSwitch = () => {
    if (screenSize <= 576) {
      setShowMessageContent((prevState) => !prevState);
      setShowMessageList((prevState) => !prevState);
    }
  };
  return (
    <Box mt={{ xs: '45px', lg: '0px' }}>
      <Typography
        fontSize={25}
        fontWeight={700}
        color={mode === 'light' ? '#11142d' : '#EFEFEF'}
      >
        Messages
      </Typography>
      <Box
        sx={{
          marginTop: '30px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'row',
          background: mode === 'light' ? '#fcfcfc' : '#1A1D1F',
          borderRadius: '15px',
          gap: '40px',
        }}
      >
        {showMessageList ? (
          <Box sx={{ width: { xs: '100%', sm: '30%' } }}>
            <MessagesList handleScreenSwitch={handleScreenSwitch} mode={mode} />
          </Box>
        ) : (
          <></>
        )}
        {showMessageContent ? (
          <Box
            sx={{
              width: { xs: '100%', sm: '70%' },
              borderLeft: {
                xs: 'none',
                sm: `1px solid ${mode === 'light' ? '#E4E4E4' : '#272B30'}`,
              },
            }}
          >
            <MessageContent room={currentRoom} mode={mode} />
          </Box>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};

export default Messages;
