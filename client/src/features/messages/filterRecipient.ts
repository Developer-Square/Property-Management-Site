import { IMessage } from "interfaces/message";


const filterRecipient = (arr: IMessage[], name: string) => arr.filter((message) => message.recipient === name);

export default filterRecipient;