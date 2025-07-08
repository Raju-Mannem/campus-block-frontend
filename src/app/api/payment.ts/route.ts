import { NextRequest, NextResponse } from "next/server";
import { createRazorpayOrder } from "@/lib/razorpay/createOrder";

export async function POST(req: NextRequest) {
  const { amount, currency, courseId } = await req.json();
  const order = await createRazorpayOrder(amount, currency, courseId);
  return NextResponse.json(order);
}
