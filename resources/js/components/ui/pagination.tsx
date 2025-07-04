import React from 'react'
import { ProductPagination } from '@/pages/products' 
import { Link } from '@inertiajs/react'
interface PaginationProps{
    products: ProductPagination
}

const Pagination = ({ products }: PaginationProps) => {
  return (
    <div className='flex gap-2 flex-col'>
        <p>Showing {products.from} to {products.to} from {products.total}</p> 
        <div className='flex gap-2'>
        {products.links.map((link, index) => (
            <Link
                className={`px-3 py-3 border rounded ${link.url === null ? 'pointer-events-none opacity-50 cursor-not-allowed' : ''} ${(products.current_page === Number(link.label)) && 'pointer-events-none cursor-not-allowed bg-gray-600 text-white'}`}
                href={link.url || ''}
                key={index}
                dangerouslySetInnerHTML={{ __html: link.label }}
            />
        ))}
        </div>
    </div>
  )
}

export default Pagination