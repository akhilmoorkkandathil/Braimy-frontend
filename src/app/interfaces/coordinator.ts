export interface Coordinator {
    _id: string
    username?: string;
    photoUrl?: string
    phone: string
    email: string
    isVerified?: boolean
    isBlocked?: boolean
    isDeleted?: boolean;
    about:string;
}