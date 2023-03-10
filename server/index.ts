import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from 'mongoose';
import app from './app';
import { config, logger } from './config';

let server = createServer(app);

mongoose.set('strictQuery', true);
mongoose.connect(config.mongoose.url).then(() => {
  logger.info('Connected to MongoDB');
  server.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
});

const io = new Server(server, {
  cors: {
    origin: config.clientUrl
  }
});

io.on('connection', (socket) => {
  logger.info(`⚡: ${socket.id} user just connected!`);
  socket.on('disconnect', () => {
    logger.info('🔥: A user disconnected');
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: string) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
