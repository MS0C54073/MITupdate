
'use client';

import Link from 'next/link';
import TranslatedText from '@/app/components/translated-text';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BrainCircuit, Globe, Smartphone, Server, Network, Shield, Loader2, Check } from 'lucide-react';
import Image from 'next/image';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import type { Order } from '@/lib/types';
import { SocialIcons } from '@/components/social-icons';


const orderSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }).optional().or(z.literal('')),
  phone: z.string().optional(),
  details: z.string().optional(),
  attachment: z.any().optional(), 
});
type OrderFormData = z.infer<typeof orderSchema>;

const services = [
  {
    slug: 'ai-consultation',
    icon: BrainCircuit,
    title: 'AI Consultation',
    description: 'Leverage the power of Artificial Intelligence. We provide expert guidance on integrating AI solutions, like Genkit-powered agents and translation services, to automate processes and enhance user experience.',
  },
  {
    slug: 'web-development',
    icon: Globe,
    title: 'Web Development',
    description: 'Building modern, responsive, and high-performance websites using technologies like Next.js, React, and TypeScript. We focus on creating seamless user experiences with clean, scalable code.',
  },
  {
    slug: 'app-development',
    icon: Smartphone,
    title: 'App Development',
    description: 'Creating custom mobile applications for iOS and Android. Our focus is on user-centric design, robust functionality, and delivering a native-like performance for your target audience.',
  },
  {
    slug: 'system-development',
    icon: Server,
    title: 'System Development',
    description: 'Designing and building custom software systems tailored to your specific business needs. From internal tools to complex platforms, we ensure security, scalability, and efficiency.',
  },
  {
    slug: 'networking',
    icon: Network,
    title: 'Networking',
    description: 'Providing solutions for robust and secure network infrastructure. We cover network design, implementation, and management to ensure reliable connectivity for your operations.',
  },
  {
    slug: 'cybersecurity',
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Protecting your digital assets with comprehensive cybersecurity services. We offer threat analysis, security audits, and implementation of protective measures to safeguard your systems.',
  },
];


export default function MITServicesPage() {
  const { toast } = useToast();
  const [orderStatus, setOrderStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const { register: registerOrder, handleSubmit: handleSubmitOrder, reset: resetOrderForm, formState: { errors: orderErrors } } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: { 
      name: '',
      email: '',
      phone: '',
      details: 'I would like to inquire about your services.',
    }
  });

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
    <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8 min-h-screen flex flex-col">
      <header className="mb-8">
        <Button variant="outline" asChild className="mb-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <TranslatedText text="Back to Home" />
          </Link>
        </Button>
        <h1 className="text-4xl font-bold text-primary">
          <TranslatedText text="MIT Services" />
        </h1>
      </header>
      <main className="flex-grow">
        <section className="mb-8 p-6 bg-card/90 backdrop-blur-md rounded-xl shadow-xl">
          <Image
            src="https://picsum.photos/seed/tech/800/400"
            data-ai-hint="modern office technology"
            alt="MIT Services Showcase"
            width={800}
            height={400}
            className="rounded-lg mb-6 w-full object-cover shadow-md"
          />
          <h2 className="text-3xl font-semibold text-foreground mb-4">
            <TranslatedText text="Comprehensive Technology Solutions" />
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            <TranslatedText text="MuzoInTech (MIT) offers a wide spectrum of IT services designed to empower your business. From initial consultation to development and deployment, we provide end-to-end solutions to meet your unique technological needs." />
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link key={service.slug} href={`/mit-services/${service.slug}`} passHref>
                <div className="p-6 bg-background/50 rounded-lg border flex flex-col items-center text-center hover:shadow-xl hover:border-primary transition-all duration-300 h-full cursor-pointer">
                  <service.icon className="h-12 w-12 text-accent mb-3" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    <TranslatedText text={service.title} />
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    <TranslatedText text={service.description} />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12 py-8 border-t border-border relative z-10">
          <h2 className="text-2xl font-semibold mb-6 text-primary text-center"><TranslatedText text="Request a Service"/></h2>
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

      </main>
      <footer className="text-center py-6 border-t border-border">
         <div className="flex flex-col items-center gap-4">
            <SocialIcons className="flex space-x-4 justify-center" />
            <Button variant="link" asChild>
                <Link href="/">
                    <TranslatedText text="Return to Homepage" />
                </Link>
            </Button>
         </div>
      </footer>
    </div>
  );
}
