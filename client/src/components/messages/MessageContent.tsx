import React from 'react';
import { Box, Stack, TextField, Typography } from '@pankod/refine-mui';
import { AttachFile, EmojiEmotions, Send, Videocam } from '@mui/icons-material';

import { Text } from 'components';
import { Property1, Property2 } from 'assets';

const messages: string[] = [
  'Hola, soy Ryan. Mucho gusto',
  'Tengo tres hermosos perros',
  'Quiero vivir con mis perros y gatos en mi casa grande',
  'Amo el anime',
  'Me encanta ir la gimnasio',
];

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

const MessageContent = ({ users }: { users: any }) => {
  return (
    <>
      <Box
        sx={{
          borderRadius: '6px',
          padding: { xs: '20px 20px 20px 0px', sm: '20px' },
          display: 'flex',
          flexDirection: 'row',
          color: '#808191',
          background: '#fcfcfc',
          borderBottom: '1px solid #E4E4E4',
        }}
      >
        <Stack width={{ xs: '20%', lg: '8%' }} direction='row'>
          <img
            src={users[0].avatar}
            alt='profile'
            style={{
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
              background: '#2ED480',
              position: 'relative',
              left: '-10px',
              top: '35px',
            }}
          ></Box>
        </Stack>
        <Stack width={{ xs: '60%', lg: '72%' }} direction='column' gap='5px'>
          <Typography fontSize={16} fontWeight={600} color='#11142d'>
            {users[0].name}
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
          <Videocam sx={{ cursor: 'pointer' }} />
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
            background: '#fcfcfc',
            marginTop: '-20px',
          }}
        >
          Today
        </Typography>
      </Box>
      <Box sx={{ maxHeight: '600px', height: '100%', overflow: 'auto' }}>
        <Text position='left' users={users} message={messages[0]} />
        <Text position='right' users={users} message={messages[1]} />
        <Text position='left' users={users} message={messages[2]} />
        <Text position='right' users={users} message={messages[3]} />
        <TextImage position='right' images={[Property1, Property2]} />
        <Text position='left' users={users} message={messages[4]} />
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
          sx={{
            background: '#F2F2F2',
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
            background: '#f2f2f2',
            cursor: 'pointer',
          }}
        >
          <Send />
        </Box>
      </Box>
    </>
  );
};

export default MessageContent;
