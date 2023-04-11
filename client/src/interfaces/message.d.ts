export interface IMessage {
    id: string;
    text: string;
    sender: string;
    room: string;
    sent: boolean;
    createdAt: string;
    updatedAt: string;
}

export type IMessageFilterFields = Pick<IMessage, 'sender' | 'sent'>;

export type CreateMessageParams = Omit<IMessage, 'id'> & {
    _id: string;
};