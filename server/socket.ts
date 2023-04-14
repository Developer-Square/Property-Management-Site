import { createServer } from 'http';
import mongoose from 'mongoose';
import { Server } from "socket.io";
import app from './app';
import { config, logger } from './config';
import { CreateMessageParams, IMessageDoc } from './mongodb/models/message';
import { IRoomPopulated } from './mongodb/models/room';
import { IUserDoc } from "./mongodb/models/user";
import { createMessage } from './services/message.service';
import { queryRooms } from './services/room.service';
import { getUserById, updateUserById } from './services/user.service';

interface ServerToClientEvents {
  message: (message: IMessageDoc) => void;
  error: (err: string) => void;
  rooms: (rooms: IRoomPopulated[]) => void;
  connected: (userId: string) => void;
  disconnected: (userId: string) => void;
}

interface ClientToServerEvents {
  message: (message: CreateMessageParams) => Promise<void>;
}

interface InterServerEvents {}

interface SocketData {
  user?:   IUserDoc;
}

export const server = createServer(app);

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
    cors: {
        origin: config.clientUrl
    }
});

io.use(async (socket, next) => {
  const userId = socket.handshake.auth.userId;
  if (!userId) {
    return next(new Error("userId is required"));
  }
  const user = await getUserById(new mongoose.Types.ObjectId(userId));
  if (!user) {
    return next(new Error("User not found"));
  }
  socket.data.user = user;
  next();
});

export const socketErrorHandler = (handler: Function) => {
  const handleError = (err: any) => {
    logger.error(err);
  };

  return (...args: any) => {
    try {
      const ret = handler.apply(this, args);
      if (ret && typeof ret.catch === "function") {
        // async handler
        ret.catch(handleError);
      }
    } catch (e) {
      // sync handler
      handleError(e);
    }
  };
};

io.on('connection', async (socket) => {
    logger.info(`⚡: ${socket.data.user?.name} just connected!`);

    socket.broadcast.emit('connected', socket.data.user?.id);

    // Update user online status
    await updateUserById(socket.data.user?.id, { online: true }, socket.data.user);

    // get chatrooms with messages
    if (socket.data.user) {
      const roomsWithMessages = await queryRooms(socket.data.user);
      socket.emit('rooms', roomsWithMessages);
    }

    // Catch all listener for debugging
    socket.onAny((event, ...args) => {
      console.log(event, args);
    });
  
    // Message action
    socket.on('message', async (message) => {
      console.log(message);
      if (socket.data.user){
        const newMessage = await createMessage(message, socket.data.user);
        socket.to(newMessage.room.toHexString()).emit('message', newMessage);
      } else {
        socket.emit("error", 'UNAUTHORIZED: Please login first');
      }
    });
    
    socket.on('disconnect', async () => {
      logger.info('🔥: A user disconnected');

      // announce user is disconnected
      socket.broadcast.emit('disconnected', socket.data.user?.id);

      // change user online status
      await updateUserById(socket.data.user?.id, { online: false }, socket.data.user);
    });
});
