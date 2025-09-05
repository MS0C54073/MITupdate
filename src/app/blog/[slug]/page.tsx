
'use client';

import { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, limit, Timestamp } from 'firebase/firestore';
import type { FullDisplayBlogPost } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, Calendar, User } from 'lucide-react';
import TranslatedText from '@/app/components/translated-text';
import { SocialIcons } from '@/components/social-icons';

// Simple markdown to HTML renderer
function renderContent(content: string) {
    // Replace newlines with <br> tags for paragraphs
    // A more robust solution would use a library like 'marked' or 'react-markdown'
    const paragraphs = content.split('\n').filter(p => p.trim() !== '').map((p, i) => (
        <p key={i} className="mb-4">{p}</p>
    ));
    return <>{paragraphs}</>;
}

export default function BlogPostPage() {
    const params = useParams();
    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

    const [post, setPost] = useState<FullDisplayBlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!slug) return;

        const fetchPost = async () => {
            setLoading(true);
            setError(null);
            try {
                const postsCollection = collection(db, 'blog');
                const q = query(postsCollection, where('slug', '==', slug), limit(1));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    setError('Post not found.');
                    // This will be handled by the notFound() call later
                } else {
                    const doc = querySnapshot.docs[0];
                    const data = doc.data();
                    const date = (data.publishedDate as Timestamp)?.toDate();
                    setPost({
                        id: doc.id,
                        title: data.title || 'Untitled Post',
                        slug: data.slug || doc.id,
                        content: data.content || 'No content available.',
                        author: data.author || 'Anonymous',
                        publishedDate: date ? date.toLocaleDateString() : 'No date',
                        imageUrl: data.imageUrl || `https://placehold.co/800x400.png`,
                        imageHint: data.imageHint || 'blog post topic'
                    });
                }
            } catch (err) {
                console.error(`Error fetching post with slug "${slug}":`, err);
                setError('Failed to load the blog post. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
            </div>
        );
    }
    
    // After loading, if there's an error or no post, show 404
    if (error || !post) {
        notFound();
        return null; // notFound() throws an error, so this is for type safety
    }

    return (
        <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8 min-h-screen flex flex-col">
            <header className="mb-8">
                <Button variant="outline" asChild className="mb-4">
                    <Link href="/blog">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        <TranslatedText text="Back to Blog" />
                    </Link>
                </Button>
            </header>
            <main className="flex-grow">
                <article className="max-w-4xl mx-auto bg-card/90 backdrop-blur-md rounded-xl shadow-xl overflow-hidden">
                    <Image
                        src={post.imageUrl}
                        alt={post.title}
                        width={800}
                        height={400}
                        data-ai-hint={post.imageHint}
                        className="w-full h-auto object-cover"
                        priority // Prioritize loading the main blog image
                    />
                    <div className="p-6 md:p-8 lg:p-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                            {post.title}
                        </h1>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-6">
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                <span>{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>{post.publishedDate}</span>
                            </div>
                        </div>
                        <div className="prose prose-lg dark:prose-invert max-w-none text-foreground">
                           {renderContent(post.content)}
                        </div>
                    </div>
                </article>
            </main>
            <footer className="text-center py-6 mt-8 border-t border-border">
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
