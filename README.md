# Goumert Crunch

A Next.js retail web app for Goumert Crunch, a cereal retailer in Harare, Zimbabwe.

## Features
- Client login and business login
- Client product browsing and order placement
- Business dashboard for order management, stock levels, analytics, accounting metrics, and downloadable reports
- Backend built with Next.js API routes, SQLite, and Prisma
- Vivid orange, black, and white branding

## Sample accounts
- Client: `client@goumert.co.zw` / `client123`
- Business: `business@goumert.co.zw` / `business123`

## Setup
1. Install dependencies: `npm install`
2. Generate Prisma client: `npm run prisma:generate`
3. Push schema to SQLite: `npm run prisma:push`
4. Seed data: `npm run seed`
5. Run locally: `npm run dev`

Visit `http://localhost:3000` and choose your login portal.
