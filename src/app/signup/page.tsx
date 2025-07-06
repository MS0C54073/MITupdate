
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { auth, db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import TranslatedText from '@/app/components/translated-text';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const signupSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});
type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    setLoading(true);
    try {
      // Check if any users already exist to determine if this is the first user.
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      const isFirstUser = usersSnapshot.empty;
      
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      // Create a user profile document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: data.name,
        email: data.email,
        role: isFirstUser ? 'admin' : 'user', // Assign 'admin' role if it's the first user
      });
      
      router.push('/dashboard');

    } catch (error: any) {
      console.error('Signup failed:', error);
      toast({
        variant: 'destructive',
        title: 'Sign Up Failed',
        description: error.code === 'auth/email-already-in-use' 
          ? 'This email is already registered.' 
          : error.message || 'An unexpected error occurred. Please try again.',
      });
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl"><TranslatedText text="Create an Account" /></CardTitle>
          <CardDescription><TranslatedText text="Enter your details to get started." /></CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name"><TranslatedText text="Name" /></Label>
              <Input id="name" type="text" {...register('name')} placeholder="John Doe" />
              {errors.name && <p className="text-sm text-destructive"><TranslatedText text={errors.name.message || ''} /></p>}
            </div>
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
                  <TranslatedText text="Creating Account..." />
                </>
              ) : (
                <TranslatedText text="Sign Up" />
              )}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              <TranslatedText text="Already have an account?" />{' '}
              <Link href="/login" className="font-semibold text-primary hover:underline">
                <TranslatedText text="Log in" />
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
