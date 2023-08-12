export interface IChatMessage {
    sender: string;
    receiver: string;
    message: string;
    type: ChatMessageType;
}

export enum ChatMessageType {
    JOIN = 'JOIN',
    MESSAGE = 'MESSAGE',
    LEAVE = 'LEAVE',
}
