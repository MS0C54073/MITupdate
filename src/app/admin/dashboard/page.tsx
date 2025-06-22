'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Bell, MessageSquare, ShoppingCart, Loader2 } from 'lucide-react';
import TranslatedText from '@/app/components/translated-text';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import type { DisplayComment, DisplayOrder } from '@/lib/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function AdminDashboardPage() {
  const [newCommentsCount, setNewCommentsCount] = useState(0);
  const [newOrdersCount, setNewOrdersCount] = useState(0);
  const [latestComments, setLatestComments] = useState<DisplayComment[]>([]);
  const [latestOrders, setLatestOrders] = useState<DisplayOrder[]>([]);
  const [loadingCounts, setLoadingCounts] = useState(true);
  
  const totalNotifications = newCommentsCount + newOrdersCount;

  useEffect(() => {
    let initialCommentsLoaded = false;
    let initialOrdersLoaded = false;
    let initialLatestCommentsLoaded = false;
    let initialLatestOrdersLoaded = false;

    const checkAllLoaded = () => {
        if (initialCommentsLoaded && initialOrdersLoaded && initialLatestCommentsLoaded && initialLatestOrdersLoaded) {
            setLoadingCounts(false);
        }
    }

    const commentsUnsubscribe = onSnapshot(collection(db, "comments"), (snapshot) => {
      setNewCommentsCount(snapshot.size);
      if (!initialCommentsLoaded) { initialCommentsLoaded = true; checkAllLoaded(); }
    }, (error) => {
      console.error("Error fetching comments count:", error);
      if (!initialCommentsLoaded) { initialCommentsLoaded = true; checkAllLoaded(); }
    });

    const ordersUnsubscribe = onSnapshot(collection(db, "orders"), (snapshot) => {
      setNewOrdersCount(snapshot.size);
      if (!initialOrdersLoaded) { initialOrdersLoaded = true; checkAllLoaded(); }
    }, (error) => {
      console.error("Error fetching orders count:", error);
      if (!initialOrdersLoaded) { initialOrdersLoaded = true; checkAllLoaded(); }
    });

    const latestCommentsUnsubscribe = onSnapshot(query(collection(db, "comments"), orderBy("timestamp", "desc"), limit(5)), (snapshot) => {
        setLatestComments(snapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name || 'Anonymous',
            comment: doc.data().comment || 'No comment provided',
            email: '', // not needed
            timestamp: '' // not needed
        } as DisplayComment)));
        if (!initialLatestCommentsLoaded) { initialLatestCommentsLoaded = true; checkAllLoaded(); }
    }, (error) => {
      console.error("Error fetching latest comments:", error);
      if (!initialLatestCommentsLoaded) { initialLatestCommentsLoaded = true; checkAllLoaded(); }
    });

    const latestOrdersUnsubscribe = onSnapshot(query(collection(db, "orders"), orderBy("timestamp", "desc"), limit(5)), (snapshot) => {
        setLatestOrders(snapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name || 'N/A',
            details: doc.data().details || 'No details provided.',
            email: '', phone: '', attachmentName: null, timestamp: ''
        } as DisplayOrder)));
        if (!initialLatestOrdersLoaded) { initialLatestOrdersLoaded = true; checkAllLoaded(); }
    }, (error) => {
        console.error("Error fetching latest orders:", error);
        if (!initialLatestOrdersLoaded) { initialLatestOrdersLoaded = true; checkAllLoaded(); }
    });

    return () => {
      commentsUnsubscribe();
      ordersUnsubscribe();
      latestCommentsUnsubscribe();
      latestOrdersUnsubscribe();
    }
  }, []);


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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-6 w-6 text-primary" />
                 {loadingCounts ? (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
                    <Loader2 className="h-2 w-2 animate-spin" />
                  </span>
                 ) : totalNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground" data-ai-hint="dynamic notification count">
                    {totalNotifications}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>
                <TranslatedText text="Notifications" />
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {loadingCounts ? (
                <div className="p-2 text-center text-sm text-muted-foreground flex items-center justify-center">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  <TranslatedText text="Loading..."/>
                </div>
              ) : totalNotifications === 0 ? (
                <p className="p-2 text-center text-sm text-muted-foreground">
                  <TranslatedText text="No new notifications" />
                </p>
              ) : (
                <>
                  {latestComments.length > 0 && (
                    <>
                      <DropdownMenuLabel className="text-xs text-muted-foreground px-2 py-1.5"><TranslatedText text="Recent Comments" /></DropdownMenuLabel>
                      {latestComments.map((comment) => (
                        <DropdownMenuItem key={comment.id} asChild>
                          <Link href={`/admin/comments#${comment.id}`} className="cursor-pointer">
                            <div className="flex flex-col w-full">
                              <span className="font-semibold text-sm">{comment.name}</span>
                              <span className="text-xs text-muted-foreground truncate">
                                <TranslatedText text={comment.comment} />
                              </span>
                            </div>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </>
                  )}
                   {(latestComments.length > 0 && latestOrders.length > 0) && <DropdownMenuSeparator />}
                  {latestOrders.length > 0 && (
                    <>
                      <DropdownMenuLabel className="text-xs text-muted-foreground px-2 py-1.5"><TranslatedText text="Recent Orders" /></DropdownMenuLabel>
                      {latestOrders.map((order) => (
                        <DropdownMenuItem key={order.id} asChild>
                          <Link href={`/admin/orders#${order.id}`} className="cursor-pointer">
                            <div className="flex flex-col w-full">
                              <span className="font-semibold text-sm">{order.name}</span>
                              <span className="text-xs text-muted-foreground truncate">
                                <TranslatedText text={order.details} />
                              </span>
                            </div>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </>
                  )}
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
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
            {loadingCounts ? (
              <Loader2 className="h-8 w-8 animate-spin text-primary my-1" />
            ) : (
              <div className="text-3xl font-bold text-primary" data-ai-hint="dynamic comment count">
                {newCommentsCount}
              </div>
            )}
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
             {loadingCounts ? (
              <Loader2 className="h-8 w-8 animate-spin text-primary my-1" />
            ) : (
              <div className="text-3xl font-bold text-primary" data-ai-hint="dynamic order count">
                {newOrdersCount}
              </div>
            )}
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
