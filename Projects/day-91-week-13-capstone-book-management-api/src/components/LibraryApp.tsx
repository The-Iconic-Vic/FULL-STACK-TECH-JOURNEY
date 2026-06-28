import React, { useState } from 'react';
import { Book } from '../types';
import { 
  Plus, Search, BookOpen, Layers, CheckCircle2, XCircle, 
  Trash2, ToggleLeft, ToggleRight, Edit3, Award, RefreshCw, Calendar, Eye
} from 'lucide-react';

interface LibraryAppProps {
  books: Book[];
  onAddBook: (book: Omit<Book, 'id'>) => { statusCode: number; error?: string };
  onUpdateBook: (id: number, updates: Partial<Book>) => { statusCode: number; error?: string };
  onDeleteBook: (id: number) => { statusCode: number; error?: string };
  onResetDb: () => void;
}

export default function LibraryApp({ books, onAddBook, onUpdateBook, onDeleteBook, onResetDb }: LibraryAppProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formAuthor, setFormAuthor] = useState('');
  const [formIsbn, setFormIsbn] = useState('');
  const [formYear, setFormYear] = useState('');
  const [formAvailable, setFormAvailable] = useState(true);
  const [formError, setFormError] = useState('');

  // Editing state
  const [editingId, setEditingId] = useState<number | null>(null);

  // Statistics
  const totalBooks = books.length;
  const availableBooks = books.filter(b => b.available).length;
  const uniqueAuthors = new Set(books.map(b => b.author)).size;

  // Filtered books
  const filteredBooks = books.filter(book => {
    const term = searchTerm.toLowerCase();
    return (
      book.title.toLowerCase().includes(term) ||
      book.author.toLowerCase().includes(term) ||
      book.isbn.includes(term) ||
      book.published_year.toString().includes(term)
    );
  });

  const handleCreateBook = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formTitle.trim()) return setFormError('Title is required');
    if (!formAuthor.trim()) return setFormError('Author is required');
    if (!formIsbn.trim()) return setFormError('ISBN is required');
    if (!formYear.trim()) return setFormError('Published year is required');

    const yearInt = parseInt(formYear);
    if (isNaN(yearInt) || yearInt <= 0 || yearInt > 2026) {
      return setFormError('Published year must be a valid year in history (1 to 2026)');
    }

    if (editingId !== null) {
      const res = onUpdateBook(editingId, {
        title: formTitle,
        author: formAuthor,
        isbn: formIsbn,
        published_year: yearInt,
        available: formAvailable
      });
      if (res.error) {
        setFormError(res.error);
      } else {
        resetForm();
      }
    } else {
      const res = onAddBook({
        title: formTitle,
        author: formAuthor,
        isbn: formIsbn,
        published_year: yearInt,
        available: formAvailable
      });
      if (res.error) {
        setFormError(res.error);
      } else {
        resetForm();
      }
    }
  };

  const startEdit = (book: Book) => {
    setEditingId(book.id);
    setFormTitle(book.title);
    setFormAuthor(book.author);
    setFormIsbn(book.isbn);
    setFormYear(book.published_year.toString());
    setFormAvailable(book.available);
    setShowAddModal(true);
  };

  const resetForm = () => {
    setFormTitle('');
    setFormAuthor('');
    setFormIsbn('');
    setFormYear('');
    setFormAvailable(true);
    setFormError('');
    setEditingId(null);
    setShowAddModal(false);
  };

  const toggleAvailability = (book: Book) => {
    onUpdateBook(book.id, { available: !book.available });
  };

  return (
    <div id="library-app-root" className="space-y-6">
      {/* Stats Widgets */}
      <div id="library-stats-row" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-app-card border border-app-border rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 bg-[#059669]/10 text-[#059669] rounded-lg">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] text-app-dim block font-bold uppercase tracking-wider">Total Catalog Books</span>
            <span className="text-2xl font-bold text-app-bright font-mono">{totalBooks}</span>
          </div>
        </div>

        <div className="bg-app-card border border-app-border rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] text-app-dim block font-bold uppercase tracking-wider">Available for Loan</span>
            <span className="text-2xl font-bold text-app-bright font-mono">{availableBooks}</span>
          </div>
        </div>

        <div className="bg-app-card border border-app-border rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-lg">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] text-app-dim block font-bold uppercase tracking-wider">Unique Authors</span>
            <span className="text-2xl font-bold text-app-bright font-mono">{uniqueAuthors}</span>
          </div>
        </div>

        <div className="bg-app-card border border-app-border rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 bg-[#059669]/10 text-[#059669] rounded-lg">
            <Layers className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] text-app-dim block font-bold uppercase tracking-wider">FastAPI Status</span>
            <span className="text-xs font-semibold text-[#059669] flex items-center gap-1.5 mt-1 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse"></span>
              200 OK (SQLITE)
            </span>
          </div>
        </div>
      </div>

      {/* Main Filter Control & Action Bar */}
      <div id="library-catalog-actions" className="bg-app-card border border-app-border rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4 justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-app-dim" />
          <input
            id="catalog-search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search catalog by title, author, year, or ISBN..."
            className="w-full pl-9 pr-4 py-2 bg-app-bg border border-app-border text-app-text placeholder-app-dim rounded-lg text-sm focus:border-[#059669] focus:outline-none focus:ring-1 focus:ring-[#059669]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            id="open-add-book-modal-btn"
            onClick={() => {
              resetForm();
              setShowAddModal(true);
            }}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 bg-[#059669] hover:bg-[#047857] text-white px-4 py-2 rounded-lg text-sm font-semibold shadow transition-all tracking-wider cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Add New Book
          </button>
          <button
            id="reload-catalog-btn"
            onClick={onResetDb}
            title="Reset Catalog to defaults"
            className="p-2 bg-app-bg border border-app-border hover:bg-app-subtle text-app-muted hover:text-app-bright rounded-lg transition-colors cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Catalog Grid View */}
      <div id="library-books-grid" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredBooks.length === 0 ? (
          <div className="col-span-full bg-app-card border border-app-border rounded-xl p-12 text-center text-app-dim flex flex-col items-center justify-center gap-3">
            <BookOpen className="h-10 w-10 text-app-border animate-pulse" />
            <div>
              <p className="font-semibold text-app-muted">No matching books found</p>
              <p className="text-xs text-app-dim mt-1">Try clearing the search string or reset the database to factory settings.</p>
            </div>
          </div>
        ) : (
          filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-app-card border border-app-border rounded-xl overflow-hidden shadow hover:shadow-lg hover:border-[#059669]/40 transition-all flex flex-col group relative"
            >
              <div className="p-5 flex-1 space-y-3.5">
                {/* Header title/author */}
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-serif font-medium text-app-bright group-hover:text-[#059669] text-base tracking-tight leading-snug line-clamp-2" title={book.title}>
                      {book.title}
                    </h3>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 font-mono ${
                      book.available 
                        ? 'bg-[#059669]/10 text-[#059669] border border-[#059669]/20' 
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      {book.available ? 'In Stock' : 'Loaned Out'}
                    </span>
                  </div>
                  <span className="text-xs text-app-dim block mt-1">by <span className="text-app-muted font-medium">{book.author}</span></span>
                </div>

                {/* Meta specifications */}
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-app-bg p-2.5 rounded-lg border border-app-border">
                  <div>
                    <span className="text-app-dim block uppercase text-[9px] font-semibold tracking-wider">Published</span>
                    <span className="text-app-text flex items-center gap-1 mt-0.5">
                      <Calendar className="h-3 w-3 text-amber-500/80" /> {book.published_year}
                    </span>
                  </div>
                  <div>
                    <span className="text-app-dim block uppercase text-[9px] font-semibold tracking-wider">ISBN Identifier</span>
                    <span className="text-app-text block mt-0.5 select-all">{book.isbn}</span>
                  </div>
                </div>
              </div>

              {/* Grid Card Footer Operations */}
              <div className="bg-app-bg/60 border-t border-app-border px-4 py-3 flex items-center justify-between gap-3 text-xs">
                {/* ID badge */}
                <span className="font-mono text-app-dim text-[10px]">
                  ID: <span className="text-[#059669]">#{book.id}</span>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    id={`toggle-avail-btn-${book.id}`}
                    onClick={() => toggleAvailability(book)}
                    className="p-1 text-app-dim hover:text-app-text transition-colors cursor-pointer"
                    title={book.available ? 'Borrow Book (PUT)' : 'Return Book (PUT)'}
                  >
                    {book.available ? (
                      <ToggleRight className="h-5 w-5 text-[#059669]" />
                    ) : (
                      <ToggleLeft className="h-5 w-5 text-app-dim" />
                    )}
                  </button>

                  <button
                    id={`edit-book-btn-${book.id}`}
                    onClick={() => startEdit(book)}
                    className="p-1.5 text-app-dim hover:text-[#059669] rounded hover:bg-app-subtle transition-colors cursor-pointer"
                    title="Edit Metadata (PUT)"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                  </button>

                  <button
                    id={`delete-book-btn-${book.id}`}
                    onClick={() => onDeleteBook(book.id)}
                    className="p-1.5 text-app-dim hover:text-rose-400 rounded hover:bg-app-subtle transition-colors cursor-pointer"
                    title="Delete Permanently (DELETE)"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit / Add Dialog */}
      {showAddModal && (
        <div id="add-book-dialog-backdrop" className="fixed inset-0 bg-app-bg/80 backdrop-blur-sm flex items-center justify-center p-4 z-[100] animate-fade-in">
          <div id="add-book-dialog-container" className="bg-app-card border border-app-border rounded-xl max-w-md w-full overflow-hidden shadow-2xl flex flex-col">
            <div className="bg-app-bg px-5 py-4 border-b border-app-border flex items-center justify-between">
              <h3 className="font-serif font-medium text-app-bright text-sm">
                {editingId !== null ? `Edit Book #${editingId} (PUT)` : 'Add New Book to DB (POST)'}
              </h3>
              <button
                id="close-dialog-btn"
                onClick={resetForm}
                className="text-app-dim hover:text-app-bright text-sm transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateBook} className="p-5 space-y-4">
              {formError && (
                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3 rounded-lg text-xs flex items-start gap-2 font-mono">
                  <XCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[9px] font-bold text-app-dim uppercase tracking-widest block font-mono">Title</label>
                <input
                  id="form-input-title"
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Clean Code"
                  className="w-full bg-app-bg border border-app-border text-app-bright text-xs p-2.5 rounded-lg focus:border-[#059669] focus:outline-none focus:ring-1 focus:ring-[#059669]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-bold text-app-dim uppercase tracking-widest block font-mono">Author</label>
                <input
                  id="form-input-author"
                  type="text"
                  required
                  value={formAuthor}
                  onChange={(e) => setFormAuthor(e.target.value)}
                  placeholder="e.g. Robert C. Martin"
                  className="w-full bg-app-bg border border-app-border text-app-bright text-xs p-2.5 rounded-lg focus:border-[#059669] focus:outline-none focus:ring-1 focus:ring-[#059669]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-app-dim uppercase tracking-widest block font-mono">ISBN</label>
                  <input
                    id="form-input-isbn"
                    type="text"
                    required
                    value={formIsbn}
                    onChange={(e) => setFormIsbn(e.target.value)}
                    placeholder="10 or 13 digits"
                    className="w-full bg-app-bg border border-app-border text-app-bright text-xs p-2.5 rounded-lg focus:border-[#059669] focus:outline-none focus:ring-1 focus:ring-[#059669]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-app-dim uppercase tracking-widest block font-mono">Published Year</label>
                  <input
                    id="form-input-year"
                    type="number"
                    required
                    value={formYear}
                    onChange={(e) => setFormYear(e.target.value)}
                    placeholder="e.g. 2008"
                    className="w-full bg-app-bg border border-app-border text-app-bright text-xs p-2.5 rounded-lg focus:border-[#059669] focus:outline-none focus:ring-1 focus:ring-[#059669]"
                  />
                </div>
              </div>

              {/* Available checkbox toggle */}
              <div className="flex items-center gap-3 pt-2">
                <input
                  id="form-input-available"
                  type="checkbox"
                  checked={formAvailable}
                  onChange={(e) => setFormAvailable(e.target.checked)}
                  className="h-4 w-4 text-[#059669] bg-app-bg border-app-border rounded focus:ring-[#059669] checked:bg-[#059669]"
                />
                <span className="text-xs text-app-text font-semibold">Mark book as immediately available</span>
              </div>

              {/* CTA buttons */}
              <div className="flex items-center gap-2 pt-4 justify-end border-t border-app-border">
                <button
                  id="form-cancel-btn"
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-xs font-semibold text-app-muted hover:text-app-bright hover:bg-app-subtle rounded-lg transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  id="form-submit-btn"
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-[#059669] hover:bg-[#047857] text-white rounded-lg transition-all shadow cursor-pointer"
                >
                  {editingId !== null ? 'Save Changes' : 'Create Book'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
