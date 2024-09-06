export interface Expense {
    payedTo: string;
    paymentMethod: string;
    amount:String;
    reason: string;
    description?: string;
    date?:string;
  }
  