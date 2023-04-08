import { IMessage } from "./message";
import { IUser } from "./user";

export enum RoomTypes {
    PEERTOPEER = 'PeerToPeer',
    GROUP = 'group',
}

export interface IRoom {
    id: string;
    members: string[];
    admin?: string | null;
    avatar?: string | null;
    description?: string | null;
    name?: string | null;
    type?: RoomTypes;
    messages?: string[];
    archived?: boolean;
}

export type IRoomPopulated = IRoom & {
    members: IUser[];
    messages: IMessage[];
}