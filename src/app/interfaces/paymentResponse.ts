export interface Payment {
    _id?: string; // Optional: MongoDB ObjectId
    studentId: string; // Reference to the Student ObjectId
    planSelected?: string; // Optional: Selected plan
    amountPaid: number; // Amount paid
    isDeleted?: boolean; // Optional: Deletion status
    date: string; // Date as a string (consider changing to Date type if needed)
    status: 'completed' | 'cancelled'; // Status of the payment
    timeRecharged?: number; // Optional: Time recharged
    index?:string
}