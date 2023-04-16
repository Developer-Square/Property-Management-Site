/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useContext } from 'react';
import { Box, Stack, Typography } from '@pankod/refine-mui';
import { ArrowBackIos } from '@mui/icons-material';

import { EditPopover, MessageContent } from 'components';
import {
  EndCall,
  FullScreen,
  Mute,
  OtherPerson,
  Settings,
  Time,
  Video,
  VideoCallImg,
  Volume,
} from 'assets';
import { useNavigate } from '@pankod/refine-react-router-v6';
import { ColorModeContext } from 'contexts';
import { useSocketContext } from 'contexts/socket.ctx';

const VideoCall = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const navigate = useNavigate();
  const { mode } = useContext(ColorModeContext);
  const { currentRoom } = useSocketContext();

  const open = Boolean(anchorEl);
  const popoverId = open ? 'simple-popover' : undefined;
  console.log(currentRoom, 'rooms');

  return (
    <Box
      sx={{
        marginTop: { xs: '45px', sm: '30px' },
        padding: '20px',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        background: mode === 'light' ? '#fcfcfc' : '#1A1D1F',
        borderRadius: '15px',
        gap: '40px',
      }}
    >
      <Box
        width='70%'
        sx={{
          paddingRight: '25px',
          borderRight: `1px solid ${mode === 'light' ? '#E4E4E4' : '#272B30'}`,
        }}
      >
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          gap='10px'
          width='100%'
        >
          <Stack alignItems='center' direction='row' gap='10px'>
            <ArrowBackIos
              onClick={() => navigate(-1)}
              sx={{
                fontSize: '18px',
                color: mode === 'light' ? '#11142d' : '#EFEFEF',
                cursor: 'pointer',
              }}
            />
            <Typography
              fontSize={18}
              color={mode === 'light' ? '#11142d' : '#EFEFEF'}
              fontWeight={600}
            >
              Video Call
            </Typography>
          </Stack>
          <EditPopover
            popoverId={popoverId}
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            open={open}
            handleUpdate={() => {}}
            handleDelete={() => {}}
          />
        </Stack>
        <Box
          sx={{
            position: 'relative',
          }}
        >
          <img
            src={VideoCallImg}
            style={{
              display: 'block',
            }}
            width='100%'
            alt='video call'
          />
          <Box
            width='100%'
            sx={{
              position: 'absolute',
              top: '40px',
            }}
          >
            <img
              src={Time}
              style={{
                display: 'block',
                position: 'absolute',
                left: '25px',
              }}
              alt='video call'
            />
            <img
              src={OtherPerson}
              style={{
                display: 'block',
                position: 'absolute',
                right: '25px',
              }}
              alt='video call'
            />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
            }}
          >
            <img
              src={Volume}
              style={{
                display: 'block',
                position: 'absolute',
                bottom: '40px',
                left: '25px',
              }}
              alt='video call'
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: '40px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                height: '50px',
              }}
            >
              <img
                src={FullScreen}
                style={{
                  display: 'block',
                  marginRight: '20px',
                }}
                alt='video call'
              />
              <img
                src={Mute}
                style={{
                  display: 'block',
                  marginRight: '20px',
                }}
                alt='video call'
              />
              <img
                src={EndCall}
                style={{
                  display: 'block',
                  marginRight: '20px',
                }}
                alt='video call'
              />
              <img
                src={Video}
                style={{
                  display: 'block',
                  marginRight: '20px',
                }}
                alt='video call'
              />
              <img
                src={Settings}
                style={{
                  display: 'block',
                }}
                alt='video call'
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box width='30%'>
        {/* Todo: Create an empty message content for this page. */}
        <MessageContent room={currentRoom} mode={mode} location='video-call' />
      </Box>
    </Box>
  );
};

export default VideoCall;
