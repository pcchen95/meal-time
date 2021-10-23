import React, { useState } from "react"
import { Div } from "atomize"

import { useEffect } from "react"
import { getProducts, cleanProducts } from "../../redux/reducers/productReducer"
import { useDispatch, useSelector } from "react-redux"
import PaginationButton from "../../Components/PaginationButton/PaginationButton"
import ProductCard from "../../Components/ProductSystem/ProductCard"
import ProductsPageHeader from "../../Components/ProductSystem/ProductsPageHeader"

export default function ProductsPage() {
  const dispatch = useDispatch()
  const productsData = useSelector((state) => state.products.products)
  let products
  let count
  if (productsData) {
    products = productsData.rows
  }
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState("id")
  const limit = 10
  const [order, setOrder] = useState("DESC")
  const queryParameters = { page, sort, limit, order }
  let totalPages
  if (productsData) {
    count = productsData.count
    totalPages = Math.ceil(count / limit)
  }
  useEffect(() => {
    dispatch(getProducts(queryParameters))
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    })
    return () => dispatch(cleanProducts())
  }, [page, sort, order, dispatch])

  return (
    <>
      <Div
        pos="relative"
        w="78%"
        m={{ x: "auto", y: "4rem" }}
        minH="60rem"
        p={{ b: { xs: "5rem" } }}
      >
        <ProductsPageHeader
          headerText={<Div />}
          setPage={setPage}
          setSort={setSort}
          setOrder={setOrder}
        />
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

        <PaginationButton
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      </Div>
    </>
  )
}
