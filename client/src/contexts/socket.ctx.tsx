import { useEffect, useState } from 'react';

import socket from 'utils/socket';
import { IRoom } from 'interfaces/room';
import { createCtx } from 'utils';
import { IMessage } from 'interfaces/message';
interface SocketContext {
  rooms: IRoom[];
  isConnected: boolean;
  onlineUsers: string[];
  updateMessages: (message: IMessage) => void;
  currentRoom: IRoom;
  handleCurrentRoom: (room: IRoom) => void;
  createRoom: CreateRoom;
  handleCreateRoom: (value: CreateRoom) => void;
}

export const [useSocketContext, SocketProvider] = createCtx<SocketContext>();

type Props = {
  children: React.ReactNode;
};

enum RoomTypes {
  PEERTOPEER = 'PeerToPeer',
  GROUP = 'group',
}

export interface CreateRoom {
  _id: string;
  name: string;
  avatar: string;
  online: boolean;
  roomMessages: any[];
}

const SocketContextProvider = ({ children }: Props) => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [createRoom, setCreateRoom] = useState<CreateRoom>({
    _id: '',
    name: '',
    avatar: '',
    online: false,
    roomMessages: [],
  });
  const [currentRoom, setCurrentRoom] = useState<IRoom>({
    id: '',
    members: [],
    messages: [],
    name: '',
    admin: null,
    avatar: null,
    description: '',
    archived: false,
    type: RoomTypes.PEERTOPEER,
  });

  // Callbacks
  const onRooms = (rooms: IRoom[]) => setRooms(rooms);
  const handleCurrentRoom = (room: IRoom) => setCurrentRoom(room);
  const handleCreateRoom = (value: CreateRoom) => setCreateRoom(value);

  const onConnect = () => setIsConnected(true);
  const onDisconnect = () => setIsConnected(false);
  const onConnected = (userId: string) =>
    setOnlineUsers((prevUsers) => [...prevUsers, userId]);
  const onDisconnected = (userId: string) =>
    setOnlineUsers((prevUsers) => prevUsers.filter((id) => id !== userId));
  const onMessage = (message: IMessage) =>
    setRooms((prevRooms) =>
      prevRooms.map((room) => {
        if (room.id === message.room) {
          if (message.id === '') {
            room.messages.push(message);
          } else {
            const unsentMessageIndex = room.messages.findIndex(
              (currMessage) =>
                currMessage.text === message.text &&
                new Date(currMessage.createdAt) ===
                  new Date(message.createdAt) &&
                !currMessage.sent
            );
            if (unsentMessageIndex !== -1) {
              room.messages[unsentMessageIndex] = message;
            } else {
              room.messages.push(message);
            }
          }
        }
        return room;
      })
    );

  useEffect(() => {
    socket.on('rooms', onRooms);
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('message', onMessage);
    socket.on('connected', onConnected);
    socket.on('disconnected', onDisconnected);

    return () => {
      socket.off('rooms', onRooms);
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('message', onMessage);
      socket.off('connected', onConnected);
      socket.off('disconnected', onDisconnected);
    };
  }, []);

  return (
    <SocketProvider
      value={{
        rooms,
        isConnected,
        onlineUsers,
        updateMessages: onMessage,
        currentRoom,
        handleCurrentRoom,
        createRoom,
        handleCreateRoom,
      }}
    >
      {children}
    </SocketProvider>
  );
};

export default SocketContextProvider;
