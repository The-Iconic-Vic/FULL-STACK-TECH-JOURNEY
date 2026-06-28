import { Book } from '../types';
import { Database, Table, Key, Info, RefreshCw, Trash2, ListFilter, AlertCircle } from 'lucide-react';

interface DatabaseViewerProps {
  books: Book[];
  onSeed: () => void;
  onClear: () => void;
}

export default function DatabaseViewer({ books, onSeed, onClear }: DatabaseViewerProps) {
  return (
    <div id="sqlite-db-explorer" className="grid grid-cols-1 xl:grid-cols-4 gap-6">
      {/* Schema / Sidebar */}
      <div id="sqlite-sidebar" className="xl:col-span-1 bg-app-card border border-app-border rounded-xl p-4 flex flex-col gap-4">
        <div className="flex items-center gap-2 pb-2 border-b border-app-border">
          <Database className="h-5 w-5 text-[#059669] animate-pulse" />
          <div>
            <h3 className="font-serif font-medium text-app-bright text-sm">books.db (SQLite)</h3>
            <span className="text-[10px] text-app-dim font-mono">SQLite 3.x - Local File</span>
          </div>
        </div>

        {/* Database Tables list */}
        <div className="space-y-3 flex-1">
          <div>
            <span className="text-[9px] font-bold text-app-dim tracking-widest block mb-1.5 uppercase font-mono">Tables</span>
            <div className="flex items-center justify-between bg-app-bg/40 border border-app-border px-3 py-2 rounded-lg text-app-bright text-xs font-mono font-medium">
              <span className="flex items-center gap-2">
                <Table className="h-3.5 w-3.5 text-[#059669]" />
                <span>books</span>
              </span>
              <span className="text-[10px] text-app-dim font-sans font-normal">({books.length} rows)</span>
            </div>
          </div>

          {/* Table Schema */}
          <div>
            <span className="text-[9px] font-bold text-app-dim tracking-widest block mb-1.5 uppercase font-mono">Column Definitions</span>
            <div className="space-y-1.5 font-mono text-[11px] bg-app-bg p-2.5 rounded-lg border border-app-border">
              <div className="flex items-center justify-between text-app-dim border-b border-app-border pb-1.5 mb-1.5 font-semibold text-xs">
                <span>Column</span>
                <span>Type</span>
              </div>
              <div className="flex items-center justify-between py-0.5">
                <span className="text-[#059669] flex items-center gap-1">
                  <Key className="h-3 w-3 text-amber-500/80" /> id
                </span>
                <span className="text-teal-400/90 font-semibold">INTEGER (PK)</span>
              </div>
              <div className="flex items-center justify-between py-0.5">
                <span className="text-app-text">title</span>
                <span className="text-teal-400/90 font-semibold">VARCHAR(255)</span>
              </div>
              <div className="flex items-center justify-between py-0.5">
                <span className="text-app-text">author</span>
                <span className="text-teal-400/90 font-semibold">VARCHAR(255)</span>
              </div>
              <div className="flex items-center justify-between py-0.5">
                <span className="text-app-text">isbn</span>
                <span className="text-teal-400/90 font-semibold">VARCHAR(13) (UNI)</span>
              </div>
              <div className="flex items-center justify-between py-0.5">
                <span className="text-app-text">published_year</span>
                <span className="text-teal-400/90 font-semibold">INTEGER</span>
              </div>
              <div className="flex items-center justify-between py-0.5">
                <span className="text-app-text">available</span>
                <span className="text-teal-400/90 font-semibold">BOOLEAN (1/0)</span>
              </div>
            </div>
          </div>
        </div>

        {/* DB Actions */}
        <div className="pt-3 border-t border-app-border flex flex-col gap-2">
          <button
            id="seed-db-btn"
            onClick={onSeed}
            className="flex items-center justify-center gap-2 w-full px-3 py-2 text-xs font-semibold text-[#059669] border border-[#059669]/30 bg-[#059669]/5 hover:bg-[#059669]/10 active:bg-[#059669]/20 rounded-lg transition-all cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5 animate-spin-slow" />
            Seed Demo Books
          </button>
          <button
            id="clear-db-btn"
            onClick={onClear}
            className="flex items-center justify-center gap-2 w-full px-3 py-2 text-xs font-semibold text-rose-400 border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 active:bg-rose-500/20 rounded-lg transition-all cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Truncate Table
          </button>
        </div>
      </div>

      {/* Grid Data view */}
      <div id="sqlite-table-viewer" className="xl:col-span-3 flex flex-col bg-app-card border border-app-border rounded-xl overflow-hidden shadow-2xl">
        <div className="bg-app-bg px-4 py-3 border-b border-app-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ListFilter className="h-4 w-4 text-[#059669]" />
            <span className="text-sm font-serif text-app-bright">Table Data Explorer: SELECT * FROM books;</span>
          </div>
          <span className="text-xs text-app-muted bg-app-card px-2.5 py-1 rounded-md border border-app-border">
            {books.length} Row(s)
          </span>
        </div>

        {/* SQL Data Table */}
        <div className="flex-1 overflow-auto min-h-[350px]">
          {books.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center text-app-dim gap-3">
              <AlertCircle className="h-10 w-10 text-app-border animate-pulse" />
              <div>
                <p className="font-semibold text-app-muted">Empty Table Recordset</p>
                <p className="text-xs text-app-dim mt-1">There are no books currently stored in the SQLite database.</p>
              </div>
              <button
                id="empty-table-seed-btn"
                onClick={onSeed}
                className="mt-2 text-xs text-[#059669] hover:text-[#047857] font-semibold underline underline-offset-4 cursor-pointer"
              >
                Seed default books to start testing
              </button>
            </div>
          ) : (
            <table className="w-full text-left border-collapse font-mono text-xs">
              <thead>
                <tr className="bg-app-bg text-app-muted border-b border-app-border text-[11px] select-none">
                  <th className="p-3 pl-4 font-bold">id (PK)</th>
                  <th className="p-3 font-bold">title</th>
                  <th className="p-3 font-bold">author</th>
                  <th className="p-3 font-bold">isbn</th>
                  <th className="p-3 font-bold">published_year</th>
                  <th className="p-3 font-bold pr-4">available</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-app-border">
                {books.map((book) => (
                  <tr key={book.id} className="hover:bg-app-subtle/40 text-app-text transition-colors">
                    <td className="p-3 pl-4 text-[#059669] font-semibold">{book.id}</td>
                    <td className="p-3 text-app-bright max-w-[200px] truncate" title={book.title}>{book.title}</td>
                    <td className="p-3 text-app-text">{book.author}</td>
                    <td className="p-3 text-app-dim select-all">{book.isbn}</td>
                    <td className="p-3 text-amber-500/80">{book.published_year}</td>
                    <td className="p-3 pr-4">
                      <span className={`inline-block w-2.5 h-2.5 rounded-full mr-2 ${book.available ? 'bg-[#059669]' : 'bg-rose-500'}`} />
                      <span className="text-[11px]">
                        {book.available ? 'true (1)' : 'false (0)'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Table Footer Stats */}
        <div className="bg-app-bg/60 p-3 border-t border-app-border flex items-center justify-between text-[11px] text-app-dim">
          <div className="flex items-center gap-1.5 font-sans uppercase tracking-widest text-[10px]">
            <Info className="h-3.5 w-3.5 text-[#059669]" />
            <span>SQLite active database records are preserved across app edits using localized browser cache.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
