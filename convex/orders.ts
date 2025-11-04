// convex/orders.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Save a new order
export const createOrder = mutation({
    args: {
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
    },
    handler: async (ctx, args) => {
        const orderId = await ctx.db.insert("orders", {
            ...args,
            status: "pending",
            createdAt: new Date().toISOString(),
        });
        return orderId;
    },
});

// Fetch all orders (for debugging)
export const getOrders = query({
    handler: async (ctx) => {
        return await ctx.db.query("orders").collect();
    },
});

// Fetch a single order by id
export const getOrder = query({
    // Accept a string representation of the document id and locate the order
    args: { id: v.string() },
    handler: async (ctx, args) => {
        const docs = await ctx.db.query("orders").collect();
        // Documents include an _id field; compare stringified ids
        return docs.find((d: any) => d._id && d._id.toString() === args.id) || null;
    },
});
