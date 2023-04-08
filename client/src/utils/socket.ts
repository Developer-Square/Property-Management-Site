import { CreateMessageParams, IMessage } from "interfaces/message";
import { IRoomPopulated } from "interfaces/room";
import { io, Socket } from "socket.io-client";

import { serverUrl } from '../constants';

interface ConnectionStatus {
    status: boolean;
    id: string;
}

interface ServerToClientEvents {
    message: (message: IMessage) => void;
    error: (err: string) => void;
    rooms: (rooms: IRoomPopulated[]) => void;
    connected: (connection: ConnectionStatus) => void;
}
  
interface ClientToServerEvents {
    message: (message: CreateMessageParams, to: string) => Promise<void>;
}

const loggedInUser = JSON.parse(localStorage.getItem('user') as string);

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(serverUrl, { auth: { userId: loggedInUser._id } });

socket.onAny((event, ...args) => {
    console.log(event, args);
});

export default socket;