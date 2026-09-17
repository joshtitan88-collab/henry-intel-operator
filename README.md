# Henry Intel

Commercial website for the Local AI Operator. Legal payee: H & H INVESTIGATION.

Contact: joshua@hhinvestigations.com

Brand in `stripe-catalog.json` is **Henry Intel** (not CAA). Do not silently rebrand.

See [DONE.md](DONE.md) for the verified local commercial walkthrough and evidence.

## Local commercial walkthrough (no Stripe secret required)

```bash
git clone https://github.com/joshtitan88-collab/henry-intel-operator.git
cd henry-intel-operator
npm ci
cp .env.example .env.local   # leave STRIPE_SECRET_KEY empty
npm run dev                  # or: npm run build && npm run start
```

Open http://localhost:3000/pricing

1. Click **Pay deposit** on the featured card.
2. The button POSTs `/api/checkout` with `{ "sku": "deposit" }`.
3. With `STRIPE_SECRET_KEY` empty, the API returns the live Payment Link from `stripe-catalog.json` and the browser navigates there (`https://buy.stripe.com/...`).
4. If the API errors, the button falls back to the same catalog Payment Link client-side.
5. After paying on Stripe (or canceling), return pages:
   - Success: http://localhost:3000/success (optional `?session_id=...` when using Checkout Sessions)
   - Cancel: http://localhost:3000/cancel

Public prices (USD, pre-tax): deposit $2,500 one-time, setup $5,000 one-time, retainer $997/month. Hardware is purchased by the client from Apple. Henry Intel does not sell or finance hardware through Stripe.

Do **not** create new Stripe products or change live Payment Link URLs in `stripe-catalog.json` for this local path.

## Environment

All variables are listed in `.env.example`. Never commit real keys. Price IDs and Payment Links are in `stripe-catalog.json`.

When `STRIPE_SECRET_KEY` is empty, `POST /api/checkout` returns the live Payment Link for that SKU. When the secret is set, it creates a Stripe Checkout Session instead (no `payment_method_types`, no `automatic_tax`). `integration_identifier` is `hi_operator_` plus eight random letters. Session URLs use:

- `success_url`: `{NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`
- `cancel_url`: `{NEXT_PUBLIC_SITE_URL}/cancel`

## Webhooks

`POST /api/webhooks/stripe` handles `checkout.session.completed`, `invoice.paid`, and `customer.subscription.updated`. Requires both `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET`. Local Payment-Link-only mode does not need webhooks for the click-to-pay path.

Register the webhook on the production domain after deploy. Set `NEXT_PUBLIC_SITE_URL` to the production origin.

## Billing portal

`POST /api/portal` with an email, when the secret key is set.

## Deploy

Deploy on Vercel as a Next.js app. Set `NEXT_PUBLIC_SITE_URL` to the production origin. Register the webhook on the production domain.

No analytics trackers, no third-party pixels, no Google Fonts CDN.
