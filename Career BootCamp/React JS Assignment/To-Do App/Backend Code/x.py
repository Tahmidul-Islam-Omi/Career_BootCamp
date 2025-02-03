from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, Boolean, DateTime
from sqlalchemy.orm import sessionmaker, declarative_base
from datetime import datetime, timedelta
import jwt
from typing import Optional, List
from fastapi.middleware.cors import CORSMiddleware
import time
app = FastAPI()
# Allow all origins for demonstration purposes
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can specify your allowed origins here
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)


# Database setup
DATABASE_URL = "sqlite:///./todo.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

SECRET_KEY = "mysecretkey"
ALGORITHM = "HS256"

# Models
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    phone = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    profile_picture = Column(String, nullable=True)

class Todo(Base):
    __tablename__ = "todos"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    deadline = Column(DateTime, nullable=True)
    priority = Column(Integer, default=1)
    is_completed = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    user_id = Column(Integer, nullable=False)

Base.metadata.create_all(bind=engine)

# Schemas
class UserCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str]
    username: str
    password: str
    profile_picture: Optional[str]

class UserLogin(BaseModel):
    username: str
    password: str

class UserUpdate(BaseModel):
    name: Optional[str]
    email: Optional[str]
    phone: Optional[str]
    profile_picture: Optional[str]

class TodoCreate(BaseModel):
    title: str
    description: Optional[str]
    deadline: Optional[datetime]
    priority: Optional[int]

class TodoUpdate(BaseModel):
    title: Optional[str]
    description: Optional[str]
    deadline: Optional[datetime]
    priority: Optional[int]
    is_completed: Optional[bool]

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        

# API Endpoints
        
        # Schemas
class TodoResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    deadline: Optional[datetime]
    priority: int
    is_completed: bool
    created_at: datetime
    user_id: int

    class Config:
        orm_mode = True  # To ensure SQLAlchemy models can be serialized to Pydantic models

# API Endpoints
@app.get("/todos", response_model=List[TodoResponse])
def list_todos(db: SessionLocal = Depends(get_db)):
    return db.query(Todo).all()

@app.post("/register")
def register(user: UserCreate, db: SessionLocal = Depends(get_db)):
    db_user = User(
        name=user.name,
        email=user.email,
        phone=user.phone,
        username=user.username,
        password=user.password,
        profile_picture=user.profile_picture,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return {"message": "User registered successfully"}

def create_jwt_token(username: str):
    payload = {"sub": username, "exp": datetime.utcnow() + timedelta(days=1)}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

@app.post("/login")
def login(user: UserLogin, db: SessionLocal = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()
    if not db_user or db_user.password != user.password:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    token = create_jwt_token(db_user.username)
    return {"access_token": token, "token_type": "bearer"}

@app.get("/profile/{username}")
def get_profile(username: str, db: SessionLocal = Depends(get_db)):
    db_user = db.query(User).filter(User.username == username).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return {
        "name": db_user.name,
        "email": db_user.email,
        "phone": db_user.phone,
        "username": db_user.username,
        "profile_picture": db_user.profile_picture,
    }

@app.put("/profile/{username}")
def update_profile(username: str, user_update: UserUpdate, db: SessionLocal = Depends(get_db)):
    db_user = db.query(User).filter(User.username == username).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    for key, value in user_update.dict(exclude_unset=True).items():
        setattr(db_user, key, value)
    db.commit()
    db.refresh(db_user)
    return {"message": "Profile updated successfully"}

@app.post("/todo")
def create_todo(todo: TodoCreate, db: SessionLocal = Depends(get_db)):
    db_todo = Todo(**todo.dict(), user_id=1)  # Placeholder user_id
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo

# @app.get("/todos", response_model=List[TodoCreate])
# def list_todos(db: SessionLocal = Depends(get_db)):
#     return db.query(Todo).all()

@app.put("/todo/{todo_id}")
def update_todo(todo_id: int, todo: TodoUpdate, db: SessionLocal = Depends(get_db)):
    db_todo = db.query(Todo).filter(Todo.id == todo_id).first()
    if not db_todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    for key, value in todo.dict(exclude_unset=True).items():
        setattr(db_todo, key, value)
    db.commit()
    db.refresh(db_todo)
    return db_todo

@app.get("/message")
def message():
    time.sleep(2)
    return {
        "message": "Hello there!"
    }

@app.delete("/todo/{todo_id}")
def delete_todo(todo_id: int, db: SessionLocal = Depends(get_db)):
    db_todo = db.query(Todo).filter(Todo.id == todo_id).first()
    if not db_todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    db.delete(db_todo)
    db.commit()
    return {"message": "Todo deleted successfully"}
