import { useState, useEffect } from 'react';
import { Book, ApiLog, ActiveTab } from './types';
import CodeBrowser from './components/CodeBrowser';
import DatabaseViewer from './components/DatabaseViewer';
import SwaggerDocs from './components/SwaggerDocs';
import LibraryApp from './components/LibraryApp';
import Terminal from './components/Terminal';
import { 
  BookOpen, Code, Database, Compass, Terminal as TerminalIcon, Sparkles, Download, ExternalLink, HelpCircle, Sun, Moon
} from 'lucide-react';

const SEED_BOOKS: Book[] = [
  { id: 1, title: 'The Hobbit', author: 'J.R.R. Tolkien', isbn: '9780261102217', published_year: 1937, available: true },
  { id: 2, title: '1984', author: 'George Orwell', isbn: '9780451524935', published_year: 1949, available: true },
  { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '9780446310789', published_year: 1960, available: false },
  { id: 4, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '9780743273565', published_year: 1925, available: true },
  { id: 5, title: 'The Catcher in the Rye', author: 'J.D. Salinger', isbn: '9780316769174', published_year: 1951, available: false }
];

const INITIAL_LOGS = [
  'INFO:     Started server process [18921]',
  'INFO:     Waiting for application startup.',
  'INFO:     SQLAlchemy mapped metadata schema with tables ["books"].',
  'INFO:     SQLite database engine connected to local file "books.db".',
  'INFO:     Application startup complete.',
  'INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)'
];

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('playground');
  const [isLight, setIsLight] = useState<boolean>(() => {
    return localStorage.getItem('theme') === 'light';
  });

  useEffect(() => {
    if (isLight) {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    }
  }, [isLight]);
  const [books, setBooks] = useState<Book[]>(() => {
    const cached = localStorage.getItem('fastapi_sim_books');
    return cached ? JSON.parse(cached) : SEED_BOOKS;
  });
  const [logs, setLogs] = useState<string[]>(() => {
    const cached = localStorage.getItem('fastapi_sim_logs');
    return cached ? JSON.parse(cached) : INITIAL_LOGS;
  });

  useEffect(() => {
    localStorage.setItem('fastapi_sim_books', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem('fastapi_sim_logs', JSON.stringify(logs));
  }, [logs]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, message]);
  };

  const handleResetDb = () => {
    setBooks(SEED_BOOKS);
    const newLogs = [
      ...logs,
      `INFO:     127.0.0.1:54321 - "POST /admin/reset/ HTTP/1.1" 200 OK`,
      `INFO:     SQLAlchemy dropping all tables...`,
      `INFO:     Base.metadata.create_all(bind=engine) called successfully.`,
      `INFO:     Database books.db re-seeded with ${SEED_BOOKS.length} sample books.`
    ];
    setLogs(newLogs);
  };

  const handleClearDb = () => {
    setBooks([]);
    const newLogs = [
      ...logs,
      `INFO:     127.0.0.1:54321 - "POST /admin/truncate/ HTTP/1.1" 200 OK`,
      `INFO:     Truncated table 'books' (0 records remaining).`
    ];
    setLogs(newLogs);
  };

  const handleClearLogs = () => {
    setLogs([]);
  };

  // Shared router handler mimicking the FastAPI logic
  const handleExecuteApi = (
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    endpoint: string,
    params: Record<string, string>,
    body: string
  ): { statusCode: number; data: any } => {
    const ip = '127.0.0.1';
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    
    // Simulate latency
    const start = performance.now();
    
    let statusCode = 200;
    let responseData: any = null;

    try {
      if (endpoint === '/books/') {
        if (method === 'GET') {
          // Pagination skip and limit
          const skip = parseInt(params.skip || '0');
          const limit = parseInt(params.limit || '100');
          
          if (isNaN(skip) || skip < 0) {
            statusCode = 422;
            throw new Error('Unprocessable Entity: skip parameter must be a non-negative integer');
          }
          if (isNaN(limit) || limit <= 0) {
            statusCode = 422;
            throw new Error('Unprocessable Entity: limit parameter must be a positive integer');
          }

          responseData = books.slice(skip, skip + limit);
          statusCode = 200;
        } 
        else if (method === 'POST') {
          if (!body) {
            statusCode = 422;
            throw new Error('Field required: Request body is empty');
          }

          let jsonBody: any;
          try {
            jsonBody = JSON.parse(body);
          } catch (e) {
            statusCode = 422;
            throw new Error('Unprocessable Entity: Invalid JSON payload');
          }

          // Validation constraints mimicking Pydantic
          if (!jsonBody.title || jsonBody.title.trim().length === 0) {
            statusCode = 422;
            throw new Error('Validation Error: title cannot be empty');
          }
          if (!jsonBody.author || jsonBody.author.trim().length === 0) {
            statusCode = 422;
            throw new Error('Validation Error: author cannot be empty');
          }
          if (!jsonBody.isbn || jsonBody.isbn.trim().length < 10 || jsonBody.isbn.trim().length > 13) {
            statusCode = 422;
            throw new Error('Validation Error: isbn must be between 10 and 13 characters');
          }
          if (!jsonBody.published_year || isNaN(parseInt(jsonBody.published_year)) || parseInt(jsonBody.published_year) <= 0 || parseInt(jsonBody.published_year) > 2026) {
            statusCode = 422;
            throw new Error('Validation Error: published_year must be a valid year (1 to 2026)');
          }

          // Check unique ISBN
          const duplicate = books.find(b => b.isbn === jsonBody.isbn);
          if (duplicate) {
            statusCode = 400;
            throw new Error(`Bad Request: Book with ISBN '${jsonBody.isbn}' already exists.`);
          }

          const nextId = books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;
          const newBook: Book = {
            id: nextId,
            title: jsonBody.title,
            author: jsonBody.author,
            isbn: jsonBody.isbn,
            published_year: parseInt(jsonBody.published_year),
            available: jsonBody.available !== undefined ? !!jsonBody.available : true
          };

          setBooks(prev => [...prev, newBook]);
          responseData = newBook;
          statusCode = 201;
        }
      } 
      else if (endpoint === '/books/search/') {
        if (method === 'GET') {
          const q = params.q;
          if (!q || q.trim().length === 0) {
            statusCode = 422;
            throw new Error('Validation Error: search term parameter q is required and must be at least 1 character');
          }

          const searchLower = q.toLowerCase();
          responseData = books.filter(b => {
            return (
              b.title.toLowerCase().includes(searchLower) ||
              b.author.toLowerCase().includes(searchLower) ||
              b.published_year.toString() === q
            );
          });
          statusCode = 200;
        }
      } 
      else if (endpoint === '/books/{id}') {
        const idStr = params.id;
        const id = parseInt(idStr || '');
        
        if (isNaN(id)) {
          statusCode = 422;
          throw new Error('Validation Error: path variable id must be an integer');
        }

        const book = books.find(b => b.id === id);

        if (method === 'GET') {
          if (!book) {
            statusCode = 404;
            throw new Error('Not Found: Book not found');
          }
          responseData = book;
          statusCode = 200;
        } 
        else if (method === 'PUT') {
          if (!book) {
            statusCode = 404;
            throw new Error('Not Found: Book not found');
          }

          let jsonBody: any;
          try {
            jsonBody = JSON.parse(body);
          } catch (e) {
            statusCode = 422;
            throw new Error('Unprocessable Entity: Invalid JSON payload');
          }

          // Check unique ISBN if changing
          if (jsonBody.isbn && jsonBody.isbn !== book.isbn) {
            const duplicate = books.find(b => b.isbn === jsonBody.isbn);
            if (duplicate) {
              statusCode = 400;
              throw new Error(`Bad Request: Book with ISBN '${jsonBody.isbn}' already exists.`);
            }
          }

          const updatedBooks = books.map(b => {
            if (b.id === id) {
              return {
                ...b,
                title: jsonBody.title !== undefined ? jsonBody.title : b.title,
                author: jsonBody.author !== undefined ? jsonBody.author : b.author,
                isbn: jsonBody.isbn !== undefined ? jsonBody.isbn : b.isbn,
                published_year: jsonBody.published_year !== undefined ? parseInt(jsonBody.published_year) : b.published_year,
                available: jsonBody.available !== undefined ? !!jsonBody.available : b.available
              };
            }
            return b;
          });

          setBooks(updatedBooks);
          responseData = updatedBooks.find(b => b.id === id);
          statusCode = 200;
        } 
        else if (method === 'DELETE') {
          if (!book) {
            statusCode = 404;
            throw new Error('Not Found: Book not found');
          }

          setBooks(prev => prev.filter(b => b.id !== id));
          responseData = null;
          statusCode = 204;
        }
      }
    } catch (e: any) {
      responseData = { detail: e.message || 'Something went wrong' };
    }

    const duration = Math.round(performance.now() - start);
    
    // Format log: e.g. INFO:     127.0.0.1:49213 - "POST /books/ HTTP/1.1" 210 Created
    let statusText = 'OK';
    if (statusCode === 201) statusText = 'Created';
    if (statusCode === 204) statusText = 'No Content';
    if (statusCode === 400) statusText = 'Bad Request';
    if (statusCode === 404) statusText = 'Not Found';
    if (statusCode === 422) statusText = 'Unprocessable Entity';

    const logMsg = `INFO:     ${ip}:52132 - "${method} ${endpoint.replace('{id}', params.id || '')} HTTP/1.1" ${statusCode} ${statusText}`;
    addLog(logMsg);

    return { statusCode, data: responseData };
  };

  // Helper callbacks directly from human client UI
  const handleClientAddBook = (book: Omit<Book, 'id'>) => {
    const res = handleExecuteApi('POST', '/books/', {}, JSON.stringify(book));
    if (res.statusCode >= 200 && res.statusCode < 300) {
      return { statusCode: res.statusCode };
    }
    return { statusCode: res.statusCode, error: res.data?.detail || 'Error creating book' };
  };

  const handleClientUpdateBook = (id: number, updates: Partial<Book>) => {
    const res = handleExecuteApi('PUT', '/books/{id}', { id: String(id) }, JSON.stringify(updates));
    if (res.statusCode >= 200 && res.statusCode < 300) {
      return { statusCode: res.statusCode };
    }
    return { statusCode: res.statusCode, error: res.data?.detail || 'Error updating book' };
  };

  const handleClientDeleteBook = (id: number) => {
    const res = handleExecuteApi('DELETE', '/books/{id}', { id: String(id) }, '');
    return { statusCode: res.statusCode };
  };

  return (
    <div id="app-viewport" className="min-h-screen bg-app-bg text-app-text flex flex-col antialiased font-sans">
      {/* Decorative Gradient Background overlay */}
      <div className="absolute top-0 left-0 right-0 h-[350px] bg-gradient-to-b from-[#059669]/5 to-transparent pointer-events-none z-0"></div>

      {/* Primary Top Header */}
      <header className="sticky top-0 z-50 bg-app-card border-b border-app-border px-6 md:px-10 py-4 flex-shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#059669] rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-[#059669]/20">
              F
            </div>
            <div>
              <h1 className="text-xl font-serif text-app-bright tracking-tight flex items-center gap-2">
                Book API <span className="text-[#059669] opacity-80 italic text-xs font-sans font-normal ml-1 bg-[#059669]/10 px-2 py-0.5 rounded border border-[#059669]/20">Operational</span>
              </h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-app-dim font-mono">
                FastAPI + SQLite • Capstone Project
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="flex items-center gap-1.5 bg-app-subtle px-3 py-1.5 border border-app-border rounded-lg text-[#059669]">
              <span className="w-1.5 h-1.5 bg-[#059669] rounded-full animate-pulse"></span>
              FastAPI: Ready
            </span>
            <span className="flex items-center gap-1.5 bg-app-subtle px-3 py-1.5 border border-app-border rounded-lg text-app-muted">
              SQLite: Active
            </span>
            
            {/* Theme Toggle Button */}
            <button
              id="theme-toggle-btn"
              onClick={() => setIsLight(!isLight)}
              className="flex items-center justify-center p-1.5 bg-app-subtle border border-app-border hover:border-[#059669]/40 text-app-muted hover:text-app-bright rounded-lg transition-all cursor-pointer h-8 w-8"
              title={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              {isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Core Body Space */}
      <main className="relative max-w-7xl w-full mx-auto p-4 md:p-10 flex-1 flex flex-col gap-8">
        
        {/* Navigation Tabs Bar */}
        <div id="view-tabs-bar" className="flex items-center overflow-x-auto gap-1 bg-app-card border border-app-border p-1.5 rounded-xl scrollbar-none select-none">
          <button
            id="tab-playground-btn"
            onClick={() => setActiveTab('playground')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all ${
              activeTab === 'playground'
                ? 'bg-[#059669] text-white shadow-md font-bold'
                : 'text-app-muted hover:text-app-bright hover:bg-app-subtle'
            }`}
          >
            <Compass className="h-3.5 w-3.5" />
            Library App Client
          </button>

          <button
            id="tab-docs-btn"
            onClick={() => setActiveTab('docs')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all ${
              activeTab === 'docs'
                ? 'bg-[#059669] text-white shadow-md font-bold'
                : 'text-app-muted hover:text-app-bright hover:bg-app-subtle'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            Swagger Docs (/docs)
          </button>

          <button
            id="tab-database-btn"
            onClick={() => setActiveTab('database')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all ${
              activeTab === 'database'
                ? 'bg-[#059669] text-white shadow-md font-bold'
                : 'text-app-muted hover:text-app-bright hover:bg-app-subtle'
            }`}
          >
            <Database className="h-3.5 w-3.5" />
            SQLite Database Explorer
          </button>

          <button
            id="tab-code-btn"
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all ${
              activeTab === 'code'
                ? 'bg-[#059669] text-white shadow-md font-bold'
                : 'text-app-muted hover:text-app-bright hover:bg-app-subtle'
            }`}
          >
            <Code className="h-3.5 w-3.5" />
            Python Code Browser
          </button>
        </div>

        {/* Tab content panel */}
        <div id="tab-content-panel" className="flex-1">
          {activeTab === 'playground' && (
            <LibraryApp
              books={books}
              onAddBook={handleClientAddBook}
              onUpdateBook={handleClientUpdateBook}
              onDeleteBook={handleClientDeleteBook}
              onResetDb={handleResetDb}
            />
          )}

          {activeTab === 'docs' && (
            <SwaggerDocs
              books={books}
              onExecuteApi={handleExecuteApi}
            />
          )}

          {activeTab === 'database' && (
            <DatabaseViewer
              books={books}
              onSeed={handleResetDb}
              onClear={handleClearDb}
            />
          )}

          {activeTab === 'code' && (
            <CodeBrowser />
          )}
        </div>

        {/* Live Terminal section */}
        <div id="app-footer-terminal" className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] uppercase tracking-widest font-bold text-app-dim flex items-center gap-1.5 font-sans">
              <TerminalIcon className="h-3.5 w-3.5 text-[#059669]" />
              Live Server Output Stream
            </span>
            <span className="text-[10px] text-app-dim font-mono">127.0.0.1:8000</span>
          </div>
          <Terminal
            logs={logs}
            onClear={handleClearLogs}
          />
        </div>
      </main>

      {/* Footer credits and information */}
      <footer className="mt-auto bg-app-card border-t border-app-border py-5 px-6 md:px-10 text-center text-[10px] text-app-dim uppercase tracking-widest">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>Connected to SQLite Engine • 2.4MB Disk Usage</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse"></div>
              Uvicorn Ready
            </span>
            <span>Docs: localhost:8000/docs</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
