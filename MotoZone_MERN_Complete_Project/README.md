# MotoZone MERN Starter

## Install prerequisites
Install Node.js LTS and MongoDB Community Server, or create a MongoDB Atlas database.

## Backend
1. Open a terminal in `backend`.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and edit the settings.
4. Run `npm run dev`.

## Frontend
Open a second terminal in `frontend`.
1. Run `npm install`.
2. Run `npm run dev`.
3. Open the Vite URL, normally http://localhost:5173.

## Admin account for learning
Set `ADMIN_EMAIL` in `backend/.env` to your email BEFORE registering that email. The starter gives that email the admin role. This is only a development shortcut; do not use it in a public production system.

Register, log in, add bikes from Admin, and try a test-ride booking. Passwords are hashed with bcrypt. Never share your `.env` file or JWT secret.
