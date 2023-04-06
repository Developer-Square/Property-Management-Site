import { createServer } from 'http';
import mongoose from 'mongoose';
import { Server } from "socket.io";
import app from './app';
import { config, logger } from './config';
import { CreateMessageParams, IMessage, IMessageDoc } from './mongodb/models/message';
import { TokenTypes } from './mongodb/models/token';
import { IUserDoc } from "./mongodb/models/user";
import { createMessage } from './services/message.service';
import { getAllRooms } from './services/room.service';
import { verifyToken } from './services/token.service';
import { getUserById, updateUserById } from './services/user.service';

interface ServerToClientEvents {
  message: (message: IMessageDoc) => void;
  error: (err: string) => void;
}

interface ClientToServerEvents {
  message: (message: CreateMessageParams, to: string) => Promise<void>;
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
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error("token is required"));
    }
    const tokenDoc = await verifyToken(token, TokenTypes.ACCESS);
    const user = await getUserById(new mongoose.Types.ObjectId(tokenDoc.user));
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
    logger.info(`⚡: ${socket.data.user?.name} user just connected!`);

    // Update user online status
    await updateUserById(socket.data.user?.id, { online: true });

    // join all rooms
    if (socket.data.user) {
      const rooms = await getAllRooms(socket.data.user);
      rooms.forEach((room) => {
        socket.join(room.id);
      });
    }

    // Catch all listener for debugging
    socket.onAny((event, ...args) => {
      console.log(event, args);
    });
  
    // Message action
    socket.on('message', async (message, to) => {
      console.log(message);
      if (socket.data.user){
        const newMessage = await createMessage(message, socket.data.user);
        socket.to(to).emit('message', newMessage);
      } else {
        socket.broadcast.emit("error", 'UNAUTHORIZED: Please login first');
      }
    });
    
    socket.on('disconnect', async () => {
      logger.info('🔥: A user disconnected');

      // change user online status
      await updateUserById(socket.data.user?.id, { online: false });
    });
});
