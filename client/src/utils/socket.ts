import { CreateMessageParams, IMessage } from 'interfaces/message';
import { IRoom } from 'interfaces/room';
import { io, Socket } from 'socket.io-client';

import { serverUrl } from '../constants';

export interface ServerToClientEvents {
  message: (message: IMessage) => void;
  error: (err: string) => void;
  rooms: (rooms: IRoom[]) => void;
  connected: (userId: string) => void;
  disconnected: (userId: string) => void;
}

export interface ClientToServerEvents {
  message: (message: CreateMessageParams) => Promise<void>;
}

const loggedInUser = JSON.parse(localStorage.getItem('user') as string) || {};

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  serverUrl,
  { auth: { userId: loggedInUser._id } }
);

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;
