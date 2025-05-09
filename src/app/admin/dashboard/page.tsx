
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Bell, MessageSquare, ShoppingCart } from 'lucide-react';
import TranslatedText from '@/app/components/translated-text';

export default function AdminDashboardPage() {
  // Placeholder counts - in a real app, fetch these dynamically
  const newCommentsCount = 5; // Example count
  const newOrdersCount = 2;   // Example count
  const totalNotifications = newCommentsCount + newOrdersCount;

  return (
    <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8 min-h-screen flex flex-col">
      <header className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <TranslatedText text="Back to Home" />
            </Link>
          </Button>
          <div className="relative">
            <Bell className="h-6 w-6 text-primary" />
            {totalNotifications > 0 && (
              <span 
                className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground"
                data-ai-hint="dynamic notification count"
              >
                {totalNotifications}
              </span>
            )}
          </div>
        </div>
        <h1 className="text-4xl font-bold text-primary">
          <TranslatedText text="Admin Dashboard" />
        </h1>
      </header>

      <main className="flex-grow grid md:grid-cols-2 gap-6">
        <Card className="shadow-xl bg-card/90 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-semibold text-foreground">
              <TranslatedText text="Comments" />
            </CardTitle>
            <MessageSquare className="h-6 w-6 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary" data-ai-hint="dynamic comment count">
              {newCommentsCount}
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              <TranslatedText text="New feedback messages" />
            </p>
            <Button asChild>
              <Link href="/admin/comments">
                <TranslatedText text="View Comments" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-xl bg-card/90 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-semibold text-foreground">
              <TranslatedText text="Orders" />
            </CardTitle>
            <ShoppingCart className="h-6 w-6 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary" data-ai-hint="dynamic order count">
              {newOrdersCount}
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              <TranslatedText text="New client requests" />
            </p>
            <Button asChild>
              <Link href="/admin/orders">
                <TranslatedText text="View Orders" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </main>

      <footer className="text-center py-6 mt-8 border-t border-border">
        <p className="text-sm text-muted-foreground">
          <TranslatedText text="Manage your website content and interactions." />
        </p>
      </footer>
    </div>
  );
}
