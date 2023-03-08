import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import xss from 'xss-clean';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
import httpStatus from 'http-status';
import userRouter from './routes/user.routes';
import propertyRouter from './routes/property.routes';
import reviewRouter from './routes/review.routes';
import { config, errorHandler as errorLogger, successHandler } from './config';
import { ApiError, errorConverter, errorHandler } from './errors';
import routes from './routes';
import passport from 'passport';
import jwtStrategy from './config/passport';
import { authLimiter } from './utils';

const app = express();

if (config.env !== 'test'){
  app.use(errorLogger);
  app.use(successHandler);
}

// set security HTTP headers
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(ExpressMongoSanitize());

// gzip compression
app.use(compression());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('api/v1/auth', authLimiter);
}

// app.get('/', (req, res) => {
//   res.send('Hola de Kenya!');
// });

// app.use('/api/v1/users', userRouter);
// app.use('/api/v1/agents', userRouter);
// app.use('/api/v1/properties', propertyRouter);
// app.use('/api/v1/reviews', reviewRouter);

app.use('/api/v1', routes);

app.use((_req, _res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
