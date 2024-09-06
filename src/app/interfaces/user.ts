import { Course } from "./course";
import { Tutor } from "./tutor";

export interface User {
    userId?: string
    username?: string
    position?: number;
    photoUrl?: string
    phone?: string
    email?: string
    isVerified?: boolean
    isBlocked?: boolean
    isDeleted?: boolean
    dayList?:string[]
    preferredTime?:string
    course?: Course;
    tutor?: Tutor;
    classDuration?:String
    lastMessage?:string
}