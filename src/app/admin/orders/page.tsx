
'use client';

import Link from 'next/link';
import TranslatedText from '@/app/components/translated-text';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingCart, Download } from 'lucide-react';
import Image from 'next/image';

export default function AdminOrdersPage() {
  // Placeholder data - replace with actual data fetching
  const orders = [
    { id: 'order123', name: 'Alice Wonderland', email: 'alice@example.com', phone: '555-1234', details: 'Request for web development services.', attachmentName: 'project_brief.pdf', timestamp: new Date().toLocaleString() },
    { id: 'order456', name: 'Bob The Builder', email: 'bob@example.com', phone: '555-5678', details: 'Inquiry about affiliate marketing consultation.', attachmentName: null, timestamp: new Date(Date.now() - 7200000).toLocaleString() },
  ];

  return (
    <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8 min-h-screen flex flex-col">
      <header className="mb-8">
        <Button variant="outline" asChild className="mb-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <TranslatedText text="Back to Home" />
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
          {orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="p-4 bg-background/50 rounded-lg border shadow-md">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-accent"><TranslatedText text="Order ID:" /> {order.id}</h3>
                      <p className="text-sm text-muted-foreground"><TranslatedText text="Name:" /> {order.name}</p>
                      <p className="text-sm text-muted-foreground"><TranslatedText text="Email:" /> {order.email}</p>
                      <p className="text-sm text-muted-foreground"><TranslatedText text="Phone:" /> {order.phone}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{order.timestamp}</p>
                  </div>
                  <p className="text-sm text-foreground mb-2"><span className="font-semibold"><TranslatedText text="Details:" /></span> <TranslatedText text={order.details} /></p>
                  {order.attachmentName && (
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-3 w-3" />
                      <TranslatedText text="Download Attachment" /> ({order.attachmentName})
                    </Button>
                  )}
                </div>
              ))}
            </div>
          ) : (
             <div className="text-center py-10">
              <Image
                src="https://picsum.photos/400/300?random=emptyorders"
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
          <Link href="/">
            <TranslatedText text="Return to Homepage" />
          </Link>
        </Button>
      </footer>
    </div>
  );
}
