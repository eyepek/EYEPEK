# Razorpay Dynamic QR setup

## Endpoints
- POST /api/razorpay/create-qr: requires an HS256 Bearer JWT. Reads booking amount from MySQL, checks the booking belongs to the signed-in student and is pending payment, then creates a Razorpay single-use fixed-amount UPI QR.
- POST /api/razorpay/webhook: verifies X-Razorpay-Signature against the exact raw body using HMAC-SHA256, handles qr_code.credited, checks INR amount against booking and payment rows, confirms the booking, and stores event IDs for idempotency.

## Vercel environment variables
DATABASE_URL (TLS-enabled MySQL connection string)
DB_SSL=true (when required by the database provider)
JWT_SECRET (long random HS256 signing secret shared with the future login service)
RAZORPAY_KEY_ID
RAZORPAY_KEY_SECRET (server-only; never use a VITE_ prefix)
RAZORPAY_WEBHOOK_SECRET (must match the secret set in Razorpay Dashboard)

## Database and booking prerequisite
Apply database/razorpay-schema.sql. The authenticated booking API must insert the booking using a server-calculated amount_paise and pending_payment status. The browser must never submit the authoritative price.

## Razorpay Dashboard
1. Account & Settings > Webhooks > Add webhook.
2. URL: https://YOUR-LEARNING-DOMAIN/api/razorpay/webhook
3. Configure a strong secret and set the same value as RAZORPAY_WEBHOOK_SECRET in Vercel.
4. Subscribe to qr_code.credited. Optionally subscribe to qr_code.created and qr_code.closed.
5. Test with Razorpay Test Mode first. Test success, duplicate webhook, bad signature, QR expiry and amount mismatch before Live Mode.

## Not yet complete
Login/JWT issuing, booking creation and checkout UI, payment status page/receipt, production MySQL database, Razorpay account credentials and live webhook registration are not yet connected. Do not accept real payments until these pieces are completed and tested.
