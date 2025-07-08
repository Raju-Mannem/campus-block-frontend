"use client";
import { Button } from "@/components/ui/Button";
import { useEffect } from "react";
import type { RazorpayPaymentResponse, RazorpayFailedResponse } from "@/types/razorpay";

interface RazorpayButtonProps {
  orderId: string;
  amount: number;
  currency?: string;
  onSuccessAction: (response: RazorpayPaymentResponse) => void;
  onFailureAction?: (response: RazorpayFailedResponse) => void;
}

export function RazorpayButton({
  orderId,
  amount,
  currency = "INR",
  onSuccessAction,
  onFailureAction,
}: RazorpayButtonProps) {
  // Ensure Razorpay script is loaded
  useEffect(() => {
    if (typeof window !== "undefined" && !window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handlePay = () => {
    if (typeof window === "undefined" || !window.Razorpay) {
      alert("Payment system not loaded. Please try again in a moment.");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      amount,
      currency,
      order_id: orderId,
      handler: onSuccessAction,
      prefill: {
        email: "user@example.com", // Replace with real user data if available
      },
      theme: { color: "#6366f1" },
    };

    const rzp = new window.Razorpay(options);

    if (onFailureAction) {
      rzp.on("payment.failed", onFailureAction);
    }

    rzp.open();
  };

  return <Button onClick={handlePay}>Pay with Razorpay</Button>;
}
