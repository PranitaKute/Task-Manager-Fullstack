from fastapi import FastAPI
from fastapi import HTTPException
from supabase import create_client, Client
from dotenv import load_dotenv
from pydantic import BaseModel
from typing import Optional
import os
 

# app = FastAPI()

# @app.get("/")
# def root():
#     return {"message": "Backend is running"}


# config
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)

app = FastAPI()


# task schema
class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    priority: Optional[str] = None
    status: Optional[str] = None
    due_date: Optional[str] = None


# task update
class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[str] = None
    status: Optional[str] = None
    due_date: Optional[str] = None


# routes
@app.get("/")
def root():
    return {"message": "Backend running with Supabase connected"}

@app.get("/test-db")
def test_db():
    response = supabase.table("tasks").select("*").limit(1).execute()
    return {
        "connected": True,
        "data": response.data
    }


# Create POST /tasks endpoint
@app.post("/tasks")
def create_task(task: TaskCreate):
    response = supabase.table("tasks").insert({
        "title": task.title,
        "description": task.description,
        "priority": task.priority,
        "status": task.status,
        "due_date": task.due_date
    }).execute()

    return {
        "message": "Task created successfully",
        "task": response.data
    }

# GET /tasks endpoint
@app.get("/tasks")
def get_tasks():
    response = supabase.table("tasks").select("*").order("created_at", desc=True).execute()
    return {
        "tasks": response.data
    }


@app.get("/tasks/{task_id}")
def get_task(task_id: str):
    try:
        response = supabase.table("tasks").select("*").eq("id", task_id).single().execute()
        return response.data
    except Exception:
        raise HTTPException(status_code=404, detail="Task not found")


# Only fields provided by user are updated
# Existing data is not overwritten with null
@app.put("/tasks/{task_id}")
def update_task(task_id: str, task: TaskUpdate):
    try:
        response = supabase.table("tasks").update(
            {k: v for k, v in task.dict().items() if v is not None}
        ).eq("id", task_id).execute()

        if not response.data:
            raise HTTPException(status_code=404, detail="Task not found")

        return {
            "message": "Task updated successfully",
            "task": response.data
        }
    except Exception:
        raise HTTPException(status_code=404, detail="Task not found")


# delete endpoint
@app.delete("/tasks/{task_id}")
def delete_task(task_id: str):
    try:
        response = supabase.table("tasks").delete().eq("id", task_id).execute()

        if not response.data:
            raise HTTPException(status_code=404, detail="Task not found")

        return {
            "message": "Task deleted successfully"
        }
    except Exception:
        raise HTTPException(status_code=404, detail="Task not found")
