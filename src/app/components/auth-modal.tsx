'use client';

import type { FC } from 'react';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
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

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const AuthModal: FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (username === 'Muzo' && password === '987456123') {
      setError('');
      onLoginSuccess();
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
            <Label htmlFor="username" className="text-right">
              <TranslatedText text="Username" />
            </Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="col-span-3 bg-background text-foreground"
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
          <Button type="button" onClick={handleLogin}>
            <TranslatedText text="Login" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
