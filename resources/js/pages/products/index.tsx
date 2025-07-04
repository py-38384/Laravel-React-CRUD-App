import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { CirclePlus, Eye, Pencil, Trash, Trash2 } from 'lucide-react';
import Pagination from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';

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
    created_at_formated: string
}
interface PaginationLink{
    active: boolean,
    label: string,
    url: string,
}
export interface ProductPagination{
    data: Product[],
    current_page: number,
    first_page_url: string,
    from: number,
    last_page: number,
    last_page_url: string,
    links: PaginationLink[],
    next_page_url: string,
    path: string,
    per_page: number,
    prev_page_url: string | null,
    to: number,
    total: number,
}
interface Filter{
    search: string,
    perPage: string
    count: string
}
type Query = {
    search?: string,
    perPage?: string,
}
interface IndexProps{
    products: ProductPagination,
    filters: Filter,
    count: string
}
export default function Index({products, filters, count}: IndexProps){
    console.log(count)
    const { flash } = usePage<{ flash?: { success?: string; error?: string } }>().props;
    const flashMessage = flash?.success || flash?.error;
    const [showAlert, setShowAlert] = useState(false);
    const [searchQuery, setSearchQuery] = useState(filters?.search? filters?.search: '');
    const [productCount, setProductCount] = useState(count? Number(count): 0);
    const [productsData, setProductsData] = useState(products.data);
    const {data, setData} = useForm({
        search: '',
        perPage: filters.perPage    
    })
    useEffect(() => {
        setProductCount(count? Number(count): 0)
    },[count])

    useEffect(() => {
        setProductsData(products.data)
    },[products])
    const handleChangeEventSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        let searchCount = 0
        const value = e.target.value
        if(value === ''){
            setProductsData(products.data)
            setProductCount(0)
            setSearchQuery('')
        } else {
            setProductsData(products.data.filter(product => {
                if(product.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())){
                    searchCount++
                    return true
                } 
                return false
            }))
            setSearchQuery(value)
            setProductCount(searchCount)
        }
    }
    const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setData('search',searchQuery)
        const queryString: Query = {}
        if(searchQuery){
            queryString.search = searchQuery
        }
        if(filters.perPage){
            queryString.perPage = filters.perPage
        }
        router.get(route('products.index'), queryString, {
            preserveState: true,
            preserveScroll: true,
        })
    }
    useEffect(() => {
        if (flash?.success || flash?.error) {
            setShowAlert(true);

            const timer = setTimeout(() => setShowAlert(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [flash?.success, flash?.error]);
    const alertClasses = `${flash?.success ? 'bg-green-800': flash?.error? 'bg-red-800': ''} ml-auto max-w-md text-white`;
    const handlePerPageChange = ( value: string ) => {
        setData('perPage',value)
        const queryString: Query = {}
        if(searchQuery){
            queryString.search = searchQuery
        }
        if(value){
            queryString.perPage = value
        }
        router.get(route('products.index'), queryString, {preserveScroll: true, preserveState: true})
    }
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
                <div className='flex'>
                    <form onSubmit={handleSubmitSearch} className='w-1/3 flex gap-1'>
                        <Input type='text' onChange={handleChangeEventSearch} value={searchQuery} placeholder='Search Product' className='w-full' name='search'/>
                        <Button type='submit' className='bg-indigo-800 px-4 py-2 rounded-lg text-white text-md cursor-pointer hover:bg-indigo-800 hover:opacity-90 flex item-center justify-center gap-1'>Submit</Button>
                        {(filters.perPage || filters.search) && (
                            <Link href={route('products.index')} type='submit' className='bg-gray-800 text-white rounded-lg flex justify-center items-center px-2 h-[36px] hover:opacity-95'>Reset</Link>
                        )}
                    </form>
                    <div className='ml-auto'>
                        <Link as='button' className='bg-indigo-800 px-4 py-2 rounded-lg text-white text-md cursor-pointer hover:opacity-90 flex item-center justify-center gap-1' href={route('products.create')}>
                        <CirclePlus className="inline"/> Add Product</Link>
                    </div>
                </div>
                {(productCount > 0) && (
                    <div>
                        {productCount} Product Found!
                    </div>
                )}

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
                            {productsData.length > 0 ? productsData.map((product: Product, index) => (
                            <tr key={index}>
                                <td className='px-4 py-2 text-center border'>{index+products.from}.</td>
                                <td className='px-4 py-2 text-center border'>{product.name}</td>
                                <td className='px-4 py-2 text-center border w-[400px]'>{product.description.length >= 40? `${product.description.substring(0, 40)}...`: product.description}</td>
                                <td className='px-4 py-2 text-center border'>{product.price}</td>
                                <td className='px-4 py-2 text-center border'><img src={`/storage/${product.feature_image}`} alt={product.name} className='h-16 w-16 object-cover' /></td>
                                <td className='px-4 py-2 text-center border'>{product.created_at_formated}</td>
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
                <Pagination products={products} perPage={data.perPage} onPerPageChange={handlePerPageChange}/>
            </div>
        </AppLayout>
    );
}
