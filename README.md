# Clinic Patient Records Dashboard

A web dashboard for managing clinic patient records, with full **CRUD** (Create, Read, Update, Delete), live summary cards, search, and status filtering.

**Stack:** Node.js, Express.js, TiDB Cloud (MySQL compatible, `mysql2`), HTML, CSS, JavaScript, deployed on Vercel

## Features
- Add, view, edit, and delete patient records
- Dashboard summary: total patients, active, follow-up, seen today
- Search by name, diagnosis, or phone number
- Filter by status (Active, Follow-up, Discharged)
- All fields are required; phone numbers must be exactly 11 digits (checked in the form and on the server)
- Responsive layout with a green color theme

## Project structure
```
clinic-patient-records-dashboard/
├── database/
│   ├── schema.sql          # Table definition (optional, table auto-creates)
│   └── seed.sql            # Sample patients
├── api/
│   └── index.js            # Vercel serverless entry
├── public/                 # Frontend
│   ├── index.html
│   ├── style.css
│   └── app.js
├── scripts/
│   └── seed.js             # npm run seed
├── src/
│   ├── config/db.js        # MySQL connection and auto setup
│   ├── middleware/
│   │   └── validatePatient.js
│   ├── routes/
│   │   ├── patients.js     # CRUD endpoints
│   │   └── stats.js        # Dashboard summary
│   ├── app.js              # Express app
│   └── server.js           # Entry point
├── vercel.json             # Vercel routing
├── .env.example
├── package.json
└── README.md
```

## Getting started

### Prerequisites
- Node.js 18 or newer
- A TiDB Cloud cluster (or a local MySQL server)

### Installation
```bash
npm install
cp .env.example .env      # Windows: copy .env.example .env
```
Open `.env` and fill in your TiDB Cloud connection details (host, port, user, password, database).
For a local MySQL instead, use `DB_PORT=3306` and `DB_SSL=false`.

### Run
```bash
npm start
```
Open http://localhost:3000. The `patients` table is created automatically on first run.

### Optional: load sample data
```bash
npm run seed
```

## Deploy to Vercel (with TiDB Cloud)
1. Create a TiDB Cloud cluster and copy the host, port (4000), user, and password from **Connect**.
2. Push this project to GitHub.
3. In Vercel, import the repo (framework preset: **Other**).
4. Add these environment variables, then deploy:

| Name | Value |
|------|-------|
| `DB_HOST` | your TiDB host |
| `DB_PORT` | `4000` |
| `DB_USER` | your TiDB user |
| `DB_PASSWORD` | your TiDB password |
| `DB_NAME` | `test` (or your database name) |

5. Visit `/api/health` to confirm the server is running.

## API reference
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/patients?search=&status=` | List patients |
| POST | `/api/patients` | Create a patient |
| PUT | `/api/patients/:id` | Update a patient |
| DELETE | `/api/patients/:id` | Delete a patient |
| GET | `/api/stats` | Dashboard summary |
| GET | `/api/health` | Health check |

### Example request body
```json
{
  "full_name": "Maria Santos",
  "age": 34,
  "gender": "Female",
  "phone": "09175550101",
  "address": "Jaro, Iloilo City",
  "diagnosis": "Hypertension",
  "status": "Follow-up",
  "visit_date": "2026-11-06"
}
```

## Database schema
Table `patients`: `id`, `full_name`, `age`, `gender`, `phone`, `address`, `diagnosis`, `status`, `visit_date`, `created_at`.

## License
MIT
