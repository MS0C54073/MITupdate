
'use client';

import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import TranslatedText from '@/app/components/translated-text';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BrainCircuit, Globe, Smartphone, Server, Network, Shield, Loader2, Check, Download, Calculator } from 'lucide-react';
import Image from 'next/image';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { db, storage }from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useState, type ComponentType } from 'react';
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


const serviceData: { [key: string]: {
  title: string;
  icon: ComponentType<{ className?: string }>;
  imageHint: string;
  description: string;
  details: string[];
} } = {
  'ai-consultation': {
    title: 'AI Consultation',
    icon: BrainCircuit,
    imageHint: 'artificial intelligence brain',
    description: 'Unlock the potential of AI for your business. We provide expert guidance on integrating cutting-edge AI solutions to automate processes, gain valuable insights from data, and create intelligent, personalized user experiences.',
    details: [
      'Strategic planning for AI integration and implementation.',
      'Development of custom AI agents and chatbots using frameworks like Genkit.',
      'Implementation of machine learning models for predictive analytics and data analysis.',
      'AI-powered content generation and translation services to expand your reach.',
      'Ethical AI considerations and best practices for responsible implementation.'
    ],
  },
  'web-development': {
    title: 'Web Development',
    icon: Globe,
    imageHint: 'modern web design',
    description: 'From sleek landing pages to complex web applications, we build modern, responsive, and high-performance websites using the latest technologies. Our focus is on creating seamless user experiences with clean, scalable, and maintainable code.',
    details: [
      'Frontend development with Next.js, React, and TypeScript.',
      'Backend development with Node.js and serverless architectures.',
      'Full-stack application development and API integration.',
      'Content Management System (CMS) integration and customization.',
      'Performance optimization, SEO best practices, and accessibility compliance.'
    ],
  },
  'app-development': {
    title: 'App Development',
    icon: Smartphone,
    imageHint: 'mobile application interface',
    description: 'We create custom mobile applications for iOS and Android that are intuitive, engaging, and robust. Our user-centric design process ensures your app not only looks great but also delivers a flawless performance for your target audience.',
    details: [
      'Native app development for iOS (Swift) and Android (Kotlin).',
      'Cross-platform development using frameworks like React Native.',
      'UI/UX design focused on user engagement and ease of use.',
      'Integration with device hardware like cameras, GPS, and sensors.',
      'App Store and Google Play Store submission and maintenance.'
    ],
  },
  'system-development': {
    title: 'System Development',
    icon: Server,
    imageHint: 'server room database',
    description: 'We design and build custom software systems tailored to your specific business needs. From internal management tools to complex, large-scale platforms, we architect solutions that are secure, scalable, and efficient.',
    details: [
      'Requirement analysis and system architecture design.',
      'Development of custom internal tools and business process automation software.',
      'Building scalable backend systems and microservices.',
      'Database design, implementation, and optimization (SQL & NoSQL).',
      'Third-party API integration and custom API development.'
    ],
  },
  'networking': {
    title: 'Networking',
    icon: Network,
    imageHint: 'network infrastructure diagram',
    description: 'A reliable and secure network is the backbone of any modern business. We provide expert solutions for network infrastructure, covering design, implementation, and ongoing management to ensure dependable connectivity for all your operations.',
    details: [
      'Network architecture design for LAN, WAN, and cloud environments.',
      'Setup and configuration of routers, switches, and firewalls.',
      'Wireless network planning and deployment for optimal coverage.',
      'Network performance monitoring and troubleshooting.',
      'Virtual Private Network (VPN) and remote access solutions.'
    ],
  },
  'cybersecurity': {
    title: 'Cybersecurity',
    icon: Shield,
    imageHint: 'cyber security shield',
    description: 'In an increasingly digital world, protecting your assets is paramount. We offer comprehensive cybersecurity services including threat analysis, security audits, and the implementation of robust protective measures to safeguard your systems.',
    details: [
      'Vulnerability assessments and penetration testing.',
      'Security audits and compliance checks (e.g., GDPR, HIPAA).',
      'Data encryption and secure data handling policies.',
      'Implementation of firewalls, intrusion detection systems, and anti-malware solutions.',
      'Employee security training and awareness programs.'
    ],
  },
};


export default function ServiceDetailPage() {
  const { toast } = useToast();
  const [orderStatus, setOrderStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const params = useParams();
  const serviceSlug = Array.isArray(params.service) ? params.service[0] : params.service;

  const service = serviceSlug ? serviceData[serviceSlug] : null;

  const { register, handleSubmit, reset, formState: { errors } } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      details: service ? `I'm interested in the ${service.title} service.` : '',
      attachment: null,
    }
  });

  const onSubmit: SubmitHandler<OrderFormData> = async (data) => {
    setOrderStatus('submitting');
    try {
      const file = data.attachment?.[0];
      let attachmentName = null;
      let attachmentUrl = null;

      if (file) {
        attachmentName = file.name;
        const storageRef = ref(storage, `orders/${Date.now()}_${attachmentName}`);
        const uploadTask = await uploadBytes(storageRef, file);
        attachmentUrl = await getDownloadURL(uploadTask.ref);
      }
      
      const orderPayload: Omit<Order, 'id' | 'userId'> = {
        name: data.name,
        email: data.email || '', 
        phone: data.phone || '', 
        details: data.details || '', 
        status: 'pending',
        attachmentName: attachmentName,
        attachmentUrl: attachmentUrl,
        timestamp: serverTimestamp(),
      };
      const docRef = await addDoc(collection(db, 'orders'), orderPayload);
      toast({ 
        variant: 'success', 
        title: 'Success!', 
        description: `Your request has been submitted! Order ID: ${docRef.id}` 
      });
      setOrderStatus('success');
      reset(); 
      setTimeout(() => setOrderStatus('idle'), 3000);
    } catch (error) {
      console.error("Error submitting order: ", error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to submit your request. Please try again.'});
      setOrderStatus('error');
      setTimeout(() => setOrderStatus('idle'), 3000);
    }
  };

  if (!service) {
    notFound();
    return null;
  }

  const ServiceIcon = service.icon;

  return (
    <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8 min-h-screen flex flex-col">
      <header className="mb-8">
        <Button variant="outline" asChild className="mb-4">
          <Link href="/mit-services">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <TranslatedText text="Back to All Services" />
          </Link>
        </Button>
        <div className="flex items-center space-x-4">
          <ServiceIcon className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-bold text-primary">
            {service.title}
          </h1>
        </div>
      </header>
      <main className="flex-grow">
        <section className="mb-8 p-6 bg-card/90 backdrop-blur-md rounded-xl shadow-xl">
          <Image
            src="https://placehold.co/800x400.png"
            alt={`${service.title} Showcase`}
            width={800}
            height={400}
            data-ai-hint={service.imageHint}
            className="rounded-lg mb-6 w-full object-cover shadow-md"
          />
          <h2 className="text-3xl font-semibold text-foreground mb-4">
            <TranslatedText text="Service Overview" />
          </h2>
          <p className="text-muted-foreground mb-6 text-lg">
            {service.description}
          </p>
          
          <div className="my-8 text-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold text-lg py-6 px-8 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-pulse hover:animate-none">
              <Link href="/it-service-calculator">
                <Calculator className="mr-3 h-6 w-6" />
                <TranslatedText text="Calculate My Project Cost" />
              </Link>
            </Button>
          </div>

          <h3 className="text-2xl font-semibold text-foreground mb-4">
            <TranslatedText text="What We Offer" />
          </h3>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            {service.details.map((detail, index) => (
              <li key={index}>
                {detail}
              </li>
            ))}
          </ul>
        </section>

        <section id="request-service" className="mt-12 py-8 border-t border-border relative z-10 scroll-mt-20">
          <h2 className="text-2xl font-semibold mb-6 text-primary text-center">
            <TranslatedText text="Request This Service" />
          </h2>
          <div className="max-w-xl mx-auto p-6 bg-card/80 backdrop-blur-sm rounded-xl shadow-xl">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <Label htmlFor="order-name" className="block text-foreground text-sm font-bold mb-2"><TranslatedText text="Name:" /></Label>
                <Input type="text" id="order-name" {...register("name")} className="shadow appearance-none border rounded w-full py-2 px-3 bg-background/70 text-foreground leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary" />
                {errors.name && <p className="text-destructive text-xs italic mt-1"><TranslatedText text={errors.name.message || ""} /></p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="order-email" className="block text-foreground text-sm font-bold mb-2"><TranslatedText text="Email (Optional):" /></Label>
                    <Input type="email" id="order-email" {...register("email")} className="shadow appearance-none border rounded w-full py-2 px-3 bg-background/70 text-foreground leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary" />
                    {errors.email && <p className="text-destructive text-xs italic mt-1"><TranslatedText text={errors.email.message || ""} /></p>}
                  </div>
                  <div>
                    <Label htmlFor="order-phone" className="block text-foreground text-sm font-bold mb-2"><TranslatedText text="Phone (Optional):" /></Label>
                    <Input type="tel" id="order-phone" {...register("phone")} className="shadow appearance-none border rounded w-full py-2 px-3 bg-background/70 text-foreground leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary" />
                  </div>
              </div>
              <div className="mb-4">
                <Label htmlFor="order-details" className="block text-foreground text-sm font-bold mb-2"><TranslatedText text="Project Details:" /></Label>
                <Textarea id="order-details" rows={4} {...register("details")} className="shadow appearance-none border rounded w-full py-2 px-3 bg-background/70 text-foreground leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary"></Textarea>
                {errors.details && <p className="text-destructive text-xs italic mt-1"><TranslatedText text={errors.details.message || ""} /></p>}
              </div>
              <div className="mb-6">
                <Label htmlFor="order-attachment" className="block text-foreground text-sm font-bold mb-2"><TranslatedText text="Attach File (Optional):" /></Label>
                <Input type="file" id="order-attachment" {...register("attachment")} className="shadow appearance-none border rounded w-full py-2 px-3 bg-background/70 text-foreground leading-tight focus:outline-none focus:shadow-outline file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 focus:ring-2 focus:ring-primary" />
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
                      : 'bg-accent hover:bg-accent/90 text-accent-foreground'
                  )}
                >
                  {orderStatus === 'submitting' ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <TranslatedText text="Submitting..." />
                    </>
                  ) : orderStatus === 'success' ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      <TranslatedText text="Submitted!" />
                    </>
                  ) : (
                    <TranslatedText text="Submit Request" />
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
                <Link href="/mit-services">
                    <TranslatedText text="Return to All Services" />
                </Link>
            </Button>
        </div>
      </footer>
    </div>
  );
}
