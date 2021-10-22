import React from "react"
import { Div } from "atomize"
import { useEffect } from "react"
import { useParams } from "react-router"
import {
  searchProducts,
  cleanSearchProducts,
  setPage,
} from "../../redux/reducers/productReducer"
import { useDispatch, useSelector } from "react-redux"
import PaginationButton from "../../Components/PaginationButton/PaginationButton"
import ProductCard from "../../Components/ProductSystem/ProductCard"

export default function ProductsPage() {
  let { keyword } = useParams()
  const dispatch = useDispatch()
  const productsData = useSelector((state) => state.products.searchedProducts)
  let products
  let count
  if (productsData) {
    products = productsData.rows
  }
  const page = useSelector((state) => state.products.page)
  const sort = useSelector((state) => state.products.sort)
  const limit = useSelector((state) => state.products.limit)
  const queryParameters = { page, sort, limit }
  let totalPages
  if (productsData) {
    count = productsData.count
    totalPages = Math.ceil(count / limit)
  }
  useEffect(() => {
    dispatch(searchProducts(keyword, queryParameters))
    return () => dispatch(cleanSearchProducts())
  }, [keyword, page, dispatch])

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
        {products && count === 0 && (
          <Div
            w="100%"
            d="flex"
            justify="center"
            textSize="display1"
            textColor="gray600"
          >
            沒有相關產品
          </Div>
        )}
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
