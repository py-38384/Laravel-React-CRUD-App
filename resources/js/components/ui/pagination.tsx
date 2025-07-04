import React from 'react'
import { ProductPagination } from '@/pages/products' 
import { Link } from '@inertiajs/react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'

interface PaginationProps{
    products: ProductPagination,
    perPage: string,
    onPerPageChange: (value: string) => void
}

const Pagination = ({ products, perPage, onPerPageChange }: PaginationProps) => {
  return (
    <div className='flex gap-2 flex-col'>
        <p>Showing {products.from} to {products.to} from {products.total}</p> 
        <div className=''>
          <span>Row Per Page:</span>
          <Select onValueChange={onPerPageChange} value={perPage}>
            <SelectTrigger className='w-[100px]'>
              <SelectValue placeholder="Row"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='5'>5</SelectItem>
              <SelectItem value='10'>10</SelectItem>
              <SelectItem value='15'>15</SelectItem>
              <SelectItem value='20'>20</SelectItem>
              <SelectItem value='30'>30</SelectItem>
              <SelectItem value='50'>50</SelectItem>
              <SelectItem value='100'>100</SelectItem>
              <SelectItem value='-1'>All</SelectItem>
            </SelectContent>
          </Select>
        </div>
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