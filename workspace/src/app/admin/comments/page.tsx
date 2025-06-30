
'use client';

import Link from 'next/link';
import TranslatedText from '@/app/components/translated-text';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageSquare, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, orderBy, query, Timestamp, limit, startAfter, type QueryDocumentSnapshot, type DocumentData } from 'firebase/firestore';
import type { DisplayComment } from '@/lib/types'; 
import { SocialIcons } from '@/components/social-icons';

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<DisplayComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const commentsPerPage = 15;

  const mapDocToComment = (doc: QueryDocumentSnapshot<DocumentData>): DisplayComment => {
    const data = doc.data();
    let formattedTimestamp = 'Pending...';
    
    if (data.timestamp && typeof (data.timestamp as Timestamp).toDate === 'function') {
      formattedTimestamp = (data.timestamp as Timestamp).toDate().toLocaleString();
    }
    
    return {
      id: doc.id,
      name: data.name || 'Anonymous',
      email: data.email || 'Not Provided',
      comment: data.comment || 'No comment provided',
      timestamp: formattedTimestamp,
    };
  };

  const fetchComments = async (isInitial = true) => {
    if (!hasMore && !isInitial) return;
    if(isInitial) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    setError(null);
    
    try {
      const commentsCollection = collection(db, 'comments');
      let q;
      if (isInitial) {
        q = query(commentsCollection, orderBy('timestamp', 'desc'), limit(commentsPerPage));
      } else if (lastVisible) {
        q = query(commentsCollection, orderBy('timestamp', 'desc'), startAfter(lastVisible), limit(commentsPerPage));
      } else {
        // Should not happen if hasMore is true
        if(isInitial) setLoading(false); else setLoadingMore(false);
        return;
      }
      
      const documentSnapshots = await getDocs(q);
      
      const fetchedComments = documentSnapshots.docs.map(mapDocToComment);

      if (isInitial) {
        setComments(fetchedComments);
      } else {
        setComments(prevComments => [...prevComments, ...fetchedComments]);
      }
      
      const lastDoc = documentSnapshots.docs[documentSnapshots.docs.length - 1];
      setLastVisible(lastDoc);

      if (documentSnapshots.docs.length < commentsPerPage) {
        setHasMore(false);
      }

    } catch (err) {
      console.error("Error fetching comments: ", err);
      setError('Failed to load comments. Please try again.');
    } finally {
      if(isInitial) setLoading(false); else setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchComments(true);
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
            <div className="text-center py-10 text-destructive bg-destructive/10 rounded-md p-4">
              <p className="text-lg font-semibold"><TranslatedText text="An Error Occurred" /></p>
              <p className="text-sm"><TranslatedText text={error} /></p>
            </div>
          )}
          {!loading && !error && comments.length > 0 ? (
            <div className="space-y-6">
              {comments.map((comment) => (
                <div id={comment.id} key={comment.id} className="p-4 bg-background/50 rounded-lg border shadow-md scroll-mt-20 target:ring-2 target:ring-primary transition-all duration-300">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-accent">{comment.name}</h3>
                      <p className="text-xs text-muted-foreground">ID: {comment.id}</p>
                      <p className="text-xs text-muted-foreground">{comment.email}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {comment.timestamp}
                    </p>
                  </div>
                  <p className="text-sm text-foreground italic">"<TranslatedText text={comment.comment} />"</p>
                </div>
              ))}
            </div>
          ) : null}
          {!loading && !error && comments.length === 0 && (
            <div className="text-center py-10">
              <Image
                src="https://placehold.co/400x300.png"
                alt="No comments yet"
                width={400}
                height={300}
                data-ai-hint="empty state"
                className="mx-auto rounded-lg mb-4 opacity-70"
              />
              <p className="text-muted-foreground text-lg">
                <TranslatedText text="No comments have been left yet." />
              </p>
            </div>
          )}
           {!loading && hasMore && (
            <div className="mt-8 text-center">
              <Button onClick={() => fetchComments(false)} disabled={loadingMore}>
                {loadingMore ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <TranslatedText text="Loading..." />
                  </>
                ) : (
                  <TranslatedText text="Load More Comments" />
                )}
              </Button>
            </div>
          )}
        </section>
      </main>
      <footer className="text-center py-6 border-t border-border">
        <div className="flex flex-col items-center gap-4">
            <SocialIcons className="flex space-x-4 justify-center" />
            <Button variant="link" asChild>
            <Link href="/admin/dashboard">
                <TranslatedText text="Return to Dashboard" />
            </Link>
            </Button>
        </div>
      </footer>
    </div>
  );
}
