import { useState } from 'react';
import { Book } from '../types';
import { AlertCircle, ChevronDown, ChevronUp, Play, Check, Send, Sparkles } from 'lucide-react';

interface SwaggerDocsProps {
  books: Book[];
  onExecuteApi: (
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    endpoint: string,
    params: Record<string, string>,
    body: string
  ) => { statusCode: number; data: any };
}

interface EndpointDef {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  summary: string;
  description: string;
  parameters: {
    name: string;
    in: 'query' | 'path';
    required: boolean;
    type: 'string' | 'integer' | 'boolean';
    description: string;
    default?: any;
  }[];
  requestBodySchema?: string;
  defaultBody?: string;
}

const ENDPOINTS: EndpointDef[] = [
  {
    method: 'GET',
    path: '/books/',
    summary: 'Read Books',
    description: 'Retrieve books from the database. Supports standard cursor-based pagination parameters limit and offset (skip).',
    parameters: [
      { name: 'skip', in: 'query', required: false, type: 'integer', description: 'Number of records to skip for pagination', default: '0' },
      { name: 'limit', in: 'query', required: false, type: 'integer', description: 'Maximum number of records to return', default: '100' }
    ]
  },
  {
    method: 'POST',
    path: '/books/',
    summary: 'Create Book',
    description: 'Create a new book record. Pydantic schema guarantees required field constraints and ISBN formats.',
    parameters: [],
    requestBodySchema: `{
  "title": "string",
  "author": "string",
  "isbn": "string (10-13 chars)",
  "published_year": "integer",
  "available": "boolean"
}`,
    defaultBody: `{
  "title": "Designing Data-Intensive Applications",
  "author": "Martin Kleppmann",
  "isbn": "9781449373320",
  "published_year": 2017,
  "available": true
}`
  },
  {
    method: 'GET',
    path: '/books/search/',
    summary: 'Search Books',
    description: 'Query books using sub-string pattern matches on Title or Author, or exact matches on Published Year.',
    parameters: [
      { name: 'q', in: 'query', required: true, type: 'string', description: 'Search term for title, author, or publication year' }
    ]
  },
  {
    method: 'GET',
    path: '/books/{id}',
    summary: 'Read Book',
    description: 'Fetch detailed single book metadata using its unique database primary key ID.',
    parameters: [
      { name: 'id', in: 'path', required: true, type: 'integer', description: 'The unique integer identifier of the book record' }
    ]
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    summary: 'Update Book',
    description: 'Modify an existing book. Partially-filled schemas allow updating individual parameters or full objects.',
    parameters: [
      { name: 'id', in: 'path', required: true, type: 'integer', description: 'The unique integer identifier of the book to update' }
    ],
    requestBodySchema: `{
  "title": "string (optional)",
  "author": "string (optional)",
  "isbn": "string (optional)",
  "published_year": "integer (optional)",
  "available": "boolean (optional)"
}`,
    defaultBody: `{
  "available": false
}`
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    summary: 'Delete Book',
    description: 'Purge a book record from the SQLite database forever by primary identifier ID.',
    parameters: [
      { name: 'id', in: 'path', required: true, type: 'integer', description: 'The unique integer identifier of the book to delete' }
    ]
  }
];

export default function SwaggerDocs({ books, onExecuteApi }: SwaggerDocsProps) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);
  const [isTryingOut, setIsTryingOut] = useState<Record<number, boolean>>({});
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [bodies, setBodies] = useState<Record<number, string>>({});
  const [results, setResults] = useState<Record<number, { statusCode: number; response: string; curl: string; url: string }>>({});

  const toggleExpand = (idx: number) => {
    setExpandedIdx(expandedIdx === idx ? null : idx);
  };

  const handleTryOutToggle = (idx: number, endpoint: EndpointDef) => {
    const nextState = !isTryingOut[idx];
    setIsTryingOut(prev => ({ ...prev, [idx]: nextState }));
    
    if (nextState) {
      // Initialize default values
      const initialInputs: Record<string, string> = { ...inputs };
      endpoint.parameters.forEach(p => {
        const key = `${idx}-${p.name}`;
        if (!(key in inputs) && p.default !== undefined) {
          initialInputs[key] = p.default;
        }
      });
      setInputs(initialInputs);

      if (endpoint.defaultBody && !(idx in bodies)) {
        setBodies(prev => ({ ...prev, [idx]: endpoint.defaultBody || '' }));
      }
    }
  };

  const handleInputChange = (idx: number, paramName: string, val: string) => {
    setInputs(prev => ({ ...prev, [`${idx}-${paramName}`]: val }));
  };

  const handleBodyChange = (idx: number, val: string) => {
    setBodies(prev => ({ ...prev, [idx]: val }));
  };

  const handleExecute = (idx: number, endpoint: EndpointDef) => {
    // Collect parameters
    const params: Record<string, string> = {};
    endpoint.parameters.forEach(p => {
      const val = inputs[`${idx}-${p.name}`];
      if (val !== undefined && val !== '') {
        params[p.name] = val;
      }
    });

    const bodyText = bodies[idx] || '';
    
    // Call handler to get real state modification and uvicorn logging
    const result = onExecuteApi(endpoint.method, endpoint.path, params, bodyText);

    // Build URL & Curl for the UI
    let fullUrl = `http://127.0.0.1:8000${endpoint.path}`;
    // Replace paths
    Object.keys(params).forEach(k => {
      if (endpoint.path.includes(`{${k}}`)) {
        fullUrl = fullUrl.replace(`{${k}}`, params[k]);
      }
    });
    // Add queries
    const queryParams = new URLSearchParams();
    Object.keys(params).forEach(k => {
      if (!endpoint.path.includes(`{${k}}`)) {
        queryParams.append(k, params[k]);
      }
    });
    const queryString = queryParams.toString();
    if (queryString) {
      fullUrl += `?${queryString}`;
    }

    // Curl
    let curlCmd = `curl -X '${endpoint.method}' \\\n  '${fullUrl}'`;
    if (endpoint.method !== 'GET' && endpoint.method !== 'DELETE') {
      curlCmd += ` \\\n  -H 'accept: application/json' \\\n  -H 'Content-Type: application/json' \\\n  -d '${bodyText.replace(/\n/g, ' ')}'`;
    } else {
      curlCmd += ` \\\n  -H 'accept: application/json'`;
    }

    setResults(prev => ({
      ...prev,
      [idx]: {
        statusCode: result.statusCode,
        response: JSON.stringify(result.data, null, 2),
        curl: curlCmd,
        url: fullUrl
      }
    }));
  };

  return (
    <div id="swagger-ui-root" className="bg-app-card text-app-text rounded-xl overflow-hidden border border-app-border shadow-lg flex flex-col font-sans select-text">
      {/* FastAPI Header */}
      <div className="bg-app-bg px-6 py-5 text-app-bright flex items-center justify-between border-b border-app-border">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl font-serif font-medium tracking-tight">Book Management API</h2>
            <span className="text-xs bg-[#059669]/10 text-[#059669] font-mono border border-[#059669]/30 px-2.5 py-0.5 rounded-full font-bold">
              1.0.0
            </span>
            <span className="text-xs bg-app-subtle text-app-muted border border-app-border font-mono px-2 py-0.5 rounded">
              OAS 3.1.0
            </span>
          </div>
          <p className="text-xs text-app-dim mt-1.5 font-mono max-w-xl">
            Auto-generated interactive API specification powered by FastAPI and OpenAPI metadata.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[#059669] text-xs font-mono font-semibold bg-[#059669]/5 border border-[#059669]/20 px-3 py-1.5 rounded-lg">
          <Sparkles className="h-4 w-4 animate-pulse" />
          <span>LIVE SWAGGER CONSOLE</span>
        </div>
      </div>

      {/* Docs Info Description block */}
      <div className="p-6 bg-app-card border-b border-app-border text-xs text-app-muted leading-relaxed grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-bold text-app-bright mb-1 uppercase tracking-wider text-[10px] font-sans">OpenAPI Specifications</h4>
          <p className="mb-2">This is the default visual explorer mapping direct CRUD database interactions to SQLite. Try expanding an endpoint, click <strong className="text-[#059669]">Try it out</strong>, adjust schema objects, and hit <strong className="text-[#059669]">Execute</strong> to inspect response payloads instantly.</p>
          <div className="flex gap-2.5 text-[#059669] font-mono font-bold text-[11px] mt-2">
            <a href="#swagger-ui-root" className="hover:underline">/openapi.json</a>
            <span>•</span>
            <a href="#swagger-ui-root" className="hover:underline">ReDoc Viewer</a>
          </div>
        </div>
        <div className="bg-app-bg p-4 rounded-lg border border-app-border flex flex-col justify-center">
          <div className="flex items-center gap-1.5 font-semibold text-app-bright text-[11px] mb-1">
            <AlertCircle className="h-3.5 w-3.5 text-[#059669]" />
            <span>Pydantic Models & SQLAlchemy Bindings</span>
          </div>
          <p className="text-[11px] text-app-dim">Validations verify rules such as unique <code className="bg-app-subtle text-app-text px-1 py-0.5 rounded font-mono border border-app-border">isbn</code>, minimum sizes, and non-future year bounds inside schemas dynamically.</p>
        </div>
      </div>

      {/* Tags section */}
      <div className="p-6 flex-1 flex flex-col gap-4">
        <div className="border-b border-app-border pb-2">
          <h3 className="text-base font-serif font-medium text-app-bright flex items-center gap-2">
            <span>books</span>
            <span className="text-xs text-app-dim font-mono font-normal">API Controllers for Books Collection</span>
          </h3>
        </div>

        {/* Accordions List */}
        <div className="space-y-3.5">
          {ENDPOINTS.map((endpoint, idx) => {
            const isExpanded = expandedIdx === idx;
            const isTrying = !!isTryingOut[idx];
            const currentResult = results[idx];

            let badgeBg = '';
            let borderClass = '';
            let headerBg = '';
            let hoverBg = '';
            
            if (endpoint.method === 'GET') {
              badgeBg = 'bg-[#1D4ED8]';
              borderClass = 'border-[#1D4ED8]/30';
              headerBg = 'bg-[#1D4ED8]/5';
              hoverBg = 'hover:bg-[#1D4ED8]/10';
            } else if (endpoint.method === 'POST') {
              badgeBg = 'bg-[#059669]';
              borderClass = 'border-[#059669]/30';
              headerBg = 'bg-[#059669]/5';
              hoverBg = 'hover:bg-[#059669]/10';
            } else if (endpoint.method === 'PUT') {
              badgeBg = 'bg-[#D97706]';
              borderClass = 'border-[#D97706]/30';
              headerBg = 'bg-[#D97706]/5';
              hoverBg = 'hover:bg-[#D97706]/10';
            } else if (endpoint.method === 'DELETE') {
              badgeBg = 'bg-[#DC2626]';
              borderClass = 'border-[#DC2626]/30';
              headerBg = 'bg-[#DC2626]/5';
              hoverBg = 'hover:bg-[#DC2626]/10';
            }

            return (
              <div
                key={idx}
                className={`border rounded-lg overflow-hidden transition-all duration-200 ${borderClass} ${isExpanded ? 'shadow-md' : 'shadow-sm hover:shadow'}`}
              >
                {/* Header Row */}
                <button
                  id={`swagger-header-${idx}`}
                  onClick={() => toggleExpand(idx)}
                  className={`w-full flex items-center justify-between text-left px-4 py-3 select-none ${headerBg} ${hoverBg} transition-all cursor-pointer`}
                >
                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span className={`text-white text-[10px] font-bold px-2.5 py-1 rounded-md min-w-[70px] text-center ${badgeBg}`}>
                      {endpoint.method}
                    </span>
                    <span className="font-bold text-app-bright">{endpoint.path}</span>
                    <span className="text-app-muted font-sans hidden md:inline">• {endpoint.summary}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-app-dim font-sans hidden sm:inline">
                      {endpoint.parameters.length > 0 ? `${endpoint.parameters.length} params` : 'no params'}
                    </span>
                    {isExpanded ? <ChevronUp className="h-4 w-4 text-app-muted" /> : <ChevronDown className="h-4 w-4 text-app-muted" />}
                  </div>
                </button>

                {/* Expanded Body Panel */}
                {isExpanded && (
                  <div className="p-4 border-t border-app-border bg-app-card space-y-4">
                    {/* Endpoint Description */}
                    <div className="text-xs text-app-muted bg-app-bg p-3 rounded border border-app-border">
                      <p className="font-medium text-app-bright mb-1">Description</p>
                      <p className="leading-relaxed">{endpoint.description}</p>
                    </div>

                    {/* Params Table / Body Container */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-app-bright uppercase tracking-wider">Parameters</h4>
                        <button
                          id={`tryout-btn-${idx}`}
                          onClick={() => handleTryOutToggle(idx, endpoint)}
                          className={`text-xs px-3 py-1.5 rounded font-semibold border transition-all cursor-pointer ${
                            isTrying
                              ? 'bg-rose-500/10 border-rose-500/20 text-rose-400 hover:bg-rose-500/20'
                              : 'bg-[#059669]/10 border-[#059669]/20 text-[#059669] hover:bg-[#059669]/20'
                          }`}
                        >
                          {isTrying ? 'Cancel' : 'Try it out'}
                        </button>
                      </div>

                      {/* Path & Query Params list */}
                      {endpoint.parameters.length === 0 ? (
                        <div className="text-xs text-app-dim italic py-1 pl-1">No parameters required.</div>
                      ) : (
                        <div className="border border-app-border rounded overflow-hidden bg-app-bg">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="bg-app-subtle text-app-muted font-bold border-b border-app-border text-[11px]">
                                <th className="p-2.5">Name</th>
                                <th className="p-2.5">In</th>
                                <th className="p-2.5">Type</th>
                                <th className="p-2.5">Description</th>
                                <th className="p-2.5 w-[200px]">Value</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-app-border">
                              {endpoint.parameters.map(p => (
                                <tr key={p.name} className="hover:bg-app-subtle/40 text-app-text">
                                  <td className="p-2.5 font-mono font-semibold text-app-bright">
                                    {p.name} {p.required && <span className="text-rose-500 font-bold" title="Required">*</span>}
                                  </td>
                                  <td className="p-2.5 font-mono text-app-dim text-[10px]">{p.in}</td>
                                  <td className="p-2.5 font-mono text-[#059669]">{p.type}</td>
                                  <td className="p-2.5 text-app-muted leading-normal">{p.description}</td>
                                  <td className="p-2.5">
                                    <input
                                      id={`param-input-${idx}-${p.name}`}
                                      type="text"
                                      disabled={!isTrying}
                                      value={inputs[`${idx}-${p.name}`] ?? ''}
                                      placeholder={p.default !== undefined ? String(p.default) : (p.required ? 'required' : 'optional')}
                                      onChange={(e) => handleInputChange(idx, p.name, e.target.value)}
                                      className={`w-full p-1.5 border rounded font-mono text-xs transition-colors ${
                                        !isTrying
                                          ? 'bg-app-subtle/40 text-app-dim border-app-border'
                                          : 'bg-app-bg border-app-border focus:border-[#059669] focus:ring-1 focus:ring-[#059669] focus:outline-none text-app-bright'
                                      }`}
                                    />
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* Request Body section */}
                      {endpoint.requestBodySchema && (
                        <div className="space-y-1.5">
                          <h5 className="text-[11px] font-bold text-app-muted uppercase font-mono">Request Body (application/json)</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* JSON Schema Model View */}
                            <div className="bg-app-bg text-app-muted p-3 rounded font-mono text-[10px] overflow-x-auto border border-app-border">
                              <span className="text-[#059669] text-xs font-bold block mb-1">Pydantic Model Schema</span>
                              {endpoint.requestBodySchema}
                            </div>
                            {/* Input Edit view */}
                            <div className="flex flex-col">
                              <textarea
                                id={`body-textarea-${idx}`}
                                disabled={!isTrying}
                                value={bodies[idx] ?? ''}
                                onChange={(e) => handleBodyChange(idx, e.target.value)}
                                rows={6}
                                className={`w-full p-2.5 border rounded font-mono text-[11px] leading-relaxed transition-colors flex-1 resize-y min-h-[120px] ${
                                  !isTrying
                                    ? 'bg-app-subtle/60 text-app-dim border-app-border'
                                    : 'bg-app-bg text-[#059669] dark:text-emerald-400 border-app-border focus:border-[#059669] focus:ring-1 focus:ring-[#059669] focus:outline-none'
                                }`}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Execute Section */}
                    {isTrying && (
                      <div className="flex items-center justify-end border-t border-app-border pt-3">
                        <button
                          id={`execute-btn-${idx}`}
                          onClick={() => handleExecute(idx, endpoint)}
                          className="flex items-center gap-2 bg-[#059669] hover:bg-[#047857] active:bg-[#065f46] text-white font-semibold font-mono text-xs px-5 py-2 rounded shadow-sm transition-all cursor-pointer"
                        >
                          <Send className="h-3.5 w-3.5" />
                          EXECUTE
                        </button>
                      </div>
                    )}

                    {/* Execution Results View */}
                    {currentResult && (
                      <div className="border-t border-app-border pt-4 space-y-3">
                        <h4 className="text-xs font-bold text-app-muted uppercase tracking-wider">Server Response</h4>
                        
                        <div className="space-y-2">
                          {/* Curl command used */}
                          <div>
                            <span className="text-[10px] font-bold text-app-dim block mb-1 font-mono">Curl Request</span>
                            <div className="bg-app-bg text-app-text p-2.5 rounded font-mono text-[11px] whitespace-pre overflow-x-auto border border-app-border">
                              {currentResult.curl}
                            </div>
                          </div>

                          {/* Request URL */}
                          <div>
                            <span className="text-[10px] font-bold text-app-dim block mb-1 font-mono">Request URL</span>
                            <div className="bg-app-bg text-[#059669] p-2 rounded font-mono text-[11px] overflow-x-auto border border-app-border select-all">
                              {currentResult.url}
                            </div>
                          </div>

                          {/* Status & Response details */}
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <span className="text-[10px] font-bold text-app-dim font-mono">Server Output</span>
                              <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                                currentResult.statusCode >= 200 && currentResult.statusCode < 300
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                              }`}>
                                Code: {currentResult.statusCode}
                              </span>
                            </div>

                            <div className="bg-app-bg text-[#059669] dark:text-emerald-400 p-3 rounded font-mono text-[11px] whitespace-pre overflow-x-auto border border-app-border max-h-[300px]">
                              {currentResult.response}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
