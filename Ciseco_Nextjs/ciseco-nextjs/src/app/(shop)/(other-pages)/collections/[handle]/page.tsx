import { Divider } from '@/components/Divider'
import { FilterSortByMenuListBox } from '@/components/FilterSortByMenu'
import { FiltersMenuTabs } from '@/components/FiltersMenu'
import ProductCard from '@/components/ProductCard'
import { getProducts } from '@/data/data'
import {
  Pagination,
  PaginationList,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
} from '@/shared/Pagination/Pagination'

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ handle: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { handle } = await params
  const sParams = await searchParams
  const page = Number(sParams?.page) || 1
  const pageSize = 8

  const products = await getProducts()
  const totalPages = Math.ceil(products.length / pageSize)
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedProducts = products.slice(startIndex, endIndex)

  return (
    <main>
      {/* TABS FILTER */}
      <div className="flex flex-wrap items-center gap-2.5">
        <FiltersMenuTabs />
        <FilterSortByMenuListBox className="ml-auto" />
      </div>

      <Divider className="mt-8" />

      {/* LOOP ITEMS */}
      <div className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 xl:grid-cols-4">
        {paginatedProducts?.map((produc) => <ProductCard data={produc} key={produc.id} />)}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="mt-20 flex justify-center lg:mt-24">
          <Pagination className="mx-auto">
            {page > 1 && <PaginationPrevious href={`?page=${page - 1}`} />}
            <PaginationList>
              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationPage key={i + 1} href={`?page=${i + 1}`} current={page === i + 1}>
                  {i + 1}
                </PaginationPage>
              ))}
            </PaginationList>
            {page < totalPages && <PaginationNext href={`?page=${page + 1}`} />}
          </Pagination>
        </div>
      )}
    </main>
  )
}
