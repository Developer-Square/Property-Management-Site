/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Box, Stack, TextField, Typography } from '@pankod/refine-mui';
import { AttachFile, EmojiEmotions, Send, Videocam } from '@mui/icons-material';

import { Text } from 'components';
import { Property1, Property2 } from 'assets';
import { useNavigate } from '@pankod/refine-react-router-v6';
import { useGetIdentity } from '@pankod/refine-core';
import { IUser } from 'interfaces/user';
import { useSocketContext } from 'contexts/socket.ctx';
import { CreateMessageParams } from 'interfaces/message';
import socket from 'utils/socket';
import { IRoom } from 'interfaces/room';
import { EmptyMessage } from 'components';

const TextImage = ({
  images,
  position,
}: {
  images: string[];
  position: string;
}) => {
  return (
    <Stack
      direction='row'
      sx={{
        paddingLeft: position === 'left' ? '20px' : '0px',
        justifyContent: position === 'left' ? 'flex-start' : 'flex-end',
      }}
      gap='10px'
    >
      {images.map((img: any, index: number) => (
        <img
          key={index}
          src={img}
          alt='Property'
          style={{
            display: 'block',
            borderRadius: '10px',
            maxHeight: '125px',
            maxWidth: '201px',
            width: '100%',
            height: '100%',
            marginTop: '5px',
          }}
        />
      ))}
    </Stack>
  );
};

const MessageContent = ({
  room,
  location,
  mode,
}: {
  room: IRoom;
  location?: string;
  mode?: string;
}) => {
  const navigate = useNavigate();
  const { updateMessages } = useSocketContext();
  const { data: user } = useGetIdentity<IUser>();
  const [draftMessage, setDraftMessage] = useState('');

  if (!user) return null;

  const sendMessage = () => {
    const now = new Date();
    const message: CreateMessageParams = {
      text: draftMessage,
      createdAt: now.toISOString(),
      recipient: room.members[0]._id,
    };

    const messageContent = document.getElementById('message-content');
    if (messageContent) window.scrollTo(0, document.body.scrollHeight);
    setDraftMessage('');
    updateMessages({
      text: draftMessage,
      sent: false,
      id: '',
      sender: user._id,
      room: room.id,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    });
    socket.emit('message', message);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDraftMessage(e.target.value);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <Box
      sx={{
        minHeight: { xs: '600px', sm: '634px' },
      }}
    >
      {room.members.length === 0 ? (
        <EmptyMessage component={location} />
      ) : (
        <>
          <Box
            sx={{
              borderRadius: '6px',
              padding: { xs: '20px 20px 20px 0px', sm: '20px' },
              display: 'flex',
              flexDirection: 'row',
              color: '#808191',
              background: mode === 'light' ? '#fcfcfc' : '#1A1D1F',
              borderBottom: `1px solid ${
                mode === 'light' ? '#E4E4E4' : '#272B30'
              }`,
            }}
          >
            <Stack
              width={{
                xs: '20%',
                lg: location === 'video-call' ? '20%' : '8%',
              }}
              direction='row'
            >
              <img
                src={room.members[0].avatar}
                alt='profile'
                style={{
                  display: 'block',
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                }}
              />
              <Box
                sx={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: room.members[0].online ? '#2ED480' : '#808191',
                  position: 'relative',
                  left: '-10px',
                  top: '35px',
                }}
              ></Box>
            </Stack>
            <Stack
              width={{
                xs: '60%',
                lg: location === 'video-call' ? '60%' : '72%',
              }}
              direction='column'
              gap='5px'
            >
              <Typography
                fontSize={16}
                fontWeight={600}
                color={mode === 'light' ? '#11142d' : '#EFEFEF'}
              >
                {room.members[0].name}
              </Typography>
              <Typography fontSize={14}>Active Now</Typography>
            </Stack>
            <Stack
              width='20%'
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: '45px',
              }}
            >
              <Videocam
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate('/messages/show')}
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  marginTop: '2px',
                  marginBottom: 'auto',
                  cursor: 'pointer',
                }}
              >
                <span style={{ height: '4px' }}>.</span>
                <span style={{ height: '4px' }}>.</span>
                <span style={{ height: '4px' }}>.</span>
              </Box>
            </Stack>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Typography
              fontSize={12}
              sx={{
                padding: '10px',
                background: mode === 'light' ? '#fcfcfc' : '#1A1D1F',
                marginTop: '-20px',
              }}
            >
              Today
            </Typography>
          </Box>
          <Box
            sx={{
              maxHeight: '400px',
              height: '100%',
              overflow: 'auto',
            }}
            id='message-content'
          >
            {room.messages.map((message) => (
              <Text
                position={message.sender === user._id ? 'right' : 'left'}
                avatar={
                  message.sender === user._id
                    ? user.avatar
                    : room.members[0].avatar
                }
                message={message.text}
                mode={mode}
                createdAt={message.createdAt}
              />
            ))}
            {/* <Text position='left' users={users} message={messages[0]} mode={mode} />
        <Text
          position='right'
          users={users}
          message={messages[1]}
          mode={mode}
        />
        <Text position='left' users={users} message={messages[2]} mode={mode} />
        <Text
          position='right'
          users={users}
          message={messages[3]}
          mode={mode}
        />
        <TextImage position='right' images={[Property1, Property2]} />
        <Text position='left' users={users} message={messages[4]} mode={mode} /> */}
          </Box>
          <Box
            sx={{
              padding: { xs: '20px 0px', sm: '20px' },
              marginTop: '30px',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <TextField
              fullWidth
              placeholder='Write a message here...'
              value={draftMessage}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              sx={{
                background: mode === 'light' ? '#F2F2F2' : '#272B30',
              }}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: '10px',
                cursor: 'pointer',
              }}
            >
              <EmojiEmotions />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: '10px',
                cursor: 'pointer',
              }}
            >
              <AttachFile />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: '10px',
                width: '56px',
                height: '56px',
                background: mode === 'light' ? '#F2F2F2' : '#272B30',
                cursor: 'pointer',
              }}
              onClick={sendMessage}
            >
              <Send />
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default MessageContent;
