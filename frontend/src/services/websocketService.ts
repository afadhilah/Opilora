// WebSocket service stub for future real-time integration
export class WebSocketService {
  private url: string;
  constructor(url?: string) {
    this.url = url || import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws';
  }
  connect() { console.log(`[WS] Would connect to ${this.url}`); }
  disconnect() { console.log('[WS] Disconnected'); }
  onMessage(_callback: (data: unknown) => void) { /* stub */ }
}

export const wsService = new WebSocketService();
