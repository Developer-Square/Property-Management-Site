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

const videoControls = [FullScreen, Mute, EndCall, Video, Settings];

const VideoCall = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const navigate = useNavigate();
  const { mode } = useContext(ColorModeContext);
  const { currentRoom } = useSocketContext();

  const open = Boolean(anchorEl);
  const popoverId = open ? 'simple-popover' : undefined;

  return (
    <Box
      sx={{
        marginTop: { xs: '45px', sm: '30px' },
        padding: '20px',
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
        background: mode === 'light' ? '#fcfcfc' : '#1A1D1F',
        borderRadius: '15px',
        gap: '40px',
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', lg: '60%', xl: '70%' },
          paddingRight: { xs: '0px', lg: '25px' },
          borderRight: {
            xs: 'none',
            lg: `1px solid ${mode === 'light' ? '#E4E4E4' : '#272B30'}`,
          },
        }}
      >
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          gap='10px'
          marginBottom='15px'
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
              top: { xs: '20px', sm: '40px' },
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                width: { xs: '60px', sm: '94px' },
                left: { xs: '15px', sm: '25px' },
              }}
            >
              <img
                src={Time}
                style={{
                  display: 'block',
                  width: '100%',
                }}
                alt='video call'
              />
            </Box>
            <Box
              sx={{
                position: 'absolute',
                width: { xs: '100px', sm: '170px' },
                right: { xs: '15px', sm: '25px' },
              }}
            >
              <img
                src={OtherPerson}
                style={{
                  display: 'block',
                  width: '100%',
                }}
                alt='video call'
              />
            </Box>
          </Box>
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                width: { xs: '40px', sm: '50px' },
                bottom: { xs: '20px', sm: '40px' },
                left: { xs: '15px', sm: '25px' },
              }}
            >
              <img
                src={Volume}
                style={{
                  display: 'block',
                  width: '100%',
                }}
                alt='video call'
              />
            </Box>

            <Box
              sx={{
                position: 'absolute',
                bottom: { xs: '10px', sm: '40px' },
                left: '54%',
                transform: 'translateX(-46%)',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                height: '50px',
              }}
            >
              {videoControls.map((control, index) => (
                <Box
                  sx={{
                    marginRight: { xs: '10px', sm: '20px' },
                    width: { xs: '36px', sm: '50px' },
                  }}
                  key={index}
                >
                  <img
                    src={control}
                    style={{
                      display: 'block',
                      width: '100%',
                    }}
                    alt='video-call'
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: { xs: '100%', lg: '40%', xl: '30%' },
        }}
      >
        <MessageContent room={currentRoom} mode={mode} location='video-call' />
      </Box>
    </Box>
  );
};

export default VideoCall;
