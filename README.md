# NestJS practice — Todos, CVs and Auth middleware

Quick start

1. Install deps

```
npm install
```

2. Start the server

```
npm run start
```

3. Seed the DB (standalone script)

```
npm run seed:cvs
```

Testing the middleware

The middleware expects a header `auth-user` with a JWT containing a `userId` claim.

For local tests you can generate a token using node:

```
node -e "console.log(require('jsonwebtoken').sign({ userId: 'user-1' }, 'change-this-secret'))"
```

Then call endpoints under `/api/todo` with header `auth-user: <token>`.

After seeding, users are created with UUID ids. You can query `/api/cv` to see CVs and their user ids, then generate tokens for those ids.

Example usage of protected endpoints
- POST /api/todo
  - Body: { "title": "Buy milk", "description": "2 liters" }
  - Header auth-user: <token with userId>
  - The created Todo will have its userId set to the token's userId.
- PATCH /api/todo/:id and DELETE /api/todo/:id
  - Only the creator (matching userId) can modify or delete. Otherwise a 403 Forbidden is returned.

CV CRUD is available at /api/cv (GET, POST, GET/:id, PATCH/:id, DELETE/:id).# nestJs-practice2
