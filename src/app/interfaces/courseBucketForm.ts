export interface CourseBucketResponse {
    _id: string; // The ID of the bucket entry
    userId: string; // The ID of the user
    courseId: string; // The name of the course
    assignedTutor: string | null; // The username of the assigned tutor or null if not assigned
    selectedDays: string[]; // An array of selected days
    preferredTime: string; // The preferred time for the class
    classDuration: string; // The duration of the class
    createdAt: Date; // The creation date of the bucket entry
}