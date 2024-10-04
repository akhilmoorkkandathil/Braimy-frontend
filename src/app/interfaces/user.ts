

export interface User {
    _id?: string
    username?: string
    position?: number;
    photoUrl?: string
    phone?: string
    email?: string
    isVerified?: boolean
    isBlocked?: boolean
    isDeleted?: boolean
    rechargedHours?:number
    class?:number
    about?:string;
    coordinator:string;
}