# from fastapi import FastAPI, Depends
# from sqlalchemy.orm import Session
# from database import SessionLocal

# app = FastAPI()

# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# @app.get("/ping-db")
# def ping_db(db: Session = Depends(get_db)):
#     db.execute("SELECT 1")
#     return {"message": "Database connected!"}
from fastapi import FastAPI
from database import engine  # or SessionLocal, depending on your setup

app = FastAPI()

@app.get("/")
def root():
    return {"message": "FastAPI is running!"}
