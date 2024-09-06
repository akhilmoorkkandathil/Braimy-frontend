export interface Coordinator {
    _id: string
    name?: string;
    profileImage?: string
    phone: string
    email: string
    isVerified?: boolean
    isBlocked?: boolean
    isDeleted?: boolean
}