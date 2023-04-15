import { IMessage } from './message';
import { IUser } from './user';

export enum RoomTypes {
  PEERTOPEER = 'PeerToPeer',
  GROUP = 'group',
}

export interface IRoom {
  id: string;
  members: IUser[];
  admin: string | null;
  avatar: string | null;
  description: string | null;
  name: string | null;
  // Todo: Change this back to RoomTypes
  type: any;
  messages: IMessage[];
  archived: boolean;
}
