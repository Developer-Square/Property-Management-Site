export interface IUser {
    _id: string;
    name: string;
    email: string;
    avatar: string;
    password?: string;
    role: string;
    email_verified: boolean;
    properties?: string;
    phoneNumber?: string;
    gender?: string;
    country?: string;
    allProperties: string[];
    createdAt: Date;
    updatedAt: Date;
    online: boolean;
}
