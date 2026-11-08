# Security Specification - Quiz Palavra da Verdade

## 1. Data Invariants
- Each user profile `/users/{userId}` belongs strictly to the authenticated user matching `request.auth.uid`.
- Users cannot overwrite or modify other users' profiles.
- Score entries in `/scores/{scoreId}` must have `userId == request.auth.uid`.
- Score entries cannot be tampered with after creation (immutable records).
- All string values must be bounded by `.size() <= MAX` to prevent DoS/storage abuse.
- Documents are protected by strict schema validation helpers.

## 2. The Dirty Dozen Payloads
1. **Unauthenticated Profile Creation**: Write to `/users/{userId}` with `request.auth == null` -> DENIED.
2. **Impersonated Profile Write**: User `A` attempts to write to `/users/B` -> DENIED.
3. **Payload Overflow on User Name**: User attempts to save a 5,000-character name string -> DENIED.
4. **Leaderboard Score Spoofing**: User `A` creates a score document where `userId` is set to `user_B` -> DENIED.
5. **Score Modification**: User attempts to update existing score in `/scores/{scoreId}` -> DENIED (immutable score logs).
6. **Negative Score Injection**: User submits negative score or invalid type -> DENIED.
7. **Unrestricted Global Write**: Attempt to write to arbitrary collection `/_admin/creds` -> DENIED by catch-all default deny.
8. **Invalid Document ID Poisoning**: Document ID with invalid special characters or length > 128 -> DENIED.
9. **Role Injection Attack**: User attempts to inject `isAdmin: true` into their user record -> DENIED (no privilege escalation).
10. **Array Explosion Attack**: User attempts to write an array of 1,000 achievement IDs -> DENIED (bounded array size <= 50).
11. **Client Delegation List Exploitation**: Attempt to read user profile of other users without explicit authorization -> Restricted.
12. **Malicious Schema Field Injection**: Submitting unexpected system fields in score document -> DENIED.
