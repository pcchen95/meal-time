import React from "react"
import { Div } from "atomize"

import { useEffect } from "react"
import {
  getProducts,
  cleanProducts,
  setPage,
} from "../../redux/reducers/productReducer"
import { useDispatch, useSelector } from "react-redux"
import PaginationButton from "../../Components/PaginationButton/PaginationButton"
import ProductCard from "../../Components/ProductSystem/ProductCard"

export default function ProductsPage() {
  const dispatch = useDispatch()
  const productsData = useSelector((state) => state.products.products)
  let products
  let count
  if (productsData) {
    products = productsData.rows
  }
  const page = useSelector((state) => state.products.page)
  const sort = useSelector((state) => state.products.sort)
  const limit = useSelector((state) => state.products.limit)
  let totalPages
  if (productsData) {
    count = productsData.count
    totalPages = Math.ceil(count / limit)
  }
  useEffect(() => {
    dispatch(getProducts({ page, sort, limit }))

    return () => dispatch(cleanProducts())
  }, [page, dispatch])

  const clickPagination = (action) => {
    if (action === "next") {
      dispatch(setPage(page + 1))
    } else if (action === "back") {
      dispatch(setPage(page - 1))
    }
  }
  return (
    <>
      <Div
        pos="relative"
        w="78%"
        m={{ x: "auto", y: "4rem" }}
        minH="60rem"
        p={{ b: { xs: "3rem" } }}
      >
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

        <Div
          m={{ t: "1rem" }}
          pos="absolute"
          right="2rem"
          bottom="1rem"
          d="flex"
        >
          <PaginationButton
            page={page}
            handlePageClick={clickPagination}
            limit={totalPages}
          />
        </Div>
      </Div>
    </>
  )
}
