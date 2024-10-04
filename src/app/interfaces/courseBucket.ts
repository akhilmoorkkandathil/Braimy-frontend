import { Course } from "./course";
import { Tutor } from "./tutor";
import { User } from "./user";
export interface courseBucket {
    _id: string; // ObjectId as a string
    index?:Number;
    userId: User; // ObjectId as a string
    courseId: Course; // Reference to the Course interface
    selectedDays: string[]; // Array of selected days
    preferredTime: string; // Preferred time as a string
    classDuration: string; // Class duration as a string
    assignedTutor:Tutor;
    status:string;
}