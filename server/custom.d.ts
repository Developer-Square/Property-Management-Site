import { IUserDoc } from "./mongodb/models/user";

declare global {
  namespace Express {
    interface User extends IUserDoc {}
  }
}

