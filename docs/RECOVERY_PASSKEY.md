# Recovery Passkey

The recovery passkey lets a user reset a forgotten password without email delivery.

## How it works

1. During registration, users create a recovery passkey. Existing users can set or replace one on their profile page.
2. The passkey is hashed with bcrypt before it is stored and is never returned in API responses.
3. At `/recovery`, the user enters their email and recovery passkey.
4. A valid match returns a recovery-only JWT that expires after 15 minutes.
5. The recovery token authorizes one password reset request.

## API endpoints

| Method | Endpoint | Authentication | Purpose |
| --- | --- | --- | --- |
| `PUT` | `/api/auth/recovery-passkey` | Bearer token | Set or replace the signed-in user's passkey. |
| `POST` | `/api/auth/recover/verify` | None | Verify an email and recovery passkey; returns a 15-minute recovery token. |
| `PUT` | `/api/auth/recover/reset` | Recovery token in request body | Reset password with a valid recovery token. |

## Security notes

- Use a passkey that differs from the account password.
- In a production deployment, add rate limiting to the verification endpoint and use HTTPS.
- The recovery token is held only in React component state; it is not saved to local storage.
