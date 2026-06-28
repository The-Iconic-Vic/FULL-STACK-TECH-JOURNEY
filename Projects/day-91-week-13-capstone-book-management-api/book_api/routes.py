from fastapi import APIRouter, Depends, HTTPException, Query, status
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
            status_code=status.HTTP_400_BAD_REQUEST, 
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
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Book not found")
    return db_book

@router.put("/{id}", response_model=schemas.Book)
def update_book(id: int, book: schemas.BookUpdate, db: Session = Depends(get_db)):
    db_book = crud.get_book(db, id)
    if not db_book:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Book not found")
    
    if book.isbn and book.isbn != db_book.isbn:
        isbn_book = crud.get_book_by_isbn(db, isbn=book.isbn)
        if isbn_book:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Book with ISBN '{book.isbn}' already exists."
            )
            
    updated = crud.update_book(db=db, book_id=id, book_update=book)
    return updated

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_book(id: int, db: Session = Depends(get_db)):
    success = crud.delete_book(db=db, book_id=id)
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Book not found")
    return None
