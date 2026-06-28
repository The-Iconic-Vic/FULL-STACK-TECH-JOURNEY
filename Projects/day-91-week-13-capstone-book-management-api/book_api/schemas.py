from pydantic import BaseModel, Field
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
        from_attributes = True
