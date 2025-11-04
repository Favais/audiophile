import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    orders: defineTable({
        customer: v.object({
            name: v.string(),
            email: v.string(),
            phone: v.string(),
            address: v.string(),
            city: v.string(),
            country: v.string(),
            zip: v.string(),
        }),
        items: v.array(v.object({
            id: v.string(),
            name: v.string(),
            price: v.number(),
            quantity: v.number(),
        })),
        totals: v.object({
            subtotal: v.number(),
            shipping: v.number(),
            grandTotal: v.number(),
        }),
        status: v.string(), // "pending" | "paid" | "shipped"
        createdAt: v.string(),
    }),
});
