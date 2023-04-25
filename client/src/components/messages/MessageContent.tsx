/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Box, Stack, TextField, Typography } from '@pankod/refine-mui';
import {
  ArrowBackIos,
  AttachFile,
  EmojiEmotions,
  Send,
  Videocam,
} from '@mui/icons-material';

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
import { toast } from 'react-toastify';

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
  isTabletSize,
}: {
  room: IRoom;
  location?: string;
  mode?: string;
  isTabletSize?: boolean;
}) => {
  const navigate = useNavigate();
  const { updateMessages, createRoom, handleCreateRoom } = useSocketContext();
  const { data: user } = useGetIdentity<IUser>();
  const [draftMessage, setDraftMessage] = useState('');

  if (!user) return null;

  const sendMessage = () => {
    if (draftMessage === '') {
      toast('Kindly type in your message', {
        type: 'error',
      });
      return;
    }
    const now = new Date();
    const message: CreateMessageParams = {
      text: draftMessage,
      createdAt: now.toISOString(),
      recipient: createRoom._id !== '' ? createRoom._id : room.members[0]._id,
    };

    const messageContent = document.getElementById('message-content');
    if (messageContent) window.scrollTo(0, document.body.scrollHeight);
    setDraftMessage('');
    handleCreateRoom({
      _id: '',
      name: '',
      avatar: '',
      online: false,
      roomMessages: [],
    });
    updateMessages({
      text: draftMessage,
      sent: false,
      id: '',
      sender: user._id,
      room: '',
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

  let currentDate = '';
  const today = new Date().toDateString();

  // A function that formats the date to a readable format.
  // This function also check every date passed in, if the date is the same as the previous date then it will not display the date.
  const formatDate = (date: string) => {
    const newDate = new Date(date);
    const today = new Date();
    if (currentDate !== newDate.toDateString()) {
      currentDate = newDate.toDateString();

      return currentDate;
    }

    return '';
  };

  return (
    <Box
      sx={{
        minHeight: { xs: '600px', sm: '634px' },
      }}
    >
      {/* If room.members is empty and createRoom is empty then display the EmptyMessage component. */}
      {room.members.length === 0 && createRoom.name === '' ? (
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
                xs: '27%',
                lg: location === 'video-call' ? '20%' : '8%',
                alignItems: 'center',
              }}
              direction='row'
            >
              {isTabletSize && (
                <ArrowBackIos
                  onClick={() => navigate(-1)}
                  sx={{
                    fontSize: '18px',
                    color: mode === 'light' ? '#11142d' : '#EFEFEF',
                    cursor: 'pointer',
                  }}
                />
              )}
              <img
                src={createRoom.avatar ?? room.members[0].avatar}
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
                  background:
                    createRoom.online ?? room.members[0].online
                      ? '#2ED480'
                      : '#808191',
                  position: 'relative',
                  left: '-10px',
                  top: '17px',
                }}
              ></Box>
            </Stack>
            <Stack
              width={{
                xs: '58%',
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
                {createRoom.name ?? room.members[0].name}
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
              height: {
                xs: '400px',
                sm: location === 'video-call' ? '600px' : '400px',
              },
              overflow: 'auto',
            }}
            id='message-content'
          >
            {room.messages.length ? (
              room.messages.map((message) => (
                <div key={message.id}>
                  <Box
                    sx={{
                      fontSize: '14px',
                      textAlign: 'center',
                      margin: '20px 0px',
                    }}
                  >
                    {formatDate(message.createdAt)}
                  </Box>
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
                </div>
              ))
            ) : (
              <></>
            )}
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
