// types/session.d.ts
import 'express-session';

declare module 'express-session' {
  interface SessionData {
    admin_id?: string;
    user_id?: string; 
  }
}
