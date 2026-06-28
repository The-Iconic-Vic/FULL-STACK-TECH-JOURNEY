from sqlalchemy.orm import Session
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
    return True
