from fastapi import FastAPI
from supabase import create_client, Client
import os

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "LinkHub backend is running!"}

@app.get("/ping")
def ping():
    return {"status": "ok"}

@app.get("/ping-db")
def ping_db():
    # Attempt to fetch something from a known table, or just check API
    response = supabase.table("users").select("*").limit(1).execute()
    if response.data:
        return {"message": "Connected to Supabase!"}
    return {"message": "Connected, but no data found."}
