import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CustomTextarea from '@/components/ui/custom-textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import React, { ChangeEvent } from 'react';
import { ArrowLeft, LoaderCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Products',
        href: route('products.create'),
    },
];
interface Product{
    id: number,
    name: string,
    description: string,
    price: number,
    feature_image: string
    created_at: string
}
export default function ProductForm({ product, is_view, is_edit} : {product: Product, is_view: boolean, is_edit: boolean}) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `${is_view ? "Show": (is_edit? "Edit": "Create")} Products`,
            href: route('products.create'),
        },
    ];
    const { data, setData, reset, post, processing, errors } = useForm({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || '',
        featured_image: null as File | null,
        _method: is_edit? "PUT": "POST", 
    });
    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(is_edit){
            post(route('products.update', product.id), {
                forceFormData: true,
                onSuccess: () => reset(),
            })
        }
        else {
            post(route('products.store'), {
                onSuccess: () => reset(),
            })
        }
    }
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files.length > 0){
            setData("featured_image", e.target.files[0])
        }
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products Management" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="ml-auto">
                    <Link
                        as="button"
                        className="text-md cursor-pointer rounded-lg bg-indigo-800 px-4 py-2 text-white hover:opacity-90 flex item-center justify-center gap-1"
                        href={route('products.index')}
                    >
                        <ArrowLeft className="me-2"/> Back to Products
                    </Link>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>{is_view ? "Show":(is_edit? "Edit": "Create")} Product</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="flex flex-col gap-4" autoComplete="off">
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Product name</Label>
                                    <Input 
                                        value={data.name} 
                                        onChange={(e) => setData('name', e.target.value)} 
                                        id="name" 
                                        name="name" 
                                        type="text" placeholder="Product name" autoFocus 
                                        tabIndex={1}
                                        readOnly={is_view || processing}
                                    ></Input>
                                    <InputError message={errors.name}/>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Product Description</Label>
                                    <CustomTextarea 
                                        value={data.description} 
                                        onChange={(e) => setData('description', e.target.value)}
                                        id="description" name="description" 
                                        tabIndex={2} placeholder="Product Description" 
                                        rows={7}
                                        readOnly={is_view || processing} 
                                    />
                                     <InputError message={errors.description}/>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="price">Price</Label>
                                    <Input 
                                        value={data.price} 
                                        onChange={(e) => setData('price', e.target.value)}
                                        id="price" 
                                        name="price" 
                                        type="text" placeholder="Product Price" autoFocus 
                                        tabIndex={3}
                                        readOnly={is_view || processing}
                                    ></Input>
                                    <InputError message={errors.price}/>
                                </div>
                                {(is_view || is_edit) && (
                                    <div className='grid gap-2'>
                                        <Label htmlFor='feature_image'>Current Feature Image</Label>
                                        <img src={`/storage/${product.feature_image}`} alt="Feature Image" className='w-50 rounded-lg border'/>
                                    </div>
                                )}
                                {!is_view && (
                                    <>
                                        <div className="grid gap-2">
                                            <Label htmlFor="name">Featured Image</Label>
                                            <Input 
                                                id="featured_image" name="featured_image" type="file" 
                                                autoFocus 
                                                tabIndex={4}
                                                onChange={handleFileUpload}
                                                readOnly={is_view || processing}
                                            ></Input>
                                            <InputError message={errors.featured_image}/>
                                        </div>
                                        <Button type="submit" className="mt-4 w-fit cursor-pointer flex item-center justify-center gap-1" tabIndex={4}>
                                            {processing && <LoaderCircle className='h-4 w-4 animate-spin'/>}
                                            {processing? (is_edit? 'Updating...': 'Creating...'): (is_edit? 'Update': 'Create')} Product
                                        </Button>
                                    </>
                                )}
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
