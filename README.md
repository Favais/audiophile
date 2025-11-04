# Audiophile — Pixel-Perfect E-commerce (Stage 3)

This repository contains the Audiophile e-commerce project (Next.js + Convex backend + Resend email). The project implements a checkout flow that saves orders to Convex and sends a confirmation email.

## What this README contains
- Quick project overview
- Local setup (dependencies, env vars)
- Running Convex locally and regenerating types
- Running the Next.js app
- Email sending (Resend) notes
- Deployment notes (Vercel)
- Acceptance checklist with status
- Where to find code: key files and how they map to Stage 3 requirements

## Project overview
- Frontend: Next.js (App Router), Tailwind CSS.
- Backend: Convex functions live under `convex/` (mutations + queries).
- Email delivery: Resend via server route at `app/api/send-email/route.ts`.
- Checkout flow: `app/checkout/page.tsx` validates inputs, creates an order via Convex, sends email, and redirects to `app/order/[id]/page.tsx`.

## Required environment variables
Create a `.env.local` in the project root with the following variables (example names):

```
# Convex
CONVEX_DEPLOYMENT=dev:your-deployment-id
NEXT_PUBLIC_CONVEX_URL=https://your-convex-app.convex.cloud

# Resend - transactional email provider
RESEND_API_KEY=your_resend_api_key
```

Notes:
- `NEXT_PUBLIC_CONVEX_URL` is read by the client Convex React client in `app/providers/ConvexClientProvider.tsx`.
- `RESEND_API_KEY` is used server-side in `app/api/send-email/route.ts` only; do not expose it to the client.

## Install & run locally
1. Install dependencies

```bash
npm install
```

2. Start Convex in dev mode (recommended)

```bash
npx convex dev
```

This runs a local Convex dev server and regenerates the `_generated` types. Keep it running while developing so your local Convex functions and generated types are available.

3. Run Next.js dev server

```bash
npm run dev
# or if you prefer pnpm: pnpm dev
```

Open http://localhost:3000 and navigate to the Checkout page.

## Convex notes
- Convex functions are in `convex/`.
- Orders are inserted via the mutation `createOrder` in `convex/orders.ts`.
- A query `getOrder` was added to fetch an order by string id (it matches `d._id.toString()`).
- If you add or change Convex functions, run `npx convex dev` to regenerate `_generated/` and update the local environment.

Developer tip: if you see TypeScript mismatches related to Convex Ids or `_generated` types, run `npx convex dev` and restart the Next dev server.

## Email (Resend)
- The API route responsible for sending confirmation emails: `app/api/send-email/route.ts`.
- It constructs an HTML email template (responsive), then calls Resend with `resend.emails.send(...)`.
- To test email sending locally:
  1. Ensure `RESEND_API_KEY` is set in `.env.local`.
  2. Place a valid email in the Checkout form and complete an order. The server will POST to Resend and log the response.

Caveats:
- The current implementation will attempt to send email as a best-effort after successfully creating the order in Convex. If Resend fails, the order remains stored in Convex; add retry/rollback logic if you need atomic behavior.

Example: the email template used is defined inside `app/api/send-email/route.ts` — you can copy/edit that HTML for any marketing or transactional needs.

## Order Confirmation page
- Created at: `app/order/[id]/page.tsx` (client-side page)
- Behavior: reads `id` from route and queries `api.orders.getOrder` to display order details (shipping, items, totals, status, timestamp).

If you prefer server-side rendering for the confirmation page (for SEO or security), you can move logic into a server component and call the Convex server-side API.

## Accessibility
- `app/components/FormInput.tsx` now includes label `htmlFor` / `id`, `aria-invalid`, and `aria-describedby` along with `aria-live` for inline error announcements.
- Radios and other interactive components should be audited and keyboard focus verified. (Some improvements remain — see the Acceptance Checklist below.)

## Acceptance checklist (Stage 3)
- [x] Use React / Next.js (App router) — implemented
- [x] Checkout form with client validation and accessibility improvements — implemented (basic)
- [x] Save order in Convex (customer, items, totals, status, createdAt) — implemented (`createOrder` mutation)
- [x] Confirmation email sent via Resend — implemented in `app/api/send-email/route.ts` (server export)
- [x] Redirect to Order Confirmation page and display order summary — implemented (`app/order/[id]/page.tsx`)
- [ ] Pixel-perfect Figma matching across breakpoints — manual QA needed
- [ ] Full accessibility audit (keyboard, screen-reader for all controls) — partially done (FormInput updated)
- [ ] Tests (unit/integration) — not implemented yet
- [ ] Deployment (Vercel) — not deployed via this repo; follow steps below

## Deployment (Vercel)
1. Push your repo to GitHub.
2. In Vercel, import the repository and set the following Environment Variables in the Vercel dashboard (Production and Preview as needed):
   - NEXT_PUBLIC_CONVEX_URL
   - CONVEX_DEPLOYMENT (if you rely on it for local npx convex dev, but not required for runtime)
   - RESEND_API_KEY
3. Build & Output settings: default Next.js detection should work.

Notes on Convex in Production:
- For production, you should deploy Convex functions and use an appropriate production Convex URL. See Convex docs for deployment and secrets management.

## Running tests (suggested)
Add a minimal test suite (Jest / Vitest) to cover:
- Form validation functions (happy path + invalid email + invalid e-money fields)
- A mocked integration test for `createOrder` call using a mocked Convex client

I didn't scaffold tests in this change, but I can add Vitest and a couple of simple unit tests if you want.

## Where to look in the codebase
- Checkout form + submission logic: `app/checkout/page.tsx`
- Form input component (accessibility improvements): `app/components/FormInput.tsx`
- Order success modal: `app/components/OrderSuccessModal.tsx`
- Convex functions: `convex/orders.ts` (createOrder, getOrders, getOrder)
- Email sending route: `app/api/send-email/route.ts`
- Convex client provider: `app/providers/ConvexClientProvider.tsx`
- Public images and assets: `public/assets/`.

## Next recommended tasks (I can implement any of these)
- Finish accessibility audit (radio buttons, role attributes, focus order).
- Add server-side input sanitization for the email route and return clearer error responses.
- Add 2–3 automated tests and a GitHub Action to run them.
- Visual polish to match Figma pixel-perfect across breakpoints.
- Deploy to Vercel and confirm emails sent in production.

---

If you want, I can now:
- Add basic tests for the form validation and a `README` section with test commands, or
- Harden `app/api/send-email/route.ts` with stricter validation and clearer responses, or
- Start a visual pass to further match the Figma files you provided.

Tell me which of the next tasks you'd like me to implement and I'll continue.
