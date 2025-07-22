from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from database import SessionLocal

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "LinkHub backend is running!"}

@app.get("/ping-db")
def ping_db(db: Session = Depends(get_db)):
    db.execute(text("SELECT 1"))
    return {"message": "Connected to Supabase Postgres!"}

@app.get("/ping")
def ping():
    return {"status": "ok"}

