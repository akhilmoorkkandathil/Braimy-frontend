export interface ChatMessage{
    createdAt?: Date,
    //data?:string,
    userId?: string,
    senderType?: string,
    message: string
}
