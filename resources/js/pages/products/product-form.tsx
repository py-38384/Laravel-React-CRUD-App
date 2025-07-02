import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CustomTextarea from '@/components/ui/custom-textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Products',
        href: route('products.create'),
    },
];

export default function ProductForm() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products Management" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="ml-auto">
                    <Link
                        as="button"
                        className="text-md cursor-pointer rounded-lg bg-indigo-800 px-4 py-2 text-white hover:opacity-90"
                        href={route('products.index')}
                    >
                        Back to Products
                    </Link>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Create Product</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="flex flex-col gap-4" autoComplete="off">
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Product name</Label>
                                    <Input id="name" name="name" type="text" placeholder="Product name" autoFocus tabIndex={1}></Input>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Product Description</Label>
                                    <CustomTextarea id="description" name="description" tabIndex={2} placeholder="Product Description" rows={7} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="price">Product name</Label>
                                    <Input id="price" name="price" type="text" placeholder="Product Price" autoFocus tabIndex={3}></Input>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Featured Image</Label>
                                    <Input id="featured_image" name="featured_image" type="file" autoFocus tabIndex={4}></Input>
                                </div>
                                <Button type="submit" className="mt-4 w-fit cursor-pointer" tabIndex={4}>
                                    Save Product
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
