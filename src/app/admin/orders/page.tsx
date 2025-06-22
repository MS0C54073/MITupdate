'use client';

import Link from 'next/link';
import TranslatedText from '@/app/components/translated-text';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingCart, Download, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, orderBy, query, Timestamp } from 'firebase/firestore';
import type { DisplayOrder } from '@/lib/types'; 

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<DisplayOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    try {
      const ordersCollection = collection(db, 'orders');
      const q = query(ordersCollection, orderBy('timestamp', 'desc'));
      
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedOrders = querySnapshot.docs.map((doc) => {
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
            attachmentName: data.attachmentName || null,
            timestamp: formattedTimestamp,
          } as DisplayOrder; 
        });
        setOrders(fetchedOrders);
        setLoading(false);
      }, (err) => {
        console.error("Error with snapshot listener: ", err);
        setError('Failed to load orders in real-time. Please check console for errors and ensure you have the correct Firestore security rules and indexes.');
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
        console.error("Error setting up snapshot listener: ", err);
        setError('Failed to initialize orders listener.');
        setLoading(false);
    }
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
                      <h3 className="text-lg font-semibold text-accent"><TranslatedText text="Order ID:" /> {order.id.substring(0, 8)}...</h3>
                      <p className="text-sm text-muted-foreground"><TranslatedText text="Name:" /> {order.name}</p>
                      <p className="text-sm text-muted-foreground"><TranslatedText text="Email:" /> {order.email}</p>
                      <p className="text-sm text-muted-foreground"><TranslatedText text="Phone:" /> {order.phone}</p>
                    </div>
                     <p className="text-xs text-muted-foreground">
                       {order.timestamp}
                    </p>
                  </div>
                  <p className="text-sm text-foreground mb-2"><span className="font-semibold"><TranslatedText text="Details:" /></span> <TranslatedText text={order.details} /></p>
                  {order.attachmentName && (
                    <Button variant="outline" size="sm" disabled> {/* Download functionality not implemented */}
                      <Download className="mr-2 h-3 w-3" />
                      <TranslatedText text="Download Attachment" /> ({order.attachmentName})
                    </Button>
                  )}
                </div>
              ))}
            </div>
          ) : null}
          {!loading && !error && orders.length === 0 && (
             <div className="text-center py-10">
              <Image
                src="https://placehold.co/400x300.png"
                data-ai-hint="empty box"
                alt="No orders yet"
                width={400}
                height={300}
                className="mx-auto rounded-lg mb-4 opacity-70"
              />
              <p className="text-muted-foreground text-lg">
                <TranslatedText text="No orders have been placed yet." />
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
