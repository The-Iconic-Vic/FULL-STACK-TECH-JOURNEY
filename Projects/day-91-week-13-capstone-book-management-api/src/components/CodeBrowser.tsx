import { useState } from 'react';
import { FileCode, Copy, Check, Terminal, Play, Download } from 'lucide-react';

interface CodeFile {
  name: string;
  language: string;
  description: string;
  content: string;
}

const FILES: CodeFile[] = [
  {
    name: 'main.py',
    language: 'python',
    description: 'FastAPI main entry point. Sets up CORS, initializes SQLite tables, and includes the routes.',
    content: `from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import models
from database import engine
from routes import router

# Create the database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Book Management API",
    description="A complete FastAPI REST API for managing books with an SQLite database.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(router)

@app.get("/")
def read_root():
    return {
        "message": "Welcome to the Book Management API",
        "docs_url": "/docs",
        "status": "online"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)`
  },
  {
    name: 'models.py',
    language: 'python',
    description: 'SQLAlchemy database models mapping Python classes to SQLite tables.',
    content: `from sqlalchemy import Column, Integer, String, Boolean
from database import Base

class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    author = Column(String, index=True, nullable=False)
    isbn = Column(String, unique=True, index=True, nullable=False)
    published_year = Column(Integer, nullable=False)
    available = Column(Boolean, default=True)`
  },
  {
    name: 'schemas.py',
    language: 'python',
    description: 'Pydantic models for request validation and response serialization (using Pydantic v2 specs).',
    content: `from pydantic import BaseModel, Field
from typing import Optional

class BookBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255, description="The title of the book")
    author: str = Field(..., min_length=1, max_length=255, description="The author of the book")
    isbn: str = Field(..., min_length=10, max_length=13, description="The International Standard Book Number (ISBN)")
    published_year: int = Field(..., gt=0, le=2026, description="The year the book was published")
    available: Optional[bool] = Field(True, description="Whether the book is available for borrowing")

class BookCreate(BookBase):
    pass

class BookUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    author: Optional[str] = Field(None, min_length=1, max_length=255)
    isbn: Optional[str] = Field(None, min_length=10, max_length=13)
    published_year: Optional[int] = Field(None, gt=0, le=2026)
    available: Optional[bool] = None

class Book(BookBase):
    id: int

    class Config:
        from_attributes = True`
  },
  {
    name: 'database.py',
    language: 'python',
    description: 'Establishes SQLite connection, engine configurations, local sessions, and the database dependency injector.',
    content: `from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "sqlite:///./books.db"

# connect_args={"check_same_thread": False} is required only for SQLite
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency to get db session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()`
  },
  {
    name: 'crud.py',
    language: 'python',
    description: 'Reusable database operation routines: Create, Read, Update, and Delete operations using SQLAlchemy.',
    content: `from sqlalchemy.orm import Session
import models
import schemas

def get_book(db: Session, book_id: int):
    return db.query(models.Book).filter(models.Book.id == book_id).first()

def get_book_by_isbn(db: Session, isbn: str):
    return db.query(models.Book).filter(models.Book.isbn == isbn).first()

def get_books(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Book).offset(skip).limit(limit).all()

def search_books(db: Session, q: str):
    query = db.query(models.Book)
    
    # Try searching by year if query string is an integer
    year_val = None
    try:
        year_val = int(q)
    except ValueError:
        pass

    if year_val is not None:
        return query.filter(
            (models.Book.title.contains(q)) | 
            (models.Book.author.contains(q)) | 
            (models.Book.published_year == year_val)
        ).all()
    
    return query.filter(
        (models.Book.title.contains(q)) | 
        (models.Book.author.contains(q))
    ).all()

def create_book(db: Session, book: schemas.BookCreate):
    db_book = models.Book(
        title=book.title,
        author=book.author,
        isbn=book.isbn,
        published_year=book.published_year,
        available=book.available
    )
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book

def update_book(db: Session, book_id: int, book_update: schemas.BookUpdate):
    db_book = get_book(db, book_id)
    if not db_book:
        return None
    
    update_data = book_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_book, key, value)
        
    db.commit()
    db.refresh(db_book)
    return db_book

def delete_book(db: Session, book_id: int):
    db_book = get_book(db, book_id)
    if not db_book:
        return False
    db.delete(db_book)
    db.commit()
    return True`
  },
  {
    name: 'routes.py',
    language: 'python',
    description: 'FastAPI route routers linking schemas to CRUD controllers. Includes query validation and HTTP status routing.',
    content: `from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import List
import crud
import schemas
from database import get_db

router = APIRouter(prefix="/books", tags=["books"])

@router.post("/", response_model=schemas.Book, status_code=status.HTTP_201_CREATED)
def create_book(book: schemas.BookCreate, db: Session = Depends(get_db)):
    db_book = crud.get_book_by_isbn(db, isbn=book.isbn)
    if db_book:
        raise HTTPException(
            status_code=400, 
            detail=f"Book with ISBN '{book.isbn}' already exists."
        )
    return crud.create_book(db=db, book=book)

@router.get("/", response_model=List[schemas.Book])
def read_books(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_books(db, skip=skip, limit=limit)

@router.get("/search/", response_model=List[schemas.Book])
def search_books(q: str = Query(..., min_length=1, description="Search query for title, author, or year"), db: Session = Depends(get_db)):
    return crud.search_books(db, q=q)

@router.get("/{id}", response_model=schemas.Book)
def read_book(id: int, db: Session = Depends(get_db)):
    db_book = crud.get_book(db, book_id=id)
    if db_book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return db_book

@router.put("/{id}", response_model=schemas.Book)
def update_book(id: int, book: schemas.BookUpdate, db: Session = Depends(get_db)):
    db_book = crud.get_book(db, id)
    if not db_book:
        raise HTTPException(status_code=404, detail="Book not found")
    
    # Check ISBN uniqueness if it is changing
    if book.isbn and book.isbn != db_book.isbn:
        isbn_book = crud.get_book_by_isbn(db, isbn=book.isbn)
        if isbn_book:
            raise HTTPException(
                status_code=400,
                detail=f"Book with ISBN '{book.isbn}' already exists."
            )
            
    updated = crud.update_book(db=db, book_id=id, book_update=book)
    return updated

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_book(id: int, db: Session = Depends(get_db)):
    success = crud.delete_book(db=db, book_id=id)
    if not success:
        raise HTTPException(status_code=404, detail="Book not found")
    return None`
  },
  {
    name: 'requirements.txt',
    language: 'text',
    description: 'Python packages required to install and run the FastAPI system locally.',
    content: `fastapi>=0.110.0
uvicorn>=0.28.0
sqlalchemy>=2.0.28
pydantic>=2.6.4`
  }
];

export default function CodeBrowser() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeFile = FILES[selectedIdx];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lineCount = activeFile.content.split('\n').length;

  return (
    <div id="code-browser-root" className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* File List */}
      <div id="file-selector-sidebar" className="lg:col-span-1 bg-app-card border border-app-border rounded-xl p-4 flex flex-col gap-4">
        <div className="flex items-center gap-2 px-1">
          <FileCode className="h-5 w-5 text-[#059669]" />
          <span className="font-serif font-medium text-app-bright">Files (book_api/)</span>
        </div>
        <div className="flex flex-col gap-1.5 flex-1">
          {FILES.map((file, idx) => (
            <button
              key={file.name}
              id={`file-btn-${file.name.replace('.', '-')}`}
              onClick={() => setSelectedIdx(idx)}
              className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-lg text-sm font-mono transition-all cursor-pointer ${
                selectedIdx === idx
                  ? 'bg-[#059669]/10 text-[#059669] border border-[#059669]/30'
                  : 'text-app-muted hover:bg-app-subtle/50 border border-transparent'
              }`}
            >
              <span>{file.name}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-app-bg text-app-dim font-sans uppercase">
                {file.name.split('.')[1]}
              </span>
            </button>
          ))}
        </div>

        {/* Local Run Guide */}
        <div className="p-3 bg-app-bg/60 border border-app-border rounded-lg">
          <h4 className="text-xs font-semibold text-[#059669] flex items-center gap-1.5 mb-2 font-mono">
            <Terminal className="h-3 w-3" /> LOCAL RUN GUIDE
          </h4>
          <p className="text-[11px] text-app-dim leading-relaxed mb-2">
            Run this API on your machine with:
          </p>
          <div className="bg-app-bg p-2 rounded text-[10px] font-mono text-[#059669] border border-app-border overflow-x-auto select-all">
            pip install -r requirements.txt<br />
            uvicorn main:app --reload
          </div>
        </div>
      </div>

      {/* Code Editor Mock */}
      <div id="code-content-panel" className="lg:col-span-3 flex flex-col bg-app-card border border-app-border rounded-xl overflow-hidden shadow-2xl">
        {/* Editor Title Bar */}
        <div className="bg-app-bg px-4 py-3 border-b border-app-border flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-serif font-medium text-app-bright flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#059669] animate-pulse"></span>
              {activeFile.name}
            </h3>
            <p className="text-xs text-app-dim mt-0.5">{activeFile.description}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              id="copy-code-btn"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-app-card hover:bg-app-subtle text-xs font-medium text-app-text border border-app-border transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[#059669]" />
                  <span className="text-[#059669]">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-app-dim" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Editor Window */}
        <div className="flex-1 font-mono text-xs overflow-auto max-h-[500px] p-4 flex gap-4 bg-app-bg">
          {/* Line Numbers */}
          <div className="text-app-dim select-none text-right pr-3 border-r border-app-border min-w-8 flex flex-col">
            {Array.from({ length: lineCount }).map((_, i) => (
              <span key={i} className="leading-5 h-5">{i + 1}</span>
            ))}
          </div>

          {/* Real Python styling elements */}
          <div className="flex-1 text-app-text overflow-x-auto whitespace-pre leading-5 selection:bg-slate-800/80">
            {activeFile.content.split('\n').map((line, i) => {
              // Simple highlighting based on keywords for beautiful text display
              return (
                <div key={i} className="h-5 hover:bg-app-subtle/40 px-1 rounded">
                  {line.split(/(\s+)/).map((part, pIdx) => {
                    const isKeyword = /^(def|class|import|from|return|if|for|in|try|except|raise|pass|and|or|not|as|yield)$/.test(part);
                    const isDecorator = /^@\w+/.test(part);
                    const isComment = /^\s*#.*/.test(line);
                    const isString = /^['"].*['"]$/.test(part) || (part.startsWith('"') || part.startsWith("'"));
                    const isType = /^(str|int|bool|float|Optional|List|Session|BaseModel|Field|APIRouter|FastAPI)$/.test(part);

                    if (isComment && part === line) {
                      return <span key={pIdx} className="text-app-dim italic">{part}</span>;
                    }
                    if (isKeyword) {
                      return <span key={pIdx} className="text-emerald-500 font-semibold">{part}</span>;
                    }
                    if (isDecorator) {
                      return <span key={pIdx} className="text-amber-500/90 font-semibold">{part}</span>;
                    }
                    if (isType) {
                      return <span key={pIdx} className="text-teal-400">{part}</span>;
                    }
                    if (isString) {
                      return <span key={pIdx} className="text-[#059669]">{part}</span>;
                    }
                    return <span key={pIdx}>{part}</span>;
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
