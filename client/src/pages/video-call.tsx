import React from 'react';
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
import { useList } from '@pankod/refine-core';
import { useNavigate } from '@pankod/refine-react-router-v6';

const VideoCall = () => {
  const { data, isLoading, isError } = useList({
    resource: 'users',
  });
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const navigate = useNavigate();

  const users = data?.data || [];

  const open = Boolean(anchorEl);
  const popoverId = open ? 'simple-popover' : undefined;

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error!</Typography>;
  return (
    <Box
      sx={{
        marginTop: '30px',
        padding: '20px',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        background: '#fcfcfc',
        borderRadius: '15px',
        gap: '40px',
      }}
    >
      <Box
        width='70%'
        sx={{ paddingRight: '25px', borderRight: '1px solid #E4E4E4' }}
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
              sx={{ fontSize: '18px', color: '#11142d', cursor: 'pointer' }}
            />
            <Typography fontSize={18} color='#11142d' fontWeight={600}>
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
          <img src={VideoCallImg} width='100%' alt='video call' />
          <Box
            width='100%'
            sx={{
              position: 'absolute',
              top: '40px',
            }}
          >
            <img
              src={Time}
              style={{ position: 'absolute', left: '25px' }}
              alt='video call'
            />
            <img
              src={OtherPerson}
              style={{ position: 'absolute', right: '25px' }}
              alt='video call'
            />
          </Box>
          <Box
            sx={{
              position: 'absolute',
            }}
          >
            <img
              src={Volume}
              style={{ position: 'absolute', bottom: '40px', left: '25px' }}
              alt='video call'
            />
            <Box
              sx={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                bottom: '40px',
              }}
            >
              <img
                src={FullScreen}
                style={{
                  marginRight: '20px',
                }}
                alt='video call'
              />
              <img
                src={Mute}
                style={{
                  marginRight: '20px',
                }}
                alt='video call'
              />
              <img
                src={EndCall}
                style={{
                  marginRight: '20px',
                }}
                alt='video call'
              />
              <img
                src={Video}
                style={{
                  marginRight: '20px',
                }}
                alt='video call'
              />
              <img src={Settings} alt='video call' />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box width='30%'>
        <MessageContent users={users} location='video-call' />
      </Box>
    </Box>
  );
};

export default VideoCall;
