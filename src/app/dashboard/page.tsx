
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/auth-context';
import TranslatedText from '@/app/components/translated-text';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, MessageSquare, ShoppingCart, Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { SocialIcons } from '@/components/social-icons';

export default function UserDashboardPage() {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
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
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <TranslatedText text="Back to Home" />
            </Link>
        </Button>
        <h1 className="text-4xl font-bold text-primary">
          <TranslatedText text="My Dashboard" />
        </h1>
        <p className="text-muted-foreground mt-2">
            <TranslatedText text="Welcome back" />, {userProfile?.name}!
        </p>
      </header>

      <main className="flex-grow grid md:grid-cols-2 gap-6">
        <Card className="shadow-xl bg-card/90 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-semibold text-foreground">
              <TranslatedText text="My Comments" />
            </CardTitle>
            <MessageSquare className="h-6 w-6 text-accent" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground mb-4">
              <TranslatedText text="View and manage your comments." />
            </p>
            <Button asChild>
              <Link href="/dashboard/my-comments">
                <TranslatedText text="View My Comments" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-xl bg-card/90 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-semibold text-foreground">
              <TranslatedText text="My Orders" />
            </CardTitle>
            <ShoppingCart className="h-6 w-6 text-accent" />
          </CardHeader>
          <CardContent>
             <p className="text-xs text-muted-foreground mb-4">
              <TranslatedText text="Review your order history." />
            </p>
            <Button asChild>
              <Link href="/dashboard/my-orders">
                <TranslatedText text="View My Orders" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </main>

      <footer className="text-center py-6 mt-8 border-t border-border">
        <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-muted-foreground">
                <TranslatedText text="Manage your interactions with our site." />
            </p>
            <SocialIcons className="flex space-x-4 justify-center" />
        </div>
      </footer>
    </div>
  );
}
