'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Github, Linkedin, Youtube, Loader2, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// Custom Icons
import { WhatsappIcon, TelegramIcon, MuzoInTechLogo } from '@/components/icons';
import './ai.css';
import TranslatedText from '@/app/components/translated-text';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import AuthModal from '@/app/components/auth-modal';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import type { Comment, Order } from '@/lib/types';


const commentSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }).optional().or(z.literal('')),
  comment: z.string().optional(),
});
type CommentFormData = z.infer<typeof commentSchema>;

const orderSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }).optional().or(z.literal('')),
  phone: z.string().optional(),
  details: z.string().optional(),
  attachment: z.any().optional(), 
});
type OrderFormData = z.infer<typeof orderSchema>;


export default function Home() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { toast } = useToast();

  const [commentStatus, setCommentStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [orderStatus, setOrderStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const { register: registerComment, handleSubmit: handleSubmitComment, reset: resetCommentForm, formState: { errors: commentErrors } } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    defaultValues: { 
      email: '',
      comment: '',
    }
  });

  const { register: registerOrder, handleSubmit: handleSubmitOrder, reset: resetOrderForm, formState: { errors: orderErrors } } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: { 
      email: '',
      phone: '',
      details: '',
    }
  });


  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleAdminLoginSuccess = () => {
    setIsAuthModalOpen(false);
    router.push('/admin/dashboard');
  };

  const onCommentSubmit: SubmitHandler<CommentFormData> = async (data) => {
    setCommentStatus('submitting');
    try {
      const commentPayload: Omit<Comment, 'id'> = {
        name: data.name,
        email: data.email || '', 
        comment: data.comment || '', 
        timestamp: serverTimestamp(),
      };
      await addDoc(collection(db, 'comments'), commentPayload);
      toast({ variant: 'success', title: 'Success!', description: 'Comment submitted successfully! Muzo will get back to you!' });
      setCommentStatus('success');
      resetCommentForm(); 
      setTimeout(() => setCommentStatus('idle'), 3000);
    } catch (error) {
      console.error("Error submitting comment: ", error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to submit comment. Please try again.'});
      setCommentStatus('error');
      setTimeout(() => setCommentStatus('idle'), 3000);
    }
  };

  const onOrderSubmit: SubmitHandler<OrderFormData> = async (data) => {
    setOrderStatus('submitting');
    try {
      const file = data.attachment && data.attachment.length > 0 ? data.attachment[0] : null;
      const attachmentName = file ? (file as File).name : null;
      
      const orderPayload: Omit<Order, 'id'> = {
        name: data.name,
        email: data.email || '', 
        phone: data.phone || '', 
        details: data.details || '', 
        attachmentName: attachmentName, 
        timestamp: serverTimestamp(),
      };
      await addDoc(collection(db, 'orders'), orderPayload);
      toast({ variant: 'success', title: 'Success!', description: 'Order submitted successfully! Muzo will get back to you!' });
      setOrderStatus('success');
      resetOrderForm(); 
      setTimeout(() => setOrderStatus('idle'), 3000);
    } catch (error) {
      console.error("Error submitting order: ", error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to submit order. Please try again.'});
      setOrderStatus('error');
      setTimeout(() => setOrderStatus('idle'), 3000);
    }
  };


  return (
    <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
      {isClient && (
        <div className="ai-background">
          <div className="neural-nodes">
            {[...Array(10)].map((_, i) => (
              <div
                key={`node-${i}`}
                className="node"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
          <div className="data-stream">
            {[...Array(30)].map((_, i) => (
              <div
                key={`particle-${i}`}
                className="particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${2 + Math.random() * 3}s`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>
          <div className="circuit-traces">
            {[...Array(5)].map((_, i) => (
              <div
                key={`trace-${i}`}
                className="trace"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 200}px`,
                  height: '2px',
                  transform: `rotate(${Math.random() * 360}deg)`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}
      <section className="mb-12 relative z-10">
        <div className="flex flex-col items-center text-center md:flex-row md:text-left gap-8 p-6 bg-card/80 backdrop-blur-sm rounded-xl shadow-xl">
          <Image
            src="https://picsum.photos/200/200"
            data-ai-hint="professional portrait"
            alt="Muzo's Profile Picture"
            width={200}
            height={200}
            className="rounded-full shadow-lg border-4 border-primary"
          />
          <div className="text-center md:text-left flex-grow">
            <div className="flex items-center gap-4 justify-center md:justify-start mb-2">
              <MuzoInTechLogo className="h-16 w-16" />
              <div>
                <h1 className="text-3xl font-bold text-primary"><TranslatedText text="Musonda Salimu (Muzo)"/></h1>
                <p className="text-lg font-semibold text-accent"><TranslatedText text="MuzoInTech (MIT)"/></p>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-4">
              <TranslatedText text="Tech Enthusiast, English Teacher, Affiliate Marketer, and Music Lover"/>
            </p>
            <p className="text-foreground">
              <TranslatedText text="Passionate about leveraging technology for education and creating engaging content."/>
              {' '}
              <TranslatedText text="Exploring the intersections of tech, teaching, marketing, and music."/>
            </p>
            <div className="mt-4 flex space-x-4 justify-center md:justify-start">
              <a
                href="https://www.linkedin.com/in/musonda-salimu-a4a0b31b9/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-highlight transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6"/>
              </a>
              <a
                href="https://github.com/MS0C54073"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-highlight transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6"/>
              </a>
              <a
                href="https://www.youtube.com/@musondasalimu2986"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-highlight transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-6 w-6"/>
              </a>
              <a
                href="https://wa.me/79014213578"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-highlight transition-colors"
                aria-label="Whatsapp"
              >
                <WhatsappIcon className="h-6 w-6"/>
              </a>
              <a
                href="https://t.me/MuzoSalim"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-highlight transition-colors"
                aria-label="Telegram"
              >
                <TelegramIcon className="h-6 w-6"/>
              </a>
            </div>
          </div>
          <Button variant="outline" onClick={() => setIsAuthModalOpen(true)} className="self-start md:self-center mt-4 md:mt-0">
            <TranslatedText text="Admin" />
          </Button>
        </div>
      </section>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
      />

      <section  className="relative z-10">
        <h2 className="text-2xl font-semibold mb-6 text-primary text-center"><TranslatedText text="Portfolio Showcase"/></h2>
        <div className="portfolio-rotation">
          <Link href="/mit-services" passHref legacyBehavior>
            <a className="portfolio-item block bg-card/80 backdrop-blur-sm rounded-lg border shadow-md p-4 hover:shadow-xl hover:animate-shake transition-all duration-300 cursor-pointer">
              <Image
                src="https://picsum.photos/seed/tech/600/400"
                data-ai-hint="tech service"
                alt="MIT Services"
                width={600}
                height={400}
                className="rounded-md mb-2 w-full h-auto object-cover"
              />
              <h3 className="text-xl font-semibold text-foreground mb-2"><TranslatedText text="MIT Services"/></h3>
              <p className="text-muted-foreground">
                <TranslatedText text="Brief description of the tech project. Mention technologies used and outcomes."/>
              </p>
              <div
                className="inline-block mt-4 px-4 py-2 bg-accent text-primary-foreground rounded-md hover:bg-accent/90 transition-colors"
              >
                <TranslatedText text="Learn More"/>
              </div>
            </a>
          </Link>

          <Link href="/teaching-experience" passHref legacyBehavior>
            <a className="portfolio-item block bg-card/80 backdrop-blur-sm rounded-lg border shadow-md p-4 hover:shadow-xl hover:animate-shake transition-all duration-300 cursor-pointer">
              <Image
                src="https://picsum.photos/seed/education/600/400"
                data-ai-hint="online learning"
                alt="Teaching Experience"
                width={600}
                height={400}
                className="rounded-md mb-2 w-full h-auto object-cover"
              />
              <h3 className="text-xl font-semibold text-foreground mb-2"><TranslatedText text="Teaching Experience"/></h3>
              <p className="text-muted-foreground">
                <TranslatedText text="Brief description of the teaching experience. Highlight subjects taught and achievements."/>
              </p>
              <div
                className="inline-block mt-4 px-4 py-2 bg-accent text-primary-foreground rounded-md hover:bg-accent/90 transition-colors"
              >
                <TranslatedText text="Learn More"/>
              </div>
            </a>
          </Link>

          <Link href="/affiliate-marketing-manager" passHref legacyBehavior>
            <a className="portfolio-item block bg-card/80 backdrop-blur-sm rounded-lg border shadow-md p-4 hover:shadow-xl hover:animate-shake transition-all duration-300 cursor-pointer">
              <Image
                src="https://picsum.photos/seed/marketing/600/400"
                data-ai-hint="digital marketing"
                alt="Affiliate Marketing Project"
                width={600}
                height={400}
                className="rounded-md mb-2 w-full h-auto object-cover"
              />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                <TranslatedText text="Affiliate Marketing Manager"/>
              </h3>
              <p className="text-muted-foreground">
                <TranslatedText text="Brief description of the affiliate marketing project. Include strategies and results."/>
              </p>
              <div
                className="inline-block mt-4 px-4 py-2 bg-accent text-primary-foreground rounded-md hover:bg-accent/90 transition-colors"
              >
                <TranslatedText text="Learn More"/>
              </div>
            </a>
          </Link>

          <Link href="/hobbies" passHref legacyBehavior>
            <a className="portfolio-item block bg-card/80 backdrop-blur-sm rounded-lg border shadow-md p-4 hover:shadow-xl hover:animate-shake transition-all duration-300 cursor-pointer">
              <Image
                src="https://picsum.photos/seed/hobby/600/400"
                data-ai-hint="creative hobby"
                alt="Hobbies"
                width={600}
                height={400}
                className="rounded-md mb-2 w-full h-auto object-cover"
              />
              <h3 className="text-xl font-semibold text-foreground mb-2"><TranslatedText text="Hobbies"/></h3>
              <p className="text-muted-foreground"><TranslatedText text="Brief description of the music track or project."/></p>
              <div
                className="inline-block mt-4 px-4 py-2 bg-accent text-primary-foreground rounded-md hover:bg-accent/90 transition-colors"
              >
                <TranslatedText text="Explore More"/>
              </div>
            </a>
          </Link>
        </div>
      </section>

       <section className="mt-12 py-8 border-t border-border relative z-10">
        <h2 className="text-2xl font-semibold mb-6 text-primary text-center"><TranslatedText text="Leave a comment"/></h2>
       <Button variant="link" asChild>
          <Link href="/admin/comments">
            <TranslatedText text="View Comments" />
          </Link>
        </Button>
         <div className="max-w-xl mx-auto p-6 bg-card/80 backdrop-blur-sm rounded-xl shadow-xl">
         <form onSubmit={handleSubmitComment(onCommentSubmit)}>
            <div className="mb-4">
              <Label htmlFor="comment-name" className="block text-foreground text-sm font-bold mb-2"><TranslatedText text="Name:"/></Label>
              <Input type="text" id="comment-name" {...registerComment("name")} className="shadow appearance-none border rounded w-full py-2 px-3 bg-background/70 text-foreground leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary" />
              {commentErrors.name && <p className="text-destructive text-xs italic mt-1"><TranslatedText text={commentErrors.name.message || ""} /></p>}
            </div>
              <div className="mb-4">
                <Label htmlFor="comment-email" className="block text-foreground text-sm font-bold mb-2"><TranslatedText text="Email (Optional):"/></Label>
                <Input type="email" id="comment-email" {...registerComment("email")} className="shadow appearance-none border rounded w-full py-2 px-3 bg-background/70 text-foreground leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary"/>
                {commentErrors.email && <p className="text-destructive text-xs italic mt-1"><TranslatedText text={commentErrors.email.message || ""} /></p>}
              </div>
                <div className="mb-6">
                  <Label htmlFor="comment-text" className="block text-foreground text-sm font-bold mb-2"><TranslatedText text="Comment (Optional):"/></Label>
                  <Textarea id="comment-text" rows={4} {...registerComment("comment")} className="shadow appearance-none border rounded w-full py-2 px-3 bg-background/70 text-foreground leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary"></Textarea>
                </div>
                <div className="flex items-center justify-end">
                  <Button
                    type="submit"
                    disabled={commentStatus === 'submitting' || commentStatus === 'success'}
                    className={cn(
                      'font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors min-w-[160px] justify-center',
                      commentStatus === 'submitting' && 'opacity-50 cursor-not-allowed',
                      commentStatus === 'success'
                        ? 'bg-button-success text-button-success-foreground hover:bg-button-success/90'
                        : 'bg-accent hover:bg-accent/90 text-primary-foreground'
                    )}
                  >
                    {commentStatus === 'submitting' ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        <TranslatedText text="Posting..." />
                      </>
                    ) : commentStatus === 'success' ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        <TranslatedText text="Sent!" />
                      </>
                    ) : (
                      <TranslatedText text="Post Comment" />
                    )}
                  </Button>
                </div>
              </form>
          </div>
      </section>

       <section className="mt-12 py-8 border-t border-border relative z-10">
        <h2 className="text-2xl font-semibold mb-6 text-primary text-center"><TranslatedText text="Leave an order"/></h2>
       <Button variant="link" asChild>
          <Link href="/admin/orders">
            <TranslatedText text="View Orders" />
          </Link>
        </Button>
         <div className="max-w-xl mx-auto p-6 bg-card/80 backdrop-blur-sm rounded-xl shadow-xl">
         <form onSubmit={handleSubmitOrder(onOrderSubmit)}>
            <div className="mb-4">
              <Label htmlFor="order-name" className="block text-foreground text-sm font-bold mb-2"><TranslatedText text="Name:"/></Label>
              <Input type="text" id="order-name" {...registerOrder("name")} className="shadow appearance-none border rounded w-full py-2 px-3 bg-background/70 text-foreground leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary"/>
              {orderErrors.name && <p className="text-destructive text-xs italic mt-1"><TranslatedText text={orderErrors.name.message || ""} /></p>}
            </div>
              <div className="mb-4">
                <Label htmlFor="order-email" className="block text-foreground text-sm font-bold mb-2"><TranslatedText text="Email (Optional):"/></Label>
                <Input type="email" id="order-email" {...registerOrder("email")} className="shadow appearance-none border rounded w-full py-2 px-3 bg-background/70 text-foreground leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary"/>
                {orderErrors.email && <p className="text-destructive text-xs italic mt-1"><TranslatedText text={orderErrors.email.message || ""} /></p>}
              </div>
               <div className="mb-4">
                <Label htmlFor="order-phone" className="block text-foreground text-sm font-bold mb-2"><TranslatedText text="Phone (Optional):"/></Label>
                <Input type="tel" id="order-phone" {...registerOrder("phone")} className="shadow appearance-none border rounded w-full py-2 px-3 bg-background/70 text-foreground leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary"/>
              </div>
               <div className="mb-4">
                <Label htmlFor="order-attachment" className="block text-foreground text-sm font-bold mb-2"><TranslatedText text="Attach File (Optional):"/></Label>
                <Input type="file" id="order-attachment" {...registerOrder("attachment")} className="shadow appearance-none border rounded w-full py-2 px-3 bg-background/70 text-foreground leading-tight focus:outline-none focus:shadow-outline file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 focus:ring-2 focus:ring-primary"/>
              </div>
                <div className="mb-6">
                  <Label htmlFor="order-details" className="block text-foreground text-sm font-bold mb-2"><TranslatedText text="Order Details (Optional):"/></Label>
                  <Textarea id="order-details" rows={4} {...registerOrder("details")} className="shadow appearance-none border rounded w-full py-2 px-3 bg-background/70 text-foreground leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary"></Textarea>
                </div>
                <div className="flex items-center justify-end">
                   <Button
                    type="submit"
                    disabled={orderStatus === 'submitting' || orderStatus === 'success'}
                    className={cn(
                      'font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors min-w-[160px] justify-center',
                      orderStatus === 'submitting' && 'opacity-50 cursor-not-allowed',
                      orderStatus === 'success'
                        ? 'bg-button-success text-button-success-foreground hover:bg-button-success/90'
                        : 'bg-accent hover:bg-accent/90 text-primary-foreground'
                    )}
                  >
                    {orderStatus === 'submitting' ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        <TranslatedText text="Placing..." />
                      </>
                    ) : orderStatus === 'success' ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        <TranslatedText text="Sent!" />
                      </>
                    ) : (
                      <TranslatedText text="Place Order" />
                    )}
                  </Button>
                </div>
              </form>
          </div>
      </section>

      <section className="mt-12 py-8 border-t border-border relative z-10">
        <h2 className="text-2xl font-semibold mb-6 text-primary text-center"><TranslatedText text="Contact Me"/></h2>
        <div className="max-w-xl mx-auto text-center p-6 bg-card/80 backdrop-blur-sm rounded-xl shadow-xl">
        <p className="text-foreground mb-4">
          <TranslatedText text="I'm always open to new opportunities and collaborations. Feel free to reach out through any of the following channels:"/>
        </p>
        <div className="flex space-x-6 justify-center">
          <a
            href="https://www.linkedin.com/in/musonda-salimu-a4a0b31b9/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-highlight transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="h-8 w-8"/>
          </a>
          <a
            href="https://github.com/MS0C54073"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-highlight transition-colors"
            aria-label="GitHub Profile"
          >
            <Github className="h-8 w-8"/>
          </a>
          <a
            href="https://www.youtube.com/@musondasalimu2986"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-highlight transition-colors"
            aria-label="YouTube Channel"
          >
            <Youtube className="h-8 w-8"/>
          </a>
          <a
            href="https://wa.me/79014213578"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-highlight transition-colors"
            aria-label="WhatsApp"
          >
            <WhatsappIcon className="h-8 w-8"/>
          </a>
          <a
            href="https://t.me/MuzoSalim"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-highlight transition-colors"
            aria-label="Telegram"
          >
            <TelegramIcon className="h-8 w-8"/>
          </a>
        </div>
        </div>
      </section>
    </div>
  );
}
