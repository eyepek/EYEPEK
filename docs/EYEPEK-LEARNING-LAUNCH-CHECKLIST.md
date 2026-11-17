# EYEPEK Learning — Pre-launch checklist

## Before production deployment
1. Confirm the latest batch branch has been reviewed and merged to `main`.
2. In Enzonic SQL Editor, run the required migrations in order:
   - `database/extended-registration-migration.sql`
   - `database/tutor-allocation-migration.sql`
   - Any earlier platform/enterprise migrations not yet applied to this database.
3. Verify the database connection with the health endpoint.
4. Verify Student, Tutor and Admin login separately:
   - Student: registered email + password.
   - Institution: registered email + password.
   - Tutor: `EYtutor###` ID + password.
   - Admin: private Admin login using email + password.
5. Verify a new Tutor receives a unique `EYtutor###` code and appears as Pending.
6. Verify only Admin can approve a Tutor and only approved active Tutors can be allocated.
7. Verify Admin can allocate and end a Student–Tutor assignment; Student sees assigned Tutor; Tutor sees assigned Student.
8. Verify Students can search Tutor profiles but cannot assign/book Tutors themselves.
9. Verify session and paid-assignment access is denied until the payment gateway confirms payment.
10. Verify Admin rates and Tutor earnings ledger; verify a Tutor cannot approve or mark their own earnings paid.
11. Test all role permissions and inspect server logs for SQL/API errors.
12. Check Vercel deployment quota before the single production deployment.

## Payment launch gate
Razorpay has intentionally been deferred. Do not accept live payments or unlock paid services until Razorpay keys are configured securely in Vercel, webhook signature verification is implemented, and successful/failed/pending payment flows are tested. Until then, publish only free registration and non-paid discovery/profile features; clearly label paid sessions and assignments as unavailable.

## Deployment safety
The current working branch is `eyepek-learning-batch`. Do not deploy this branch directly to production before review and database migrations. A successful GitHub save is not proof of a successful build or production deployment.
