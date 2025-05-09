'use client';

import Link from 'next/link';
import TranslatedText from '@/app/components/translated-text';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageSquare, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, orderBy, query, Timestamp } from 'firebase/firestore';
import type { Comment } from '@/lib/types';

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        setError(null);
        const commentsCollection = collection(db, 'comments');
        const q = query(commentsCollection, orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetchedComments = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          // Ensure timestamp is correctly handled
          let formattedTimestamp = 'N/A';
          if (data.timestamp && typeof (data.timestamp as Timestamp).toDate === 'function') {
            formattedTimestamp = (data.timestamp as Timestamp).toDate().toLocaleString();
          } else if (data.timestamp && data.timestamp.seconds) { // Handle cases where it might already be partially structured
            formattedTimestamp = new Date(data.timestamp.seconds * 1000).toLocaleString();
          }
          
          return {
            id: doc.id,
            name: data.name || 'Anonymous',
            email: data.email || 'No email',
            comment: data.comment || 'No comment',
            timestamp: formattedTimestamp, // Store as string after formatting
          } as unknown as Comment; // Cast to Comment after processing
        });
        setComments(fetchedComments);
      } catch (err) {
        console.error("Error fetching comments: ", err);
        setError('Failed to load comments.');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  return (
    <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8 min-h-screen flex flex-col">
      <header className="mb-8">
        <Button variant="outline" asChild className="mb-4">
          <Link href="/admin/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <TranslatedText text="Back to Dashboard" />
          </Link>
        </Button>
        <div className="flex items-center space-x-3">
          <MessageSquare className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-bold text-primary">
            <TranslatedText text="View Comments" />
          </h1>
        </div>
      </header>
      <main className="flex-grow">
        <section className="mb-8 p-6 bg-card/90 backdrop-blur-md rounded-xl shadow-xl">
          <h2 className="text-3xl font-semibold text-foreground mb-6">
            <TranslatedText text="User Feedback" />
          </h2>
          {loading && (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="ml-4 text-lg text-muted-foreground"><TranslatedText text="Loading comments..." /></p>
            </div>
          )}
          {error && (
            <div className="text-center py-10 text-destructive">
              <p className="text-lg"><TranslatedText text={error} /></p>
            </div>
          )}
          {!loading && !error && comments.length > 0 ? (
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="p-4 bg-background/50 rounded-lg border shadow-md">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-accent">{comment.name}</h3>
                      <p className="text-xs text-muted-foreground">{comment.email}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {typeof comment.timestamp === 'string' ? comment.timestamp : (comment.timestamp as Timestamp)?.toDate?.().toLocaleString() || 'Invalid Date'}
                    </p>
                  </div>
                  <p className="text-sm text-foreground italic">"<TranslatedText text={comment.comment || ''} />"</p>
                </div>
              ))}
            </div>
          ) : null}
          {!loading && !error && comments.length === 0 && (
            <div className="text-center py-10">
              <Image
                src="https://picsum.photos/400/300?random=emptycomments"
                data-ai-hint="empty state"
                alt="No comments yet"
                width={400}
                height={300}
                className="mx-auto rounded-lg mb-4 opacity-70"
              />
              <p className="text-muted-foreground text-lg">
                <TranslatedText text="No comments have been left yet." />
              </p>
            </div>
          )}
        </section>
      </main>
      <footer className="text-center py-6 border-t border-border">
        <Button variant="link" asChild>
          <Link href="/admin/dashboard">
            <TranslatedText text="Return to Dashboard" />
          </Link>
        </Button>
      </footer>
    </div>
  );
}