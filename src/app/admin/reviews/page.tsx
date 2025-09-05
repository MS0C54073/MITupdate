
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import TranslatedText from '@/app/components/translated-text';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, orderBy, query, Timestamp, limit, startAfter, type QueryDocumentSnapshot, type DocumentData } from 'firebase/firestore';
import type { DisplayReview } from '@/lib/types';
import { useAuth } from '@/app/auth-context';

export default function AdminReviewsPage() {
  const { user, userProfile, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [reviews, setReviews] = useState<DisplayReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reviewsPerPage = 15;

  useEffect(() => {
    if (!authLoading) {
      if (!user || userProfile?.role !== 'admin') {
        router.push('/'); // Redirect non-admins to home
      } else {
        fetchReviews(true);
      }
    }
  }, [user, userProfile, authLoading, router]);

  const mapDocToReview = (doc: QueryDocumentSnapshot<DocumentData>): DisplayReview => {
    const data = doc.data();
    let formattedTimestamp = 'Pending...';
    
    if (data.timestamp && typeof (data.timestamp as Timestamp).toDate === 'function') {
      formattedTimestamp = (data.timestamp as Timestamp).toDate().toLocaleString();
    }
    
    return {
      id: doc.id,
      name: data.name || 'Anonymous',
      review: data.review || 'No review text provided',
      rating: data.rating || 0,
      timestamp: formattedTimestamp,
    };
  };

  const fetchReviews = async (isInitial = true) => {
    if (!hasMore && !isInitial) return;
    if(isInitial) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    setError(null);
    
    try {
      const reviewsCollection = collection(db, 'reviews');
      let q;
      if (isInitial) {
        q = query(reviewsCollection, orderBy('timestamp', 'desc'), limit(reviewsPerPage));
      } else if (lastVisible) {
        q = query(reviewsCollection, orderBy('timestamp', 'desc'), startAfter(lastVisible), limit(reviewsPerPage));
      } else {
        if(isInitial) setLoading(false); else setLoadingMore(false);
        return;
      }
      
      const documentSnapshots = await getDocs(q);
      const fetchedReviews = documentSnapshots.docs.map(mapDocToReview);

      if (isInitial) {
        setReviews(fetchedReviews);
      } else {
        setReviews(prevReviews => [...prevReviews, ...fetchedReviews]);
      }
      
      const lastDoc = documentSnapshots.docs[documentSnapshots.docs.length - 1];
      setLastVisible(lastDoc);

      if (documentSnapshots.docs.length < reviewsPerPage) {
        setHasMore(false);
      }

    } catch (err) {
      console.error("Error fetching reviews: ", err);
      setError('Failed to load reviews. Please try again.');
    } finally {
      if(isInitial) setLoading(false); else setLoadingMore(false);
    }
  };

  if (authLoading || (loading && !reviews.length) || !user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

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
          <Star className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-bold text-primary">
            <TranslatedText text="View Reviews" />
          </h1>
        </div>
      </header>
      <main className="flex-grow">
        <section className="mb-8 p-6 bg-card/90 backdrop-blur-md rounded-xl shadow-xl">
          <h2 className="text-3xl font-semibold text-foreground mb-6">
            <TranslatedText text="User Reviews" />
          </h2>
          {loading && reviews.length === 0 && (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="ml-4 text-lg text-muted-foreground"><TranslatedText text="Loading reviews..." /></p>
            </div>
          )}
          {error && (
            <div className="text-center py-10 text-destructive bg-destructive/10 rounded-md p-4">
              <p className="text-lg font-semibold"><TranslatedText text="An Error Occurred" /></p>
              <p className="text-sm"><TranslatedText text={error} /></p>
            </div>
          )}
          {!loading && !error && reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div id={review.id} key={review.id} className="p-4 bg-background/50 rounded-lg border shadow-md scroll-mt-20 target:ring-2 target:ring-primary transition-all duration-300">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-accent">{review.name}</h3>
                      <div className="flex items-center mt-1">
                          {[...Array(review.rating)].map((_, i) => <Star key={`filled-${i}`} className="h-4 w-4 text-yellow-400 fill-yellow-400"/>)}
                          {[...Array(5 - review.rating)].map((_, i) => <Star key={`empty-${i}`} className="h-4 w-4 text-muted-foreground/50"/>)}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {review.timestamp}
                    </p>
                  </div>
                  <p className="text-sm text-foreground italic">"{review.review}"</p>
                </div>
              ))}
            </div>
          ) : null}
          {!loading && !error && reviews.length === 0 && (
            <div className="text-center py-10">
              <Image
                src="https://placehold.co/400x300.png"
                alt="No reviews yet"
                width={400}
                height={300}
                data-ai-hint="empty state"
                className="mx-auto rounded-lg mb-4 opacity-70"
              />
              <p className="text-muted-foreground text-lg">
                <TranslatedText text="No reviews have been left yet." />
              </p>
            </div>
          )}
           {!loading && hasMore && (
            <div className="mt-8 text-center">
              <Button onClick={() => fetchReviews(false)} disabled={loadingMore}>
                {loadingMore ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <TranslatedText text="Loading..." />
                  </>
                ) : (
                  <TranslatedText text="Load More Reviews" />
                )}
              </Button>
            </div>
          )}
        </section>
      </main>
      <footer className="text-center py-6 border-t border-border">
        <div className="flex flex-col items-center gap-4">
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
