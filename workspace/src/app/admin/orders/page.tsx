
'use client';

import Link from 'next/link';
import TranslatedText from '@/app/components/translated-text';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ShoppingCart, Download, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, orderBy, query, Timestamp, limit, startAfter, type QueryDocumentSnapshot, type DocumentData } from 'firebase/firestore';
import type { DisplayOrder } from '@/lib/types'; 
import { SocialIcons } from '@/components/social-icons';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<DisplayOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const ordersPerPage = 15;

  const mapDocToOrder = (doc: QueryDocumentSnapshot<DocumentData>): DisplayOrder => {
    const data = doc.data();
    let formattedTimestamp = 'Pending...';

    if (data.timestamp && typeof (data.timestamp as Timestamp).toDate === 'function') {
      formattedTimestamp = (data.timestamp as Timestamp).toDate().toLocaleString();
    }

    return {
      id: doc.id,
      name: data.name || 'N/A',
      email: data.email || 'Not Provided',
      phone: data.phone || 'Not Provided',
      details: data.details || 'No details provided.',
      status: data.status || 'pending',
      attachmentName: data.attachmentName || null,
      attachmentUrl: data.attachmentUrl || null,
      timestamp: formattedTimestamp,
    };
  };

  const fetchOrders = async (isInitial = true) => {
    if (!hasMore && !isInitial) return;
    if(isInitial) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    setError(null);
    
    try {
      const ordersCollection = collection(db, 'orders');
      let q;
      if (isInitial) {
        q = query(ordersCollection, orderBy('timestamp', 'desc'), limit(ordersPerPage));
      } else if (lastVisible) {
        q = query(ordersCollection, orderBy('timestamp', 'desc'), startAfter(lastVisible), limit(ordersPerPage));
      } else {
        if(isInitial) setLoading(false); else setLoadingMore(false);
        return;
      }
      
      const documentSnapshots = await getDocs(q);
      
      const fetchedOrders = documentSnapshots.docs.map(mapDocToOrder);

      if (isInitial) {
        setOrders(fetchedOrders);
      } else {
        setOrders(prevOrders => [...prevOrders, ...fetchedOrders]);
      }
      
      const lastDoc = documentSnapshots.docs[documentSnapshots.docs.length - 1];
      setLastVisible(lastDoc);

      if (documentSnapshots.docs.length < ordersPerPage) {
        setHasMore(false);
      }

    } catch (err) {
      console.error("Error fetching orders: ", err);
      setError('Failed to load orders. Please try again.');
    } finally {
      if(isInitial) setLoading(false); else setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchOrders(true);
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
          <ShoppingCart className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-bold text-primary">
            <TranslatedText text="View Orders" />
          </h1>
        </div>
      </header>
      <main className="flex-grow">
        <section className="mb-8 p-6 bg-card/90 backdrop-blur-md rounded-xl shadow-xl">
          <h2 className="text-3xl font-semibold text-foreground mb-6">
            <TranslatedText text="Client Requests" />
          </h2>
          {loading && (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="ml-4 text-lg text-muted-foreground"><TranslatedText text="Loading orders..." /></p>
            </div>
          )}
          {error && (
             <div className="text-center py-10 text-destructive bg-destructive/10 rounded-md p-4">
              <p className="text-lg font-semibold"><TranslatedText text="An Error Occurred" /></p>
              <p className="text-sm"><TranslatedText text={error} /></p>
            </div>
          )}
          {!loading && !error && orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order) => (
                <div id={order.id} key={order.id} className="p-4 bg-background/50 rounded-lg border shadow-md scroll-mt-20 target:ring-2 target:ring-primary transition-all duration-300">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-accent"><TranslatedText text="Order from" /> {order.name}</h3>
                      <p className="text-xs text-muted-foreground break-all">ID: {order.id}</p>
                      <p className="text-sm text-muted-foreground"><TranslatedText text="Email:" /> {order.email}</p>
                      <p className="text-sm text-muted-foreground"><TranslatedText text="Phone:" /> {order.phone}</p>
                    </div>
                     <p className="text-xs text-muted-foreground">
                       {order.timestamp}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-foreground"><span className="font-semibold"><TranslatedText text="Details:" /></span> <TranslatedText text={order.details} /></p>
                    <div className="flex items-center text-sm">
                      <span className="font-semibold mr-2"><TranslatedText text="Status:" /></span>
                      <Badge variant={order.status === 'pending' ? 'secondary' : 'default'} className="capitalize">
                        <TranslatedText text={order.status} />
                      </Badge>
                    </div>
                    {order.attachmentName && (
                      order.attachmentUrl ? (
                        <Button variant="outline" size="sm" asChild>
                          <a href={order.attachmentUrl} target="_blank" rel="noopener noreferrer">
                            <Download className="mr-2 h-3 w-3" />
                            <TranslatedText text="Download Attachment" /> ({order.attachmentName})
                          </a>
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" disabled>
                          <Download className="mr-2 h-3 w-3" />
                          <TranslatedText text="Download Attachment" /> ({order.attachmentName})
                        </Button>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
          {!loading && !error && orders.length === 0 && (
             <div className="text-center py-10">
              <Image
                src="https://placehold.co/400x300.png"
                alt="No orders yet"
                width={400}
                height={300}
                data-ai-hint="empty state"
                className="mx-auto rounded-lg mb-4 opacity-70"
              />
              <p className="text-muted-foreground text-lg">
                <TranslatedText text="No orders have been placed yet." />
              </p>
            </div>
          )}
          {!loading && hasMore && (
            <div className="mt-8 text-center">
              <Button onClick={() => fetchOrders(false)} disabled={loadingMore}>
                {loadingMore ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <TranslatedText text="Loading..." />
                  </>
                ) : (
                  <TranslatedText text="Load More Orders" />
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
