import type { Timestamp } from 'firebase/firestore';

export interface Comment {
  id?: string; // Firestore document ID
  name: string;
  email?: string;
  comment?: string;
  timestamp: Timestamp | ReturnType<typeof import('firebase/firestore').serverTimestamp>; // Firestore Timestamp or ServerTimestamp sentinel
}

export interface Order {
  id?: string; // Firestore document ID
  name: string;
  email?: string;
  phone?: string;
  details?: string;
  attachmentName?: string | null;
  timestamp: Timestamp | ReturnType<typeof import('firebase/firestore').serverTimestamp>; // Firestore Timestamp or ServerTimestamp sentinel
}

// Types for displaying data in admin pages with processed/formatted fields
export interface DisplayComment {
  id: string;
  name: string;
  email: string; // Defaulted if not present
  comment: string; // Defaulted if not present
  timestamp: string; // Formatted timestamp string
}

export interface DisplayOrder {
  id: string;
  name: string;
  email: string; // Defaulted if not present
  phone: string; // Defaulted if not present
  details: string; // Defaulted if not present
  attachmentName: string | null;
  timestamp: string; // Formatted timestamp string
}
