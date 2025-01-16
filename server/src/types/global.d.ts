// global.d.ts or express-session.d.ts

declare global {
    namespace Express {
      interface Session {
        regenerate?: (cb: () => void) => void;
        save?: (cb: () => void) => void;
      }
    }
  }
  