
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, serverTimestamp, type Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import type { SiteImage, DisplaySiteImage } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import TranslatedText from '@/app/components/translated-text';
import { ArrowLeft, Loader2, Upload, Trash2 } from 'lucide-react';
import { useAuth } from '@/app/auth-context';

const imageSections = [
  { id: 'affiliate_gallery', name: 'Affiliate Page Gallery' },
  { id: 'hobbies_header', name: 'Hobbies Page Header' },
  { id: 'mit_services_header', name: 'MIT Services Header' },
  { id: 'teaching_header', name: 'Teaching Page Header' },
  { id: 'blog_post_default', name: 'Blog Post Default' },
] as const;
type SectionId = typeof imageSections[number]['id'];

const imageUploadSchema = z.object({
  section: z.string().min(1, { message: "A section must be selected." }),
  alt: z.string().min(2, { message: "Alt text is required (at least 2 characters)." }),
  sourceType: z.enum(['upload', 'url']),
  imageUrl: z.string().optional(),
  imageFile: z.any().optional(),
}).superRefine((data, ctx) => {
  if (data.sourceType === 'url' && (!data.imageUrl || !z.string().url().safeParse(data.imageUrl).success)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['imageUrl'], message: 'A valid URL is required.' });
  }
  if (data.sourceType === 'upload' && (!data.imageFile || data.imageFile.length === 0)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['imageFile'], message: 'A file must be selected for upload.' });
  }
});

type ImageUploadFormData = z.infer<typeof imageUploadSchema>;

export default function ManageImagesPage() {
  const { user, userProfile, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [images, setImages] = useState<DisplaySiteImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const { register, handleSubmit, control, watch, reset, formState: { errors } } = useForm<ImageUploadFormData>({
    resolver: zodResolver(imageUploadSchema),
    defaultValues: { sourceType: 'upload' },
  });

  const sourceType = watch('sourceType');

  const fetchImages = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'site_images'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const fetchedImages = querySnapshot.docs.map(doc => {
        const data = doc.data() as SiteImage;
        return {
          id: doc.id,
          ...data,
          timestamp: (data.timestamp as Timestamp)?.toDate().toLocaleString() ?? 'N/A',
        } as DisplaySiteImage;
      });
      setImages(fetchedImages);
    } catch (error) {
      console.error("Error fetching images: ", error);
      toast({ variant: 'destructive', title: 'Error', description: 'Could not fetch site images.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      if (!user || userProfile?.role !== 'admin') {
        router.push('/'); // Redirect non-admins to home
      } else {
        fetchImages();
      }
    }
  }, [user, userProfile, authLoading, router]);

  const onSubmit: SubmitHandler<ImageUploadFormData> = async (data) => {
    setSubmitting(true);
    let imageUrl = data.imageUrl;
    let storagePath;

    try {
      if (data.sourceType === 'upload') {
        const file = data.imageFile[0];
        storagePath = `site_images/${data.section}/${Date.now()}_${file.name}`;
        const storageRef = ref(storage, storagePath);
        await uploadBytes(storageRef, file);
        imageUrl = await getDownloadURL(storageRef);
      }

      if (!imageUrl) {
        throw new Error('Image URL is missing.');
      }

      const docPayload: Omit<SiteImage, 'id'> = {
        section: data.section as SectionId,
        alt: data.alt,
        imageUrl: imageUrl,
        timestamp: serverTimestamp(),
        ...(storagePath && { storagePath }),
      };

      await addDoc(collection(db, 'site_images'), docPayload);

      toast({ variant: 'success', title: 'Success!', description: 'Image has been added.' });
      reset();
      await fetchImages(); // Refresh the list
    } catch (error) {
      console.error("Error adding image: ", error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to add image.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (image: DisplaySiteImage) => {
    try {
      // Delete from Firestore
      await deleteDoc(doc(db, 'site_images', image.id));

      // Delete from Storage if applicable
      if (image.storagePath) {
        const storageRef = ref(storage, image.storagePath);
        await deleteObject(storageRef);
      }

      toast({ title: 'Deleted', description: 'Image has been removed.' });
      setImages(prev => prev.filter(img => img.id !== image.id));
    } catch (error) {
      console.error("Error deleting image: ", error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to delete image.' });
    }
  };
  
  const groupedImages = images.reduce((acc, image) => {
    const section = image.section as SectionId;
    (acc[section] = acc[section] || []).push(image);
    return acc;
  }, {} as Record<SectionId, DisplaySiteImage[]>);

  if (authLoading || (!user && !authLoading) || loading) {
    return <div className="flex h-screen items-center justify-center"><Loader2 className="h-16 w-16 animate-spin" /></div>;
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8 min-h-screen flex flex-col">
      <header className="mb-8">
        <Button variant="outline" asChild className="mb-4">
          <Link href="/admin/dashboard"><ArrowLeft className="mr-2 h-4 w-4" /><TranslatedText text="Back to Dashboard" /></Link>
        </Button>
        <h1 className="text-4xl font-bold text-primary"><TranslatedText text="Manage Site Images" /></h1>
      </header>

      <main className="flex-grow space-y-8">
        <Card>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle><TranslatedText text="Add New Image" /></CardTitle>
              <CardDescription><TranslatedText text="Upload a new image or add one via URL for a specific site section." /></CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="section"><TranslatedText text="Target Section" /></Label>
                <Controller
                  name="section"
                  control={control}
                  render={({ field }) => (
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger><SelectValue placeholder="Select a section..." /></SelectTrigger>
                      <SelectContent>
                        {imageSections.map(sec => (
                          <SelectItem key={sec.id} value={sec.id}><TranslatedText text={sec.name} /></SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.section && <p className="text-sm text-destructive">{errors.section.message}</p>}
              </div>

              <div className="space-y-2">
                <Label><TranslatedText text="Image Source" /></Label>
                <Controller
                  name="sourceType"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="upload" id="r-upload" /><Label htmlFor="r-upload"><TranslatedText text="Upload File" /></Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="url" id="r-url" /><Label htmlFor="r-url"><TranslatedText text="From URL" /></Label>
                      </div>
                    </RadioGroup>
                  )}
                />
              </div>

              {sourceType === 'upload' ? (
                <div className="space-y-2">
                  <Label htmlFor="imageFile"><TranslatedText text="Image File" /></Label>
                  <Input id="imageFile" type="file" {...register('imageFile')} accept="image/*" />
                  {errors.imageFile && <p className="text-sm text-destructive">{errors.imageFile.message as string}</p>}
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="imageUrl"><TranslatedText text="Image URL" /></Label>
                  <Input id="imageUrl" {...register('imageUrl')} placeholder="https://drive.google.com/uc?id=..." />
                  {errors.imageUrl && <p className="text-sm text-destructive">{errors.imageUrl.message}</p>}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="alt"><TranslatedText text="Alt Text (Description)" /></Label>
                <Input id="alt" {...register('alt')} placeholder="A descriptive caption for the image" />
                {errors.alt && <p className="text-sm text-destructive">{errors.alt.message}</p>}
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={submitting}>
                {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                <TranslatedText text={submitting ? 'Submitting...' : 'Add Image'} />
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <div className="space-y-6">
          {loading ? (
             <div className="flex justify-center items-center py-10"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>
          ) : Object.keys(groupedImages).length > 0 ? (
            Object.entries(groupedImages).map(([sectionId, imageList]) => (
              <Card key={sectionId}>
                <CardHeader>
                  <CardTitle>{imageSections.find(s => s.id === sectionId)?.name || sectionId}</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {imageList.map(image => (
                    <div key={image.id} className="relative group border rounded-md overflow-hidden">
                       <Image src={image.imageUrl} alt={image.alt} width={200} height={200} className="w-full h-32 object-cover" />
                       <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="icon"><Trash2 className="h-4 w-4" /></Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle><TranslatedText text="Are you sure?" /></AlertDialogTitle>
                              <AlertDialogDescription>
                                <TranslatedText text="This will permanently delete the image. This action cannot be undone." />
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel><TranslatedText text="Cancel" /></AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(image)}><TranslatedText text="Delete" /></AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                       </div>
                       <div className="p-2 text-xs">
                         <p className="font-semibold truncate" title={image.alt}>{image.alt}</p>
                         <p className="text-muted-foreground">{image.timestamp}</p>
                       </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-10"><TranslatedText text="No images have been added yet." /></p>
          )}
        </div>
      </main>
    </div>
  );
}
