import express, { Router } from 'express';
import authRoute from './auth.routes';
import userRoute from './user.routes';
import reviewRoute from './review.routes';
import propertyRoute from './property.routes';
import messageRoute from './message.routes';
import roomRoute from './room.routes';
import { config } from '../config';

const router = express.Router();

interface IRoute {
  path: string;
  route: Router;
}

const defaultIRoute: IRoute[] = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/agents',
    route: userRoute,
  },
  {
    path: '/reviews',
    route: reviewRoute,
  },
  {
    path: '/properties',
    route: propertyRoute,
  },
  {
    path: '/messages',
    route: messageRoute,
  },
  {
    path: '/rooms',
    route: roomRoute,
  },
];

const devIRoute: IRoute[] = [
  // IRoute available only in development mode
];

defaultIRoute.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devIRoute.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
