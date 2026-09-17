# P0.2 DONE — henry-intel-operator local commercial walkthrough

**Status:** GREEN  
**Date:** 2026-09-15 (America/New_York)  
**Repo:** https://github.com/joshtitan88-collab/henry-intel-operator  
**Workdir:** `/workspace/henry-intel-operator`  
**Commit verified:** `fdf1c72` (main, up to date with origin)

## Constraints respected

- Local/free only — no new SaaS
- `stripe-catalog.json` Payment Link URLs **not modified** (left live)
- No new Stripe products created
- No outreach
- Brand left as **Henry Intel** (catalog `brand: "Henry Intel"`, legal payee `H & H INVESTIGATION`) — not CAA

## Reproducible walkthrough

```bash
git clone https://github.com/joshtitan88-collab/henry-intel-operator.git
cd henry-intel-operator
npm ci
cp .env.example .env.local   # leave STRIPE_SECRET_KEY empty
npm run build && npm run start
# or: npm run dev
```

1. Open http://localhost:3000/pricing
2. Click **Pay deposit**
3. Browser goes to live Stripe Payment Link:  
   `https://buy.stripe.com/dRm3co5vg8HH4EhfB60Ba09`
4. After Stripe: success → `/success`, cancel → `/cancel`

## Evidence (this run)

| Step | Result |
|------|--------|
| `git clone` into `/workspace/henry-intel-operator` | OK (was non-git copy; replaced with fresh clone) |
| `npm ci` | OK — 50 packages, ~7s |
| `npm run build` | OK — Next.js 15.5.23, compiled, 13 routes |
| Brand in catalog | `Henry Intel` / payee `H & H INVESTIGATION` |
| Deposit Payment Link | `https://buy.stripe.com/dRm3co5vg8HH4EhfB60Ba09` (unchanged) |
| Setup Payment Link | `https://buy.stripe.com/00w6oA7Do3nnb2FcoU0Ba0a` (unchanged) |
| Retainer Payment Link | `https://buy.stripe.com/fZu6oA1f02jj9YB0Gc0Ba0b` (unchanged) |
| Deposit link HTTP | 200 (live) |
| `GET /pricing` | HTTP 200 — renders **Pay deposit**, Setup deposit $2,500, HENRY INTEL |
| `GET /success` | HTTP 200 — **Payment received** |
| `GET /cancel` | HTTP 200 — **Checkout canceled**, link back to `/pricing` |
| `POST /api/checkout` `{"sku":"deposit"}` (no secret) | HTTP 200 `{"url":"https://buy.stripe.com/dRm3co5vg8HH4EhfB60Ba09"}` |

### Build route table (excerpt)

- `/pricing` static  
- `/success` dynamic  
- `/cancel` static  
- `/api/checkout` dynamic  
- `/api/webhooks/stripe` dynamic

### Code path (local, no secret)

1. `components/PayButton.tsx` → `POST /api/checkout`
2. `lib/checkout.ts` → `getStripe()` null → `paymentLinkFor(sku)` from catalog
3. Fallback: client assigns `paymentLink` prop if API fails
4. With secret set: Checkout Session uses `/success?session_id={CHECKOUT_SESSION_ID}` and `/cancel`

## Docs

- `README.md` updated with explicit local commercial walkthrough, Payment-Link vs Checkout Session behavior, success/cancel URLs, and webhook notes (docs only; no Stripe product changes).

## Mini / Shell needs

- None for the local walkthrough. Stripe Dashboard / webhook registration only needed for production Checkout Sessions + `STRIPE_WEBHOOK_SECRET`.
- Optional later: set live `STRIPE_SECRET_KEY` in Vercel env (not required for Payment Link path).

## npm audit note

`npm ci` reported 4 vulnerabilities in the tree; build/runtime of this walkthrough succeeded without `npm audit fix`. Out of scope for P0.2.
