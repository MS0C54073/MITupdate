
'use client';

import Link from 'next/link';
import TranslatedText from '@/app/components/translated-text';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import Image from 'next/image';

export default function AdminCommentsPage() {
  // Placeholder data - replace with actual data fetching
  const comments = [
    { id: '1', name: 'John Doe', email: 'john@example.com', comment: 'Great portfolio!', timestamp: new Date().toLocaleString() },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', comment: 'Very informative.', timestamp: new Date(Date.now() - 3600000).toLocaleString() },
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
          {comments.length > 0 ? (
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="p-4 bg-background/50 rounded-lg border shadow-md">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-accent">{comment.name}</h3>
                      <p className="text-xs text-muted-foreground">{comment.email}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                  </div>
                  <p className="text-sm text-foreground italic">"<TranslatedText text={comment.comment} />"</p>
                </div>
              ))}
            </div>
          ) : (
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
          <Link href="/">
            <TranslatedText text="Return to Homepage" />
          </Link>
        </Button>
      </footer>
    </div>
  );
}
