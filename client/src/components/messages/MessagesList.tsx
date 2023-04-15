import { useEffect, useState } from 'react';
import { Stack, TextField, Box, Typography } from '@pankod/refine-mui';
import { Search } from '@mui/icons-material';
import { useSocketContext } from 'contexts/socket.ctx';
import { IRoom } from 'interfaces/room';
import { BaseRecord, useList } from '@pankod/refine-core';

const MessageProfile = ({
  active,
  avatar,
  name,
  message,
  time,
  mode,
  room,
  handleCurrentRoom,
}: {
  active: boolean;
  avatar: string;
  name: string;
  message: string;
  time: string;
  mode: string;
  room: IRoom;
  handleCurrentRoom: (room: IRoom) => void;
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
      cursor: 'pointer',
    }}
    onClick={() => handleCurrentRoom(room)}
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
          background: active ? '#2ED480' : '#808191',
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
  handleScreenSwitch,
  mode,
}: {
  handleScreenSwitch: () => void;
  mode: string;
}) => {
  const [showUserList, setShowUserList] = useState(false);
  const [userList, setUserList] = useState<BaseRecord[]>([]);
  const [searchText, setSearchText] = useState('');
  const { rooms, handleCurrentRoom } = useSocketContext();
  const { data, isLoading, isError } = useList({
    resource: 'users',
  });

  const users = data?.data || [];

  useEffect(() => {
    if (users.length) {
      setUserList(users);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const filterUsers = (searchText: string) => {
    const filteredUsers = users.filter((user) => {
      return user.name.toLowerCase().includes(searchText.toLowerCase());
    });
    setUserList(filteredUsers);
  };

  const hanldeSearch = (text: string) => {
    if (text.length > 0) {
      setShowUserList(true);
      setSearchText(text);
      filterUsers(text);
      return;
    }
    setShowUserList(false);
    setSearchText('');
  };

  // When a user clicks on a user profile in the search results, clear the search text and hide the search results.
  const handleUserClick = () => {
    setSearchText('');
    setShowUserList(false);
    handleCurrentRoom(rooms[0]);
    // Todo: Create a new room and show the chat screen.
  };

  console.log(rooms[0], 'rooms[0]');

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error!</Typography>;

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
          onChange={(e: any) => hanldeSearch(e.target.value)}
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
        {showUserList &&
          userList.map((user, index) => (
            <MessageProfile
              key={index}
              active={user.online}
              avatar={user.avatar}
              name={user.name}
              message={''}
              time={''}
              mode={mode}
              room={rooms[0]}
              handleCurrentRoom={handleCurrentRoom}
            />
          ))}
        {!showUserList &&
          rooms.map((room, index) => (
            <MessageProfile
              key={index}
              active={room.members[0].online}
              avatar={room.members[0].avatar}
              name={room.members[0].name}
              message={room.messages[room.messages.length - 1].text}
              time={new Date(
                room.messages[room.messages.length - 1].createdAt
              ).toLocaleTimeString('en-US', {
                timeZone: 'UTC',
                hour12: true,
                hour: 'numeric',
                minute: 'numeric',
              })}
              mode={mode}
              room={room}
              handleCurrentRoom={handleCurrentRoom}
            />
          ))}
      </Box>
    </Box>
  );
};

export default MessagesList;
