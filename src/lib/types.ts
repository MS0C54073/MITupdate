
import type { Timestamp } from 'firebase/firestore';

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

export interface Comment {
  id?: string; // Firestore document ID
  name: string;
  email?: string;
  comment?: string;
  timestamp: Timestamp | ReturnType<typeof import('firebase/firestore').serverTimestamp>; // Firestore Timestamp or ServerTimestamp sentinel
  userId?: string;
}

export interface Order {
  id?: string; // Firestore document ID
  name: string;
  email?: string;
  phone?: string;
  details?: string;
  status: string;
  attachmentName?: string | null;
  attachmentUrl?: string | null;
  timestamp: Timestamp | ReturnType<typeof import('firebase/firestore').serverTimestamp>; // Firestore Timestamp or ServerTimestamp sentinel
  userId?: string;
}

export interface Review {
  id?: string;
  name: string;
  review?: string;
  rating: number; // 1 to 5
  timestamp: Timestamp | ReturnType<typeof import('firebase/firestore').serverTimestamp>;
}

// Data from Firestore for blog posts
export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  publishedDate: Timestamp;
  imageUrl: string;
  imageHint: string;
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
  status: string;
  attachmentName: string | null;
  attachmentUrl: string | null;
  timestamp: string; // Formatted timestamp string
}

export interface DisplayReview {
  id: string;
  name: string;
  review: string;
  rating: number;
  timestamp: string;
}

// For the blog index page
export interface DisplayBlogPost {
    id: string;
    title: string;
    slug: string;
    author: string;
    publishedDate: string;
    imageUrl: string;
    imageHint: string;
    excerpt: string;
}

// For the single blog post page
export interface FullDisplayBlogPost {
    id:string;
    title: string;
    slug: string;
    content: string;
    author: string;
    publishedDate: string;
    imageUrl: string;
    imageHint: string;
}
