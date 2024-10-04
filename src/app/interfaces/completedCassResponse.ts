import { Course } from "./course";
import { User } from "./user";

export interface CompletedClass {
    _id: string; // Completed class ID
    studentId: User; // Student details
    tutorId: string; // Tutor ID
    courseId: Course; // Course details
    duration: string; // Duration of the class
    date: Date; // Date of completion
    status: string; // Status of the completion (e.g., 'pending', 'approved')
    index?: number;
}