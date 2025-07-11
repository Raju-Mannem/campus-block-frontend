export interface RazorpayPaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface RazorpayFailedResponse {
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

interface RazorpayOptions {
  key: string;
  amount: number;
  currency?: string;
  name?: string;
  description?: string;
  image?: string;
  order_id: string;
  handler: (response: RazorpayPaymentResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color: string;
  };
  // modal?: {
  //   ondismiss?: () => void;
  //   backdropclose?: boolean;
  // };
  // retry?: {
  //   enabled: boolean;
  // };
}

interface RazorpayInstance {
  open(): void;
  on(
    eventName: "payment.failed",
    callback: (response: RazorpayFailedResponse) => void
  ): void;
  on(
    eventName: "payment.success",
    callback: (response: RazorpayPaymentResponse) => void
  ): void;
}


declare global {
  interface Window {
    Razorpay?: {
      new (options: RazorpayOptions): RazorpayInstance;
    };
  }
}