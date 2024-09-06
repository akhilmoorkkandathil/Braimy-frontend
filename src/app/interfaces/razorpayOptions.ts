export interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name?: string;
    description?: string;
    image?: string;
    order_id: string;
    modal?: {
      escape?: boolean;
      ondismiss?: () => void;
    };
    notes?: Record<string, string>;
    theme?: {
      color?: string;
    };
    handler?: (response: RazorpayPaymentSuccessResponse, error: RazorpayPaymentFailedResponse) => void;
    response?: RazorpayPaymentSuccessResponse;
  }

  export interface RazorpayPaymentSuccessResponse {
    razorpay_payment_id:string,
    razorpay_order_id:string,
    razorpay_signature:string
  }


  export interface RazorpayPaymentFailedResponse {
    error: {
      code: string;
      description: string;
      source: string;
      step: string;
      reason: string;
      metadata: {
        order_id: string;
        payment_id: string;
      };
    };
  }
  