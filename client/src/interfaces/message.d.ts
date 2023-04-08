export interface IMessage {
    id: string;
    text: string;
    sender: string;
    room: string;
    sent: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type IMessageFilterFields = Pick<IMessage, 'sender' | 'sent'>;

export type CreateMessageParams = Omit<IMessage, 'id'> & {
    recipient: string;
}