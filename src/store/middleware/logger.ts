export const loggerMiddleware = (config: any) => (set: any, get: any, api: any) =>
  config(
    (...args: any[]) => {
      const prev = get();
      set(...args);
      const next = get();
      if (import.meta.env.DEV) {
        console.groupCollapsed('%c[Store Update]', 'color: #3b6bfa; font-weight: bold;');
        console.log('Prev:', prev);
        console.log('Next:', next);
        console.groupEnd();
      }
    },
    get,
    api
  );
