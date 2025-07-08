export interface Order {
    _id: string;
    userId: string;
    courseId: string;
    amount: number;
    paymentId: string;
    status: 'pending' | 'paid' | 'failed';
    createdAt: Date;
  }