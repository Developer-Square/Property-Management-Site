export interface IMessage {
    text: string;
    sender: string;
    recipient: string;
    sent: boolean;
    createdAt: Date;
    updatedAt: Date;
    id: string;
}

export type IMessageFilterFields = Pick<IMessage, 'sender' | 'recipient' | 'sent'>;