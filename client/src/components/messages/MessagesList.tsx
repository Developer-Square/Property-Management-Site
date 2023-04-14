import { useState } from 'react';
import { Stack, TextField, Box, Typography } from '@pankod/refine-mui';
import { Search } from '@mui/icons-material';
import { timeString12hr } from 'utils/randomDateAndTime';
import { useSocketContext } from 'contexts/socket.ctx';

const messages: string[] = [
  'Hola, soy Ryan. Mucho gusto',
  'Tengo tres hermosos perros',
  'Quiero vivir con mis perros y gatos en mi casa grande',
  'Amo el anime',
  'Me encanta ir la gimnasio',
  'Hola mi nombre es Ryan Njoroge',
];

const MessageProfile = ({
  active,
  avatar,
  name,
  message,
  time,
  mode,
}: {
  active: boolean;
  avatar: string;
  name: string;
  message: string;
  time: string;
  mode: string;
}) => (
  <Box
    sx={{
      borderRadius: '6px',
      padding: { xs: '18px', sm: '10px', lg: '15px' },
      marginBottom: { xs: '10px', lg: 'initial' },
      display: 'flex',
      flexDirection: 'row',
      color: active ? '#fcfcfc' : '#808191',
      background: active ? '#475BE8' : mode === 'light' ? '#fcfcfc' : '#1A1D1F',
    }}
  >
    <Stack width={{ xs: '21%', sm: '32%', lg: '18%' }} direction='row'>
      <img
        src={avatar}
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
          background: '#2ED480',
          position: 'relative',
          left: '-10px',
          top: '35px',
        }}
      ></Box>
    </Stack>
    <Stack
      width={{ xs: '61%', sm: '48%', lg: '62%' }}
      direction='column'
      gap='5px'
    >
      <Typography
        fontSize={{ sm: 14, lg: 16 }}
        fontWeight={600}
        color={active ? '#fcfcfc' : mode === 'light' ? '#11142d' : '#EFEFEF'}
      >
        {name}
      </Typography>
      <Typography fontSize={14}>{message.slice(0, 18) + '...'}</Typography>
    </Stack>
    <Typography
      width={{ xs: '30%', sm: '20%', lg: '20%' }}
      textAlign='right'
      fontSize={{ sm: 13, lg: 16 }}
      fontWeight={600}
      color={active ? '#fcfcfc' : mode === 'light' ? '#11142d' : '#EFEFEF'}
    >
      {time}
    </Typography>
  </Box>
);

const MessagesList = ({
  users,
  handleScreenSwitch,
  mode,
}: {
  users: any;
  handleScreenSwitch: () => void;
  mode: string;
}) => {
  const [searchText, setSearchText] = useState('');
  const { rooms } = useSocketContext();

  return (
    <Box>
      <Stack
        direction='row'
        alignItems='center'
        sx={{
          marginBottom: '20px',
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
      <Box
        sx={{
          maxHeight: '620px',
          height: '100%',
          overflow: 'scroll',
        }}
        onClick={() => handleScreenSwitch()}
      >
        {/* {users?.length ? (
          users.map((user: any, index: number) => (
            <MessageProfile
              key={user._id}
              active={index === 0}
              avatar={user.avatar}
              name={user.name}
              message={messages[index] ?? messages[0]}
              time={timeString12hr()}
              mode={mode}
            />
          ))
        ) : (
          <></>
        )} */}
        {rooms.map((room, index) => (
          <MessageProfile
            key={index}
            active={room.members[0].online}
            avatar={room.members[0].avatar}
            name={room.members[0].name}
            message={room.messages[room.messages.length - 1].text}
            time={new Date(room.messages[room.messages.length - 1].createdAt).toLocaleTimeString('en-US', {
              timeZone: 'UTC',
              hour12: true,
              hour: 'numeric',
              minute: 'numeric',
            })}
            mode={mode}
          />
        ))}
      </Box>
    </Box>
  );
};

export default MessagesList;
