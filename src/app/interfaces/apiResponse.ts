export interface ApiResponse {
    success: boolean;
    status: number;
    message: string;
    data?: any; 
    token?: string;
    admin_token? : string
    user_token? : string
    coordinator_token? : string;
    tutor_token?:string
}