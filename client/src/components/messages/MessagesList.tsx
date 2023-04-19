/* eslint-disable array-callback-return */
import { useEffect, useState } from 'react';
import { Stack, TextField, Box, Typography } from '@pankod/refine-mui';
import { Search } from '@mui/icons-material';
import { useSocketContext } from 'contexts/socket.ctx';
import { BaseRecord, useList } from '@pankod/refine-core';
import EmptyMessage from 'components/common/EmptyMessage';
import { IRoom } from 'interfaces/room';

const MessageProfile = ({
  active,
  avatar,
  name,
  message,
  time,
  mode,
  room,
  user,
  handleCurrentRoom,
}: {
  active: boolean;
  avatar: string;
  name: string;
  message: string;
  time: string;
  mode: string;
  room?: IRoom;
  user?: BaseRecord;
  handleCurrentRoom: (value: any) => void;
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
    // If the user clicks on one of the items in the userlist then create a room else set the current room.
    onClick={() => handleCurrentRoom(room || user)}
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
  const { rooms, handleCurrentRoom, handleCreateRoom } = useSocketContext();
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
  const handleUserClick = (user: BaseRecord) => {
    const { _id, name, avatar, online } = user;
    setSearchText('');
    setShowUserList(false);
    // If the rooms array is empty, create a new room and show the chat screen.
    if (rooms.length === 0) {
      handleCreateRoom({
        _id,
        name,
        avatar,
        online,
        roomMessages: [],
      });
      return;
    }

    // If the rooms array is not empty, check if the user is already in the rooms array.
    if (rooms.length > 0) {
      rooms.map((room) => {
        // If the user is already in the rooms array, show the chat screen.
        if (room.members[0]._id === _id) {
          handleCurrentRoom(room);
          return;
        }
      });
    }
    // If the user is not in the rooms array, create a new room and show the chat screen.
    handleCreateRoom({
      _id,
      name,
      avatar,
      online,
      roomMessages: [],
    });
  };

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error!</Typography>;

  return (
    <Box
      sx={{
        minHeight: { xs: '600px', sm: '634px' },
      }}
    >
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
          placeholder='Search or start a new chat'
          sx={{
            width: '100%',
          }}
        />
      </Stack>
      {rooms.length === 0 && searchText.length === 0 ? (
        <EmptyMessage component='message-list' />
      ) : (
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
                user={user}
                handleCurrentRoom={handleUserClick}
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
      )}
    </Box>
  );
};

export default MessagesList;
