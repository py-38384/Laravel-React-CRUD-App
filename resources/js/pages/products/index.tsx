import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Head, router, usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { CirclePlus, Eye, Pencil, Trash, Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Products',
        href: '/products',
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
export default function Index({products}:{products: Product[]}) {
    // const { flash } = usePage<{ flash?: { success?: string; error?: string }}>().props;
    // const flashMessage = flash?.success || flash?.error;
    // const alertClasses = `${flash?.success ? 'bg-green-800': flash?.error? 'bg-red-800': ''} ml-auto max-w-md text-white`;

    // const [showAlert, setShowAlert] = useState((flash?.success|| flash?.error)? true: false)
    // console.log(flashMessage, flash, showAlert)
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         if(flashMessage){
    //             setShowAlert(false)
    //         }
    //     }, 3000)
    //     return () => clearTimeout(timer);
    // },[flashMessage])
    const { flash } = usePage<{ flash?: { success?: string; error?: string } }>().props;
    const flashMessage = flash?.success || flash?.error;
    const [showAlert, setShowAlert] = useState(flash?.success || flash?.error ? true : false);
    useEffect(() => {
        console.log(flash)
        if (flashMessage) {
            const timer = setTimeout(() => setShowAlert(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [flashMessage]);
    const alertClasses = `${flash?.success ? 'bg-green-800': flash?.error? 'bg-red-800': ''} ml-auto max-w-md text-white`;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products Management" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                {showAlert && flashMessage && (
                    <Alert variant={'default'} className={alertClasses}>
                        <AlertTitle className='font-bold'>
                            {flash?.success ? 'SUCCESS' : 'ERROR'}
                        </AlertTitle>
                        <AlertDescription className='text-white'>
                            {flashMessage}
                        </AlertDescription>
                    </Alert>
                )}
                <div className='ml-auto'>
                <Link as='button' className='bg-indigo-800 px-4 py-2 rounded-lg text-white text-md cursor-pointer hover:opacity-90 flex item-center justify-center gap-1' href={route('products.create')}>
                <CirclePlus className="inline"/> Add Product</Link>
                </div>

                <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
                    <table className='w-full table-auto'>
                        <thead>
                            <tr className='bg-gray-600 text-white'>
                                <td className='p-4 border'>#</td>
                                <td className='p-4 border'>Name</td>
                                <td className='p-4 border'>Description</td>
                                <td className='p-4 border'>Price(BTK)</td>
                                <td className='p-4 border'>Feature Image</td>
                                <td className='p-4 border'>Created Date</td>
                                <td className='p-4 border'>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 ? products.map((product: Product, index) => (
                            <tr key={index}>
                                <td className='px-4 py-2 text-center border'>{index+1}.</td>
                                <td className='px-4 py-2 text-center border'>{product.name}</td>
                                <td className='px-4 py-2 text-center border w-[400px]'>{product.description.length >= 40? `${product.description.substring(0, 40)}...`: product.description}</td>
                                <td className='px-4 py-2 text-center border'>{product.price}</td>
                                <td className='px-4 py-2 text-center border'><img src={`/storage/${product.feature_image}`} alt={product.name} className='h-16 w-16 object-cover' /></td>
                                <td className='px-4 py-2 text-center border'>{product.created_at}</td>
                                <td className='px-4 py-2 text-center border'>
                                    <div className='flex gap-1 h-full'>
                                    <Link as='button' className='bg-sky-600 text-white p-2 rounded-lg cursor-pointer hover:opacity-90' href={route('products.show', product.id)}><Eye/></Link>
                                    <Link as='button' className='bg-sky-600 text-white p-2 rounded-lg cursor-pointer hover:opacity-90' href={route('products.edit', product.id)}><Pencil/></Link>
                                    <Button className='bg-red-600 text-white p-5 rounded-lg cursor-pointer hover:opacity-90' onClick={() => {
                                        if(confirm('Are you sure?')){
                                            router.delete(route('products.destroy', product.id),{
                                                preserveScroll: true
                                            })
                                        }
                                    }}><Trash2 style={{ 
                                        width: "20px",
                                        height: "20px",
                                    }}/></Button>
                                    </div>
                                </td>
                            </tr>
                            )): (
                                <tr>
                                    <td colSpan={7} className='px-4 py-2 text-center border'>No Records Found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
