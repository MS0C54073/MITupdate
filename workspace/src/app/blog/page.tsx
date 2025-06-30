
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/firebase';
import { collection, getDocs, orderBy, query, Timestamp } from 'firebase/firestore';
import type { DisplayBlogPost } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Loader2, Calendar, User } from 'lucide-react';
import TranslatedText from '@/app/components/translated-text';
import { SocialIcons } from '@/components/social-icons';

function createExcerpt(text: string, maxLength = 150): string {
    if (text.length <= maxLength) return text;
    const trimmed = text.substring(0, maxLength);
    return trimmed.substring(0, trimmed.lastIndexOf(' ')) + '...';
}

export default function BlogIndexPage() {
    const [posts, setPosts] = useState<DisplayBlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            setError(null);
            try {
                const postsCollection = collection(db, 'blog');
                const q = query(postsCollection, orderBy('publishedDate', 'desc'));
                const querySnapshot = await getDocs(q);

                const fetchedPosts = querySnapshot.docs.map((doc) => {
                    const data = doc.data();
                    const date = (data.publishedDate as Timestamp)?.toDate();
                    return {
                        id: doc.id,
                        title: data.title || 'Untitled Post',
                        slug: data.slug || doc.id,
                        author: data.author || 'Anonymous',
                        publishedDate: date ? date.toLocaleDateString() : 'No date',
                        imageUrl: data.imageUrl || `https://placehold.co/400x250.png`,
                        imageHint: data.imageHint || 'blog post',
                        excerpt: createExcerpt(data.content || ''),
                    };
                });
                setPosts(fetchedPosts);
            } catch (err) {
                console.error("Error fetching blog posts:", err);
                setError('Failed to load blog posts. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

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
                    <TranslatedText text="Muzo's Blog" />
                </h1>
                <p className="text-muted-foreground mt-2">
                    <TranslatedText text="Insights on tech, teaching, and everything in between." />
                </p>
            </header>
            <main className="flex-grow">
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                        <p className="ml-4 text-lg text-muted-foreground"><TranslatedText text="Loading posts..." /></p>
                    </div>
                )}
                {error && (
                    <div className="text-center py-20 text-destructive bg-destructive/10 rounded-md p-4">
                        <p className="text-lg font-semibold"><TranslatedText text="An Error Occurred" /></p>
                        <p className="text-sm"><TranslatedText text={error} /></p>
                    </div>
                )}
                {!loading && !error && posts.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map(post => (
                            <Link key={post.id} href={`/blog/${post.slug}`} passHref>
                                <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card/90 backdrop-blur-md cursor-pointer">
                                    <CardHeader className="p-0">
                                        <Image
                                            src={post.imageUrl}
                                            alt={post.title}
                                            width={400}
                                            height={250}
                                            data-ai-hint={post.imageHint}
                                            className="w-full h-48 object-cover"
                                        />
                                    </CardHeader>
                                    <CardContent className="p-6 flex-grow">
                                        <CardTitle className="text-xl font-bold mb-2 text-foreground line-clamp-2">
                                            <TranslatedText text={post.title} />
                                        </CardTitle>
                                        <p className="text-muted-foreground text-sm line-clamp-3">
                                           <TranslatedText text={post.excerpt} />
                                        </p>
                                    </CardContent>
                                    <CardFooter className="p-6 pt-0 border-t mt-auto">
                                        <div className="flex justify-between items-center w-full text-xs text-muted-foreground">
                                             <div className="flex items-center gap-1">
                                                <User className="h-3 w-3" />
                                                <span><TranslatedText text={post.author} /></span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                <span>{post.publishedDate}</span>
                                            </div>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
                {!loading && !error && posts.length === 0 && (
                    <div className="text-center py-20">
                        <Image
                            src="https://placehold.co/400x300.png"
                            alt="No posts yet"
                            width={400}
                            height={300}
                            data-ai-hint="empty state"
                            className="mx-auto rounded-lg mb-4 opacity-70"
                        />
                        <h2 className="text-2xl font-semibold text-foreground mb-2">
                            <TranslatedText text="Coming Soon!" />
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            <TranslatedText text="No blog posts have been published yet. Check back later!" />
                        </p>
                    </div>
                )}
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
