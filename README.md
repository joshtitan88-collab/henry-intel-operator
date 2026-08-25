# Henry Intel

Commercial website. Legal payee: H & H INVESTIGATION.

Contact: joshua@hhinvestigations.com

## Run

Install Node dependencies, copy .env.example to .env.local, start the Next.js dev server, open http://localhost:3000.



## Environment

All variables are listed in .env.example. Never commit real keys. Price IDs and Payment Links are in stripe-catalog.json.



When STRIPE_SECRET_KEY is empty, POST /api/checkout returns the live Payment Link for that SKU. When the secret is set, it creates a Stripe Checkout Session instead (no payment_method_types, no automatic_tax). integration_identifier is hi_operator_ plus eight random letters.



Webhooks: POST /api/webhooks/stripe handles checkout.session.completed, invoice.paid, and customer.subscription.updated.



Billing portal: POST /api/portal with an email, when the secret key is set.



Deploy on Vercel as a Next.js app. Set NEXT_PUBLIC_SITE_URL to the production origin. Register the webhook on the production domain.



Public prices (USD, pre-tax): deposit 2500 one-time, setup 5000 one-time, retainer 997 per month. Hardware is purchased by the client from Apple. Henry Intel does not sell or finance hardware through Stripe.



No analytics trackers, no third-party pixels, no Google Fonts CDN.
