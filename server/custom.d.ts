import { IUserDoc } from "./mongodb/models/user";

// declare module 'express-serve-static-core' {
//   export interface Request {
//     user: IUserDoc;
//   }
// }

// This can also work
// declare global {
//   namespace Express {
//     export interface Request {
//       user?: User extends IUserDoc {}
//     }
//   }
// }

declare global {
  namespace Express {
    interface User extends IUserDoc {}
  }
}

// declare namespace Express {
//   export interface User extends IUserDoc {}
// }
