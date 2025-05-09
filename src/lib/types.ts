import type { Timestamp } from 'firebase/firestore';

export interface Comment {
  id?: string;
  name: string;
  email?: string;
  comment?: string;
  timestamp: Timestamp | ReturnType<typeof import('firebase/firestore').serverTimestamp>;
}

export interface Order {
  id?: string;
  name: string;
  email?: string;
  phone?: string;
  details?: string;
  attachmentName?: string | null;
  timestamp: Timestamp | ReturnType<typeof import('firebase/firestore').serverTimestamp>;
}