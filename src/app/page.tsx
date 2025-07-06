
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Loader2, Check, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, query, orderBy, limit, getDocs, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useAuth } from '@/app/auth-context';

// Custom Icons
import { MuzoInTechLogo } from '@/components/icons';
import { SocialIcons } from '@/components/social-icons';
import './ai.css';
import TranslatedText from '@/app/components/translated-text';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import type { Comment, Order, Review, DisplayReview } from '@/lib/types';


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

const reviewSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  review: z.string().optional(),
  rating: z.number().min(1, { message: 'Please select a rating' }).max(5),
});
type ReviewFormData = z.infer<typeof reviewSchema>;


export default function Home() {
  const { toast } = useToast();
  const { user } = useAuth();

  const [commentStatus, setCommentStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [orderStatus, setOrderStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [reviewStatus, setReviewStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const [reviews, setReviews] = useState<DisplayReview[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);


  const { register: registerComment, handleSubmit: handleSubmitComment, reset: resetCommentForm, formState: { errors: commentErrors } } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    defaultValues: { name: '', email: '', comment: '' }
  });

  const { register: registerOrder, handleSubmit: handleSubmitOrder, reset: resetOrderForm, formState: { errors: orderErrors } } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: { name: '', email: '', phone: '', details: '', attachment: null }
  });

  const { register: registerReview, handleSubmit: handleSubmitReview, setValue: setReviewValue, reset: resetReviewForm, watch: watchReview, formState: { errors: reviewErrors } } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { name: '', review: '', rating: 0 }
  });

  const [hoverRating, setHoverRating] = useState(0);
  const currentRating = watchReview('rating');
  
  useEffect(() => {
    registerReview('rating');
  }, [registerReview]);

  const checkArrows = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
        const { scrollLeft, scrollWidth, clientWidth } = container;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  }, []);

  useEffect(() => {
      const container = scrollContainerRef.current;
      if (container) {
          const timer = setTimeout(() => checkArrows(), 100);
          container.addEventListener('scroll', checkArrows);
          window.addEventListener('resize', checkArrows);
          return () => {
              clearTimeout(timer);
              container.removeEventListener('scroll', checkArrows);
              window.removeEventListener('resize', checkArrows);
          };
      }
  }, [checkArrows]);
  
  useEffect(() => {
    const fetchReviews = async () => {
        setLoadingReviews(true);
        try {
            const reviewsCollection = collection(db, 'reviews');
            const q = query(reviewsCollection, orderBy('timestamp', 'desc'), limit(5));
            const querySnapshot = await getDocs(q);
            const fetchedReviews = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    name: data.name || 'Anonymous',
                    review: data.review || '',
                    rating: data.rating || 0,
                    timestamp: (data.timestamp as Timestamp)?.toDate().toLocaleDateString() ?? 'No date',
                }
            });
            setReviews(fetchedReviews);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        } finally {
            setLoadingReviews(false);
        }
    };
    fetchReviews();
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
      if (scrollContainerRef.current) {
          const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
          const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
          scrollContainerRef.current.scrollTo({
              left: newScrollLeft,
              behavior: 'smooth',
          });
      }
  };

  const onCommentSubmit: SubmitHandler<CommentFormData> = async (data) => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Authentication Required',
        description: 'You must be logged in to leave a comment.',
      });
      return;
    }

    setCommentStatus('submitting');
    try {
      const commentPayload: Omit<Comment, 'id'> = {
        name: data.name,
        email: data.email || '', 
        comment: data.comment || '', 
        timestamp: serverTimestamp(),
        userId: user.uid,
      };
      await addDoc(collection(db, 'comments'), commentPayload);
      toast({ variant: 'success', title: 'Success!', description: `Comment submitted successfully!` });
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
      const file = data.attachment?.[0];
      let attachmentUrl = null;

      if (file) {
        const storageRef = ref(storage, `orders/${Date.now()}_${file.name}`);
        const uploadTask = await uploadBytes(storageRef, file);
        attachmentUrl = await getDownloadURL(uploadTask.ref);
      }
      
      const orderPayload: Omit<Order, 'id'> = {
        name: data.name,
        email: data.email || '', 
        phone: data.phone || '', 
        details: data.details || '', 
        status: 'pending',
        attachmentName: file ? file.name : null,
        attachmentUrl: attachmentUrl,
        timestamp: serverTimestamp(),
        userId: user ? user.uid : undefined,
      };

      await addDoc(collection(db, 'orders'), orderPayload);
      toast({ variant: 'success', title: 'Success!', description: `Order submitted successfully!` });
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

  const onReviewSubmit: SubmitHandler<ReviewFormData> = async (data) => {
    setReviewStatus('submitting');
    try {
      const reviewPayload: Omit<Review, 'id'> = {
        name: data.name,
        review: data.review || '',
        rating: data.rating,
        timestamp: serverTimestamp(),
      };
      const docRef = await addDoc(collection(db, 'reviews'), reviewPayload);
      
      // Add new review to the top of the list locally
      const newReview: DisplayReview = {
        id: docRef.id,
        name: data.name,
        review: data.review || '',
        rating: data.rating,
        timestamp: new Date().toLocaleDateString(),
      }
      setReviews(prevReviews => [newReview, ...prevReviews].slice(0, 5));

      toast({ variant: 'success', title: 'Thank You!', description: 'Your review has been submitted.' });
      setReviewStatus('success');
      resetReviewForm();
      setTimeout(() => setReviewStatus('idle'), 3000);
    } catch (error) {
      console.error("Error submitting review: ", error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to submit review. Please try again.' });
      setReviewStatus('error');
      setTimeout(() => setReviewStatus('idle'), 3000);
    }
  };


  return (
    <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
      <section className="mb-12 relative z-10 pt-16">
        <div className="flex flex-col items-center text-center md:flex-row md:text-left gap-8 p-6 bg-card/80 backdrop-blur-sm rounded-xl shadow-xl">
          <Image
            src="https://placehold.co/200x200.png"
            alt="Muzo's Profile Picture"
            width={200}
            height={200}
            data-ai-hint="profile picture"
            className="rounded-full shadow-lg border-4 border-primary object-cover"
          />
          <div className="text-center md:text-left flex-grow">
            <div className="flex items-center gap-4 justify-center md:justify-start mb-2">
              <MuzoInTechLogo className="h-16 w-16" />
              <div>
                <h1 className="text-3xl font-bold text-primary"><TranslatedText text="Muzo"/></h1>
                <p className="text-lg font-semibold text-accent"><TranslatedText text="MuzoInTech (MIT)"/></p>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-4">
              <TranslatedText text="Tech Enthusiast, Tutor, Affiliate Marketer, and Music Lover"/>
            </p>
            <p className="text-foreground">
              <TranslatedText text="Passionate about leveraging technology for education and creating engaging content."/>
              {' '}
              <TranslatedText text="Exploring the intersections of tech, teaching, marketing, and music."/>
            </p>
            <SocialIcons className="mt-4 flex space-x-4 justify-center md:justify-start" />
          </div>
        </div>
      </section>

      <section  className="relative z-10">
        <h2 className="text-2xl font-semibold mb-6 text-primary text-center"><TranslatedText text="Portfolio Showcase"/></h2>
        <div className="relative group">
           {canScrollLeft && (
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleScroll('left')}
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          )}
          <div className="portfolio-rotation" ref={scrollContainerRef}>
            <Link href="/mit-services" passHref legacyBehavior>
              <a className="portfolio-item flex flex-col items-center text-center bg-card/80 backdrop-blur-sm rounded-lg border shadow-md p-4 hover:shadow-xl hover:animate-shake transition-all duration-300 cursor-pointer">
                <Image
                  src="https://placehold.co/150x150.png"
                  alt="MIT Services"
                  width={150}
                  height={150}
                  data-ai-hint="tech services"
                  className="rounded-full mb-4 w-36 h-36 border-4 border-primary shadow-lg object-cover"
                />
                <h3 className="text-xl font-semibold text-foreground mb-2"><TranslatedText text="MIT Services"/></h3>
                <p className="text-muted-foreground flex-grow">
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
              <a className="portfolio-item flex flex-col items-center text-center bg-card/80 backdrop-blur-sm rounded-lg border shadow-md p-4 hover:shadow-xl hover:animate-shake transition-all duration-300 cursor-pointer">
                <Image
                  src="https://placehold.co/150x150.png"
                  alt="Work and Education"
                  width={150}
                  height={150}
                  data-ai-hint="education books"
                  className="rounded-full mb-4 w-36 h-36 border-4 border-primary shadow-lg object-cover"
                />
                <h3 className="text-xl font-semibold text-foreground mb-2"><TranslatedText text="Work and Education"/></h3>
                <p className="text-muted-foreground flex-grow">
                  <TranslatedText text="A detailed look at professional experience, educational background, and certifications."/>
                </p>
                <div
                  className="inline-block mt-4 px-4 py-2 bg-accent text-primary-foreground rounded-md hover:bg-accent/90 transition-colors"
                >
                  <TranslatedText text="Learn More"/>
                </div>
              </a>
            </Link>

            <Link href="/affiliate-marketing-manager" passHref legacyBehavior>
              <a className="portfolio-item flex flex-col items-center text-center bg-card/80 backdrop-blur-sm rounded-lg border shadow-md p-4 hover:shadow-xl hover:animate-shake transition-all duration-300 cursor-pointer">
                <Image
                  src="https://placehold.co/150x150.png"
                  alt="Affiliate Marketing Project"
                  width={150}
                  height={150}
                  data-ai-hint="marketing chart"
                  className="rounded-full mb-4 w-36 h-36 border-4 border-primary shadow-lg object-cover"
                />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  <TranslatedText text="Affiliate Marketing Manager"/>
                </h3>
                <p className="text-muted-foreground flex-grow">
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
              <a className="portfolio-item flex flex-col items-center text-center bg-card/80 backdrop-blur-sm rounded-lg border shadow-md p-4 hover:shadow-xl hover:animate-shake transition-all duration-300 cursor-pointer">
                <Image
                  src="https://placehold.co/150x150.png"
                  alt="Hobbies"
                  width={150}
                  height={150}
                  data-ai-hint="hobby collection"
                  className="rounded-full mb-4 w-36 h-36 border-4 border-primary shadow-lg object-cover"
                />
                <h3 className="text-xl font-semibold text-foreground mb-2"><TranslatedText text="Hobbies"/></h3>
                <p className="text-muted-foreground flex-grow"><TranslatedText text="Brief description of the music track or project."/></p>
                <div
                  className="inline-block mt-4 px-4 py-2 bg-accent text-primary-foreground rounded-md hover:bg-accent/90 transition-colors"
                >
                  <TranslatedText text="Explore More"/>
                </div>
              </a>
            </Link>
          </div>
          {canScrollRight && (
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleScroll('right')}
              aria-label="Scroll right"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          )}
        </div>
      </section>

      <section className="mt-12 py-8 border-t border-border relative z-10">
        <h2 className="text-2xl font-semibold mb-6 text-primary text-center"><TranslatedText text="Leave a Review"/></h2>
        <div className="max-w-xl mx-auto">
            {/* Review Form */}
            <div className="p-6 bg-card/80 backdrop-blur-sm rounded-xl shadow-xl mb-8">
                <form onSubmit={handleSubmitReview(onReviewSubmit)}>
                    <div className="mb-4">
                        <Label htmlFor="review-name" className="block text-foreground text-sm font-bold mb-2"><TranslatedText text="Name:"/></Label>
                        <Input type="text" id="review-name" {...registerReview("name")} className="shadow appearance-none border rounded w-full py-2 px-3 bg-background/70 text-foreground leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary" />
                        {reviewErrors.name && <p className="text-destructive text-xs italic mt-1"><TranslatedText text={reviewErrors.name.message || ""} /></p>}
                    </div>
                    <div className="mb-4">
                        <Label className="block text-foreground text-sm font-bold mb-2"><TranslatedText text="Rating:"/></Label>
                        <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={cn(
                                        'h-8 w-8 cursor-pointer transition-colors',
                                        (hoverRating >= star || currentRating >= star) 
                                            ? 'text-yellow-400 fill-yellow-400' 
                                            : 'text-muted-foreground/50'
                                    )}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    onClick={() => setReviewValue('rating', star, { shouldValidate: true })}
                                />
                            ))}
                        </div>
                        {reviewErrors.rating && <p className="text-destructive text-xs italic mt-1"><TranslatedText text={reviewErrors.rating.message || ""} /></p>}
                    </div>
                    <div className="mb-6">
                        <Label htmlFor="review-text" className="block text-foreground text-sm font-bold mb-2"><TranslatedText text="Review (Optional):"/></Label>
                        <Textarea id="review-text" rows={4} {...registerReview("review")} className="shadow appearance-none border rounded w-full py-2 px-3 bg-background/70 text-foreground leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary"></Textarea>
                    </div>
                    <div className="flex items-center justify-end">
                        <Button
                            type="submit"
                            disabled={reviewStatus === 'submitting' || reviewStatus === 'success'}
                            className={cn(
                                'font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors min-w-[160px] justify-center',
                                reviewStatus === 'submitting' && 'opacity-50 cursor-not-allowed',
                                reviewStatus === 'success'
                                    ? 'bg-button-success text-button-success-foreground hover:bg-button-success/90'
                                    : 'bg-accent hover:bg-accent/90 text-primary-foreground'
                            )}
                        >
                            {reviewStatus === 'submitting' ? (
                                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /><TranslatedText text="Submitting..." /></>
                            ) : reviewStatus === 'success' ? (
                                <><Check className="mr-2 h-4 w-4" /><TranslatedText text="Sent!" /></>
                            ) : (
                                <TranslatedText text="Submit Review" />
                            )}
                        </Button>
                    </div>
                </form>
            </div>

            {/* Display Reviews */}
            <h3 className="text-xl font-semibold mb-4 text-primary text-center"><TranslatedText text="Recent Reviews"/></h3>
            {loadingReviews ? (
                <div className="flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
            ) : reviews.length > 0 ? (
                <div className="space-y-4">
                    {reviews.map(review => (
                        <div key={review.id} className="p-4 bg-card/80 backdrop-blur-sm rounded-lg border shadow-md">
                            <div className="flex justify-between items-start">
                                <h4 className="font-bold text-foreground">{review.name}</h4>
                                <span className="text-xs text-muted-foreground">{review.timestamp}</span>
                            </div>
                            <div className="flex items-center my-1">
                                {[...Array(review.rating)].map((_, i) => <Star key={`filled-${i}`} className="h-4 w-4 text-yellow-400 fill-yellow-400"/>)}
                                {[...Array(5 - review.rating)].map((_, i) => <Star key={`empty-${i}`} className="h-4 w-4 text-muted-foreground/50"/>)}
                            </div>
                            <p className="text-sm text-muted-foreground italic">"<TranslatedText text={review.review} />"</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-muted-foreground"><TranslatedText text="No reviews yet. Be the first!"/></p>
            )}
        </div>
    </section>

    <section className="mt-12 py-8 border-t border-border relative z-10">
        <h2 className="text-2xl font-semibold mb-6 text-primary text-center"><TranslatedText text="Leave a comment"/></h2>
         <div className="max-w-xl mx-auto p-6 bg-card/80 backdrop-blur-sm rounded-xl shadow-xl">
         {user ? (
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
              ) : (
                <div className="text-center">
                  <p className="text-muted-foreground mb-4">
                    <TranslatedText text="You must be logged in to leave a comment." />
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button asChild>
                      <Link href="/login"><TranslatedText text="Login" /></Link>
                    </Button>
                    <Button variant="secondary" asChild>
                      <Link href="/signup"><TranslatedText text="Sign Up" /></Link>
                    </Button>
                  </div>
                </div>
              )}
          </div>
      </section>

       <section className="mt-12 py-8 border-t border-border relative z-10">
        <h2 className="text-2xl font-semibold mb-6 text-primary text-center"><TranslatedText text="Leave an order"/></h2>
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
                {orderErrors.attachment && <p className="text-destructive text-xs italic mt-1"><TranslatedText text={orderErrors.attachment.message as string} /></p>}
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
        <SocialIcons className="flex space-x-6 justify-center" />
        </div>
      </section>
    </div>
  );
}
