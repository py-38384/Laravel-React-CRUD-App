import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Products',
        href: '/products',
    },
];

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products Management" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className='ml-auto'>
                <Link as='button' className='bg-indigo-800 px-4 py-2 rounded-lg text-white text-md cursor-pointer hover:opacity-90' href={route('products.create')}>Add Product</Link>
                </div>

                <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
                    <table className='w-full table-auto'>
                        <thead>
                            <tr className='bg-gray-600 text-white'>
                                <td className='p-4 border'>#</td>
                                <td className='p-4 border'>Name</td>
                                <td className='p-4 border'>Description</td>
                                <td className='p-4 border'>Price</td>
                                <td className='p-4 border'>Feature Image</td>
                                <td className='p-4 border'>Created Date</td>
                                <td className='p-4 border'>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='px-4 py-2 text-center border'>1.</td>
                                <td className='px-4 py-2 text-center border'>Mobile Phone</td>
                                <td className='px-4 py-2 text-center border'>Mobile Phone Description</td>
                                <td className='px-4 py-2 text-center border'>5000</td>
                                <td className='px-4 py-2 text-center border'></td>
                                <td className='px-4 py-2 text-center border'>2025-04-01</td>
                                <td className='px-4 py-2 text-center border'></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
