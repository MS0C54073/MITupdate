
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Bell, MessageSquare, ShoppingCart, Star, Loader2, ImagePlus } from 'lucide-react';
import TranslatedText from '@/app/components/translated-text';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, orderBy, limit, getCountFromServer } from 'firebase/firestore';
import type { DisplayComment, DisplayOrder, DisplayReview } from '@/lib/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SocialIcons } from '@/components/social-icons';
import AuthModal from '@/app/components/auth-modal';

export default function AdminDashboardPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  const [newCommentsCount, setNewCommentsCount] = useState(0);
  const [newOrdersCount, setNewOrdersCount] = useState(0);
  const [newReviewsCount, setNewReviewsCount] = useState(0);
  const [latestComments, setLatestComments] = useState<DisplayComment[]>([]);
  const [latestOrders, setLatestOrders] = useState<DisplayOrder[]>([]);
  const [latestReviews, setLatestReviews] = useState<DisplayReview[]>([]);
  const [loading, setLoading] = useState(true);
  
  const totalNotifications = newCommentsCount + newOrdersCount + newReviewsCount;

  const fetchData = async () => {
    setLoading(true);
    try {
      const commentsCollection = collection(db, "comments");
      const ordersCollection = collection(db, "orders");
      const reviewsCollection = collection(db, "reviews");

      const [commentsSnapshot, ordersSnapshot, reviewsSnapshot] = await Promise.all([
        getCountFromServer(commentsCollection),
        getCountFromServer(ordersCollection),
        getCountFromServer(reviewsCollection)
      ]);
      setNewCommentsCount(commentsSnapshot.data().count);
      setNewOrdersCount(ordersSnapshot.data().count);
      setNewReviewsCount(reviewsSnapshot.data().count);

    } catch (error) {
      console.error("Error fetching counts:", error);
    }
    
    const latestCommentsQuery = query(collection(db, "comments"), orderBy("timestamp", "desc"), limit(3));
    const latestCommentsUnsubscribe = onSnapshot(latestCommentsQuery, (snapshot) => {
        setLatestComments(snapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name || 'Anonymous',
            comment: doc.data().comment || 'No comment provided',
            email: '',
            timestamp: ''
        } as DisplayComment)));
    }, (error) => console.error("Error fetching latest comments:", error));

    const latestOrdersQuery = query(collection(db, "orders"), orderBy("timestamp", "desc"), limit(3));
    const latestOrdersUnsubscribe = onSnapshot(latestOrdersQuery, (snapshot) => {
        setLatestOrders(snapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name || 'N/A',
            details: doc.data().details || 'No details provided.',
            email: '', phone: '', attachmentName: null, timestamp: ''
        } as DisplayOrder)));
    }, (error) => console.error("Error fetching latest orders:", error));
    
    const latestReviewsQuery = query(collection(db, "reviews"), orderBy("timestamp", "desc"), limit(3));
    const latestReviewsUnsubscribe = onSnapshot(latestReviewsQuery, (snapshot) => {
        setLatestReviews(snapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name || 'Anonymous',
            review: doc.data().review || 'No review text.',
            rating: doc.data().rating || 0,
            timestamp: ''
        } as DisplayReview)));
        setLoading(false);
    }, (error) => {
      console.error("Error fetching latest reviews:", error);
      setLoading(false);
    });

    return () => {
      latestCommentsUnsubscribe();
      latestOrdersUnsubscribe();
      latestReviewsUnsubscribe();
    }
  };

  useEffect(() => {
    const adminLoggedIn = sessionStorage.getItem('isAdminLoggedIn');
    if (adminLoggedIn === 'true') {
      setIsLoggedIn(true);
      fetchData();
    }
    setAuthChecked(true);
  }, []);

  const handleLoginSuccess = () => {
    sessionStorage.setItem('isAdminLoggedIn', 'true');
    setIsLoggedIn(true);
    fetchData();
  };

  if (!authChecked || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }
  
  if (!isLoggedIn) {
      return (
        <AuthModal 
          isOpen={true} 
          onClose={() => router.push('/')} 
          onLoginSuccess={handleLoginSuccess}
        />
      );
  }

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
                 {loading ? (
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
              {loading ? (
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
                  {latestReviews.length > 0 && (
                    <>
                      <DropdownMenuLabel className="text-xs text-muted-foreground px-2 py-1.5"><TranslatedText text="Recent Reviews" /></DropdownMenuLabel>
                      {latestReviews.map((review) => (
                        <DropdownMenuItem key={review.id} asChild>
                          <Link href={`/admin/reviews#${review.id}`} className="cursor-pointer">
                            <div className="flex flex-col w-full">
                               <div className="flex justify-between items-center">
                                <span className="font-semibold text-sm">{review.name}</span>
                                <div className="flex items-center">
                                    {[...Array(review.rating)].map((_, i) => <Star key={i} className="h-3 w-3 text-yellow-400 fill-yellow-400"/>)}
                                    {[...Array(5 - review.rating)].map((_, i) => <Star key={i} className="h-3 w-3 text-muted-foreground"/>)}
                                </div>
                               </div>
                              <span className="text-xs text-muted-foreground truncate">
                                <TranslatedText text={review.review} />
                              </span>
                            </div>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </>
                  )}
                  {(latestReviews.length > 0 && latestComments.length > 0) && <DropdownMenuSeparator />}
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
              <TranslatedText text="Manage Site Images" />
            </CardTitle>
            <ImagePlus className="h-6 w-6 text-accent" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground mb-4">
              <TranslatedText text="Upload and manage images for different sections of the site." />
            </p>
            <Button asChild>
              <Link href="/admin/manage-images">
                <TranslatedText text="Manage Images" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="shadow-xl bg-card/90 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-semibold text-foreground">
              <TranslatedText text="Reviews" />
            </CardTitle>
            <Star className="h-6 w-6 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary" data-ai-hint="dynamic review count">
              {newReviewsCount}
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              <TranslatedText text="Total user reviews" />
            </p>
            <Button asChild>
              <Link href="/admin/reviews">
                <TranslatedText text="View Reviews" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        
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
              <TranslatedText text="Total feedback messages" />
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
              <TranslatedText text="Total client requests" />
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
        <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-muted-foreground">
            <TranslatedText text="Manage your website content and interactions." />
            </p>
            <SocialIcons className="flex space-x-4 justify-center" />
        </div>
      </footer>
    </div>
  );
}
