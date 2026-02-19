# Review&RATE

A platform to find companies, read reviews, and leave one yourself. Built as a full-stack project using React + Node/Express + MongoDB.

There's a role system — regular users can browse and review, admins can add companies. Auth is JWT-based.

---

## Screenshots

![alt text](<registraon default role user-1.png>)

![alt text](<secure RBAC registration-1.png>)

![alt text](<secure login-1.png>)

![alt text](<LogIn required for Review-1.png>)

![alt text](Review-1.png)
![alt text](<user can see Reviews-1.png>)

![alt text](<User can't add company-1.png>)

![alt text](<only admin can add company-1.png>)



## What's inside

```
Graffers ID task/
├── backEnd/
│   ├── controllers/
│   │   ├── auth.controller.js      # register + login
│   │   ├── company.controller.js   # add/list/get companies
│   │   └── review.controller.js    # add review, fetch reviews, like
│   ├── middleware/
│   │   └── auth.js                 # JWT verify + admin check
│   ├── models/
│   │   ├── User.js
│   │   ├── Company.js
│   │   └── Review.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── company.routes.js
│   │   └── review.routes.js
│   ├── .env
│   ├── app.js
│   └── server.js
│
└── frontEnd/src/
    ├── components/
    │   ├── Navbar.jsx
    │   ├── CompanyCard.jsx
    │   ├── ReviewCard.jsx
    │   └── ReviewForm.jsx
    ├── context/
    │   └── AuthContext.js
    ├── pages/
    │   ├── Home.jsx
    │   ├── CompanyDetail.jsx
    │   ├── AddCompany.jsx
    │   ├── Login.jsx
    │   └── Register.jsx
    └── App.js
```

---

## Getting it running

You'll need Node.js and MongoDB running locally (or a Mongo Atlas URI).

**Backend:**

```bash
cd backEnd
npm install
```

Create a `.env` file (or edit the existing one):

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/reviewrate
JWT_SECRET=some_long_random_string_here
ADMIN_SECRET=graffers@admin2024
```

Then:

```bash
npm run dev     # uses nodemon
# or
npm start
```

**Frontend:**

```bash
cd frontEnd
npm install
npm start
```

That's it. The React app proxies all `/api` calls to `localhost:5000`, so both servers just need to be running at the same time.

---

## Roles

There are two roles: `user` and `admin`.

Everyone registers as a regular user by default. If you want admin access, there's a hidden field on the register page — click "Register as admin?" and enter the secret key from your `.env` (`ADMIN_SECRET`). If the key is right, you get admin. If it's wrong or blank, you just get a regular user account.

Only admins can add companies. Regular users can browse, read, and write reviews.

The backend enforces this — it's not just a frontend check.

---

## API

### Auth

```
POST /api/auth/register
POST /api/auth/login
```

Register body:
```json
{
  "fullName": "Jane Doe",
  "email": "jane@example.com",
  "password": "mypassword",
  "adminSecret": ""   // optional, leave blank for regular user
}
```

Both endpoints return a token + user object. Rate limited to 10 requests per IP per 15 minutes to slow down brute force.

---

### Companies

```
GET  /api/companies          # public
GET  /api/companies/:id      # public
POST /api/companies          # admin only
```

The list endpoint supports filtering:

```
?city=Indore
?q=tech             # searches by name
?sort=rating        # or "name"
?page=1&limit=10
```

---

### Reviews

```
GET  /api/reviews/company/:companyId    # public
POST /api/reviews/company/:companyId    # logged in users
POST /api/reviews/:id/like             # logged in users
```

When a review is added, the company's `avgRating` and `reviewCount` are recalculated automatically.

---

## Auth headers

Protected routes need:
```
Authorization: Bearer <token>
```

The frontend stores the token in localStorage and sets it as a default header on every axios call.

---

## Passwords & security

- Passwords are hashed with bcrypt (12 salt rounds)
- JWTs expire in 7 days
- Rate limiting on auth routes
- The admin secret never leaves the server — it's compared server-side only

---

## Env variables

| Variable | What it does |
|----------|-------------|
| `PORT` | Which port Express runs on (default 5000) |
| `MONGO_URI` | Your MongoDB connection string |
| `JWT_SECRET` | Secret used to sign tokens — make it long |
| `ADMIN_SECRET` | The key users enter to register as admin |

---

Built for the Graffers ID task.
