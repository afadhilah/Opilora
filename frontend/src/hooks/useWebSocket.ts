import { useEffect, useRef, useState } from 'react';
export function useWebSocket(url?: string) {
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  useEffect(() => {
    if (!url) return;
    // Prototype stub — would connect to real WebSocket
    console.log(`[WS Hook] Would connect to ${url}`);
    setIsConnected(false);
    return () => { wsRef.current?.close(); };
  }, [url]);
  return { isConnected };
}
