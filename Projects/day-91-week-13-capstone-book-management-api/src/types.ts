export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  published_year: number;
  available: boolean;
}

export interface ApiLog {
  timestamp: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  statusCode: number;
  ip: string;
  durationMs: number;
}

export type ActiveTab = 'playground' | 'docs' | 'database' | 'code' | 'logs';
