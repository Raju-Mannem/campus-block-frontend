export async function createRazorpayOrder(amount: number, currency: string, courseId: string) {
    const res = await fetch("/api/payment", {
      method: "POST",
      body: JSON.stringify({ amount, currency, courseId }),
      headers: { "Content-Type": "application/json" },
    });
    return await res.json();
  }
  