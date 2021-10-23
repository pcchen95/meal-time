import React, { useState } from "react"
import { Div, Text } from "atomize"
import { useEffect } from "react"
import { useParams } from "react-router"
import {
  searchProducts,
  cleanSearchProducts,
} from "../../redux/reducers/productReducer"
import { useDispatch, useSelector } from "react-redux"
import PaginationButton from "../../Components/PaginationButton/PaginationButton"
import ProductCard from "../../Components/ProductSystem/ProductCard"
import ProductsPageHeader from "../../Components/ProductSystem/ProductsPageHeader"

const NoProductHint = () => {
  return (
    <Div
      m={{ t: "5rem" }}
      w="100%"
      d="flex"
      justify="center"
      textSize="display1"
      textColor="gray600"
    >
      沒有相關產品
    </Div>
  )
}

export default function ProductsPage() {
  let { keyword } = useParams()
  const dispatch = useDispatch()
  const productsData = useSelector((state) => state.products.searchedProducts)
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
    dispatch(searchProducts(keyword, queryParameters))
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    })
    return () => dispatch(cleanSearchProducts())
  }, [keyword, page, sort, order, dispatch])

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
          headerText={
            <Text textSize="title" textColor="gray600">
              搜尋：{keyword}
            </Text>
          }
          setPage={setPage}
          setSort={setSort}
          setOrder={setOrder}
        />
        {products && count === 0 && <NoProductHint />}
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
