"use client"
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function OrderPage() {
    const params = useParams();
    const id = params?.id as string;

    const order = useQuery(api.orders.getOrder, { id });

    if (!order) return <div className="min-h-screen flex items-center justify-center">Loading order...</div>;

    const { customer, items, totals, status, createdAt } = order;

    return (
        <div className="min-h-screen bg-brand-light-gray py-6 px-4 sm:py-8 sm:px-6 lg:py-16 lg:px-8">
            <div className="max-w-[900px] mx-auto">
                <div className="bg-white rounded-lg p-6 sm:p-8 lg:p-12">
                    <h1 className="text-xl sm:text-2xl font-bold mb-3">Order Confirmation</h1>
                    <p className="text-sm text-gray-600 mb-4">Order ID: <span className="font-mono">{id}</span></p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <section>
                            <h2 className="font-bold mb-2">Shipping Details</h2>
                            <p className="text-sm">{customer.name}</p>
                            <p className="text-sm">{customer.address}</p>
                            <p className="text-sm">{customer.city}, {customer.country} {customer.zip}</p>
                            <p className="text-sm">Phone: {customer.phone}</p>
                        </section>

                        <section>
                            <h2 className="font-bold mb-2">Totals</h2>
                            <div className="mt-2 space-y-2 text-sm">
                                <div className="flex justify-between"><span>Subtotal</span><span>${totals.subtotal}</span></div>
                                <div className="flex justify-between"><span>Shipping</span><span>${totals.shipping}</span></div>
                                <div className="flex justify-between"><span className="font-bold">Grand Total</span><span className="font-bold">${totals.grandTotal}</span></div>
                            </div>
                        </section>
                    </div>

                    <section className="mt-6">
                        <h2 className="font-bold mb-3">Items</h2>
                        <div className="space-y-4">
                            {items.map((it: any, idx: number) => (
                                <div key={idx} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                                            {/* image placeholder if available */}
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm">{it.name}</div>
                                            <div className="text-xs text-gray-500">Qty: {it.quantity}</div>
                                        </div>
                                    </div>
                                    <div className="font-bold">${it.price * it.quantity}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <p className="text-sm text-gray-500 mt-6">Status: {status} • Placed on {new Date(createdAt).toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
}
