"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import axios from "axios";
import type { Order } from "@/types/order";

export function TransactionsTab() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    setLoading(true);
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/payments`);
    setOrders(res.data);
    setLoading(false);
  };

  return (
    <div>
      <Button onClick={fetchTransactions} disabled={loading}>
        {loading ? "Loading..." : "Load Transactions"}
      </Button>
      {orders && (
        <table className="w-full border text-sm mt-4">
          <thead>
            <tr className="bg-muted">
              <th className="p-2 text-left">Payment ID</th>
              <th className="p-2 text-left">User ID</th>
              <th className="p-2 text-left">Course ID</th>
              <th className="p-2 text-left">Amount</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((tx, cnt:number) => (
              <tr key={cnt+1} className="border-t">
                <td className="p-2">{tx.paymentId}</td>
                <td className="p-2">{tx.userId}</td>
                <td className="p-2">{tx.courseId}</td>
                <td className="p-2">₹{tx.amount}</td>
                <td className="p-2">{tx.status}</td>
                <td className="p-2">{new Date(tx.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
