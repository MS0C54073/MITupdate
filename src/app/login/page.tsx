
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import TranslatedText from '@/app/components/translated-text';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});
type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      router.push('/admin/dashboard');
    } catch (error: any) {
      console.error('Login failed:', error);
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: error.message || 'An unexpected error occurred. Please try again.',
      });
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl"><TranslatedText text="Welcome Back!" /></CardTitle>
          <CardDescription><TranslatedText text="Please enter your details to log in." /></CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email"><TranslatedText text="Email" /></Label>
              <Input id="email" type="email" {...register('email')} placeholder="m@example.com" />
              {errors.email && <p className="text-sm text-destructive"><TranslatedText text={errors.email.message || ''} /></p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password"><TranslatedText text="Password" /></Label>
              <Input id="password" type="password" {...register('password')} />
              {errors.password && <p className="text-sm text-destructive"><TranslatedText text={errors.password.message || ''} /></p>}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <TranslatedText text="Logging in..." />
                </>
              ) : (
                <TranslatedText text="Login" />
              )}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              <TranslatedText text="Don't have an account?" />{' '}
              <Link href="/signup" className="font-semibold text-primary hover:underline">
                <TranslatedText text="Sign up" />
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
