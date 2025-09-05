
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/auth-context';
import TranslatedText from '@/app/components/translated-text';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ShoppingCart, Download, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, orderBy, query, where, Timestamp } from 'firebase/firestore';
import type { DisplayOrder } from '@/lib/types'; 

export default function MyOrdersPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [orders, setOrders] = useState<DisplayOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return; // Wait for auth state to resolve

    if (!user) {
      router.push('/login');
      return;
    }

    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const ordersCollection = collection(db, 'orders');
        const q = query(
          ordersCollection, 
          where('userId', '==', user.uid), 
          orderBy('timestamp', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const fetchedOrders = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || 'N/A',
            email: data.email || 'Not Provided',
            phone: data.phone || 'Not Provided',
            details: data.details || 'No details provided.',
            status: data.status || 'pending',
            attachmentName: data.attachmentName || null,
            attachmentUrl: data.attachmentUrl || null,
            timestamp: (data.timestamp as Timestamp)?.toDate().toLocaleString() ?? 'No date',
            userId: data.userId || null,
          };
        });
        setOrders(fetchedOrders);
      } catch (err) {
        console.error("Error fetching user orders: ", err);
        setError('Failed to load your orders. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [user, authLoading, router]);

  if (authLoading || loading || !user) {
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
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <TranslatedText text="Back to Dashboard" />
          </Link>
        </Button>
        <div className="flex items-center space-x-3">
          <ShoppingCart className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-bold text-primary">
            <TranslatedText text="My Orders" />
          </h1>
        </div>
      </header>
      <main className="flex-grow">
        <section className="mb-8 p-6 bg-card/90 backdrop-blur-md rounded-xl shadow-xl">
          <h2 className="text-3xl font-semibold text-foreground mb-6">
            <TranslatedText text="Your Order History" />
          </h2>
          {error && (
             <div className="text-center py-10 text-destructive bg-destructive/10 rounded-md p-4">
              <p className="text-lg font-semibold"><TranslatedText text="An Error Occurred" /></p>
              <p className="text-sm"><TranslatedText text={error} /></p>
            </div>
          )}
          {!loading && !error && orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="p-4 bg-background/50 rounded-lg border shadow-md">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-accent"><TranslatedText text="Order from"/> {order.name}</h3>
                      <p className="text-xs text-muted-foreground break-all">ID: {order.id}</p>
                    </div>
                     <p className="text-xs text-muted-foreground">{order.timestamp}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-foreground"><span className="font-semibold"><TranslatedText text="Details:" /></span> {order.details}</p>
                    <div className="flex items-center text-sm">
                      <span className="font-semibold mr-2"><TranslatedText text="Status:" /></span>
                      <Badge variant={order.status === 'pending' ? 'secondary' : 'default'} className="capitalize">
                        <TranslatedText text={order.status} />
                      </Badge>
                    </div>
                    {order.attachmentName && order.attachmentUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={order.attachmentUrl} target="_blank" rel="noopener noreferrer">
                          <Download className="mr-2 h-3 w-3" />
                          <TranslatedText text="Download Attachment" /> ({order.attachmentName})
                        </a>
                      </Button>
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
                <TranslatedText text="You haven't placed any orders yet." />
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
