import React, { useState } from 'react';
import { Stack, TextField, Box, Typography } from '@pankod/refine-mui';
import { Search } from '@mui/icons-material';
import { timeString12hr } from 'utils/randomDateAndTime';

const messages: string[] = [
  'Hola, soy Ryan. Mucho gusto',
  'Tengo tres hermosos perros',
  'Quiero vivir con mis perros y gatos en mi casa grande',
  'Amo el anime',
  'Me encanta ir la gimnasio',
];

const MessageProfile = ({
  active,
  avatar,
  name,
  message,
  time,
}: {
  active: boolean;
  avatar: string;
  name: string;
  message: string;
  time: string;
}) => (
  <Box
    sx={{
      borderRadius: '6px',
      padding: '15px',
      display: 'flex',
      flexDirection: 'row',
      color: active ? '#fcfcfc' : '#808191',
      background: active ? '#475BE8' : '#fcfcfc',
    }}
  >
    <Stack width='18%' direction='row'>
      <img
        src={avatar}
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
    <Stack width='62%' direction='column' gap='5px'>
      <Typography fontSize={16} fontWeight={600}>
        {name}
      </Typography>
      <Typography fontSize={14}>{message.slice(0, 24) + '...'}</Typography>
    </Stack>
    <Typography width='20%' textAlign='right' fontSize={16} fontWeight={600}>
      {time}
    </Typography>
  </Box>
);

const MessagesList = ({ users }: { users: any }) => {
  const [searchText, setSearchText] = useState('');

  return (
    <>
      <Stack
        direction='row'
        alignItems='center'
        sx={{
          marginBottom: {
            xs: '15px',
            sm: '20px',
          },
          width: '100% !important',
          height: '56px',
        }}
      >
        <Search sx={{ marginRight: '5px' }} />
        <TextField
          fullWidth
          id='outlined-basic'
          color='info'
          variant='outlined'
          value={searchText}
          onChange={(e: any) => setSearchText(e.target.value)}
          className='search-input'
          placeholder='Search...'
          sx={{
            width: '100%',
          }}
        />
      </Stack>
      {users?.length ? (
        users.map((user: any, index: number) => (
          <MessageProfile
            key={user._id}
            active={index === 0}
            avatar={user.avatar}
            name={user.name}
            message={messages[index]}
            time={timeString12hr()}
          />
        ))
      ) : (
        <></>
      )}
    </>
  );
};

export default MessagesList;
