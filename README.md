# Task Manager – Full Stack Application

## Project Overview
A simple full-stack Task Manager application built as part of the RAAM Group Full-Stack Intern Technical Assignment.  
The app allows users to create, view, update, and delete tasks using a modern full-stack architecture.

---

## Tech Stack
- **Frontend:** Next.js (React, App Router)
- **Backend:** FastAPI (Python)
- **Database:** Supabase (PostgreSQL)
- **API Style:** REST
- **Version Control:** Git & GitHub

---

## Features
- Create a task
- View all tasks
- Edit an existing task
- Delete a task
- Tasks stored securely in Supabase

---

## Project Structure
```
task-manager-fullstack/
├── backend/
├── frontend/
├── screenshots/
├── README.md
└── .gitignore
```
---

## Backend Setup (FastAPI)

### 1 Navigate to backend
```bash
cd backend
```

### 2 Create virtual environment
```bash
python -m venv venv
venv\Scripts\activate   # Windows
```

### 3 Install dependencies
```bash
pip install -r requirements.txt
```

### 4 Create .env file
```bash
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5 Run backend
```bash
uvicorn main:app --reload
```

Backend runs at:
http://127.0.0.1:8000

---

## Frontend Setup (Next.js)

### 1 Navigate to frontend
```bash
cd frontend
```

### 2 Install dependencies
```bash
npm install
```

### 3 Create .env.local
```bash
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

### 4 Run frontend
```bash
npm run dev
```

Frontend runs at:
http://localhost:3000

---

## Supabase Setup
Create tasks table
```bash
create table tasks (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  priority text,
  status text,
  due_date date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

---

## Screenshots
1. List Tasks
<img width="1908" height="968" alt="list-tasks" src="https://github.com/user-attachments/assets/762648e8-0bb6-40ae-bf8d-7817acc87dd1" />

2. Supabase Table
<img width="1907" height="966" alt="supabase" src="https://github.com/user-attachments/assets/05d10a8b-c777-4f34-8f85-b3033492f366" />

3. Create Tasks
<img width="1901" height="479" alt="create-task" src="https://github.com/user-attachments/assets/e52e8873-81eb-4537-9465-459bc0c232bb" />

4. Edit Tasks
<img width="1902" height="968" alt="create-edit-task" src="https://github.com/user-attachments/assets/6496aeac-5526-4a5c-8e13-5b638279f007" />


---

## Assignment Requirements Checklist

- Full CRUD functionality

- Supabase integration

- Clean UI

- README with setup steps

- Screenshots included

---

