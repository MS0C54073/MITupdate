
'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { useAuth } from '@/app/auth-context';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { LogOut, User, Loader2, LogIn, Shield } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import TranslatedText from './translated-text';

export default function AuthNav() {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };
  
  const getInitials = (name: string) => {
      return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  if (loading) {
    return (
      <Button variant="ghost" size="icon">
        <Loader2 className="h-5 w-5 animate-spin" />
      </Button>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center">
        <Button asChild>
          <Link href="/login">
            <LogIn className="mr-2 h-4 w-4" />
            <TranslatedText text="Login" />
          </Link>
        </Button>
      </div>
    );
  }
  
  // This logic now correctly handles both regular users and admins within the same dropdown.
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={`https://api.dicebear.com/8.x/initials/svg?seed=${userProfile?.name}`} alt={userProfile?.name || ''} />
            <AvatarFallback>{userProfile ? getInitials(userProfile.name) : 'U'}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userProfile?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{userProfile?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {userProfile?.role === 'admin' ? (
          <DropdownMenuItem asChild>
            <Link href="/admin/dashboard">
              <Shield className="mr-2 h-4 w-4" />
              <span><TranslatedText text="Admin Panel" /></span>
            </Link>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem asChild>
            <Link href="/dashboard">
              <User className="mr-2 h-4 w-4" />
              <span><TranslatedText text="My Dashboard" /></span>
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span><TranslatedText text="Log out" /></span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
