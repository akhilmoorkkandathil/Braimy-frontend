export interface ChatMessage{
    userId?: string;
    senderType?: string;
    message: string;
    createdAt?:Date;
    tutorId?:string;
}
