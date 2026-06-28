import { useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Trash2, ShieldAlert } from 'lucide-react';

interface TerminalProps {
  logs: string[];
  onClear: () => void;
}

export default function Terminal({ logs, onClear }: TerminalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div id="uvicorn-terminal" className="bg-[#0A0A0B] border border-[#222224] rounded-xl overflow-hidden shadow-xl flex flex-col h-[280px]">
      {/* Title Bar */}
      <div className="bg-[#0E0E10] px-4 py-2 border-b border-[#222224] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TerminalIcon className="h-4 w-4 text-[#059669]" />
          <span className="text-xs font-mono font-semibold text-slate-300">
            uvicorn-stdout (FastAPI Dev Server)
          </span>
          <span className="text-[10px] bg-[#059669]/10 text-[#059669] border border-[#059669]/20 px-1.5 py-0.5 rounded font-mono font-medium">
            PID 18921: RUNNING
          </span>
        </div>
        <button
          id="clear-logs-btn"
          onClick={onClear}
          className="text-[#6B7280] hover:text-white p-1 rounded hover:bg-[#111113] transition-colors cursor-pointer"
          title="Clear stdout logs"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Terminal Output Screen */}
      <div
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto font-mono text-xs text-slate-300 space-y-1.5 select-text scrollbar-thin scrollbar-thumb-[#222224] scrollbar-track-transparent"
      >
        {logs.length === 0 ? (
          <div className="text-slate-600 italic py-2">Stdout stream empty. Execute playground endpoints or trigger routes in the Client App.</div>
        ) : (
          logs.map((log, idx) => {
            let colorClass = 'text-slate-300';
            if (log.includes('INFO:')) {
              colorClass = 'text-slate-400';
            }
            if (log.includes('ERROR:') || log.includes('400 Bad Request') || log.includes('404 Not Found')) {
              colorClass = 'text-rose-400';
            } else if (log.includes('201 Created') || log.includes('204 No Content') || log.includes('200 OK')) {
              colorClass = 'text-emerald-400';
            } else if (log.includes('422 Unprocessable Entity')) {
              colorClass = 'text-amber-400';
            }

            // Highlight uvicorn logs specifically
            if (log.startsWith('INFO:     ')) {
              const uvicornLogMatch = log.match(/(INFO:\s+)(.*)(\s+-\s+)(.*)/);
              if (uvicornLogMatch) {
                return (
                  <div key={idx} className="leading-relaxed hover:bg-[#111113]/40 px-1 rounded">
                    <span className="text-[#059669] font-semibold">INFO:</span>
                    <span className="text-slate-500">{uvicornLogMatch[2]}</span>
                    <span className="text-slate-400"> - </span>
                    <span className={colorClass}>{uvicornLogMatch[4]}</span>
                  </div>
                );
              }
            }

            return (
              <div key={idx} className={`leading-relaxed hover:bg-[#111113]/40 px-1 rounded ${colorClass}`}>
                {log}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
