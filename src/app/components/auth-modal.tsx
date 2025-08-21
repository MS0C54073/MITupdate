
'use client';

import type { FC } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TranslatedText from '@/app/components/translated-text';
import { useToast } from '@/hooks/use-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Hardcoded credentials as requested
  const ADMIN_EMAIL = "salimusonda1@gmail.com";
  const ADMIN_PASSWORD = "Lusaka@2025";

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    // This is a client-side check for the hardcoded credentials.
    // NOTE: This is not secure for a production application as the credentials
    // are exposed in the client-side code. This is implemented as requested.
    // A more secure approach is to use Firebase Auth with role-based access control.
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      try {
        // We still sign in with Firebase to get a valid session,
        // but we use the credentials provided in the prompt.
        await signInWithEmailAndPassword(auth, email, password);
        toast({ title: "Login Successful", description: "Redirecting to admin dashboard..." });
        router.push('/admin/dashboard');
        onClose();
      } catch (firebaseError: any) {
        console.error("Admin Firebase login failed: ", firebaseError);
        // This can happen if the user doesn't exist in Firebase Auth.
        setError('Admin authentication failed. Please check Firebase user records.');
        toast({ variant: 'destructive', title: 'Login Error', description: 'Could not authenticate with Firebase. Ensure the admin user exists.' });
      }
    } else {
      setError('Invalid credentials.');
    }
    setLoading(false);
  };

  const handleClose = () => {
    // Reset state on close
    setEmail('');
    setPassword('');
    setError('');
    setLoading(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] bg-card text-card-foreground">
        <DialogHeader>
          <DialogTitle>
            <TranslatedText text="Admin Login" />
          </DialogTitle>
          <DialogDescription>
            <TranslatedText text="Enter your credentials to access the admin panel." />
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              <TranslatedText text="Email" />
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="col-span-3 bg-background text-foreground"
              placeholder="admin@example.com"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              <TranslatedText text="Password" />
            </Label>
            <div className="col-span-3 relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background text-foreground pr-10"
              />
              <span
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-muted-foreground hover:text-foreground"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </span>
            </div>
          </div>
          {error && (
            <p className="col-span-4 text-sm text-destructive text-center">
              <TranslatedText text={error} />
            </p>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              <TranslatedText text="Cancel" />
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleLogin} disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            <TranslatedText text="Login" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
