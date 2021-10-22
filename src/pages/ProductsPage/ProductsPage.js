import React from "react"
import { Div, Text } from "atomize"
import PropTypes from "prop-types"
import styled from "styled-components"

import { useEffect } from "react"
import { Link } from "react-router-dom"
import {
  getProducts,
  cleanProducts,
  setPage,
} from "../../redux/reducers/productReducer"
import { useDispatch, useSelector } from "react-redux"
import PaginationButton from "../../Components/PaginationButton/PaginationButton"

const EllipsisText = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const Product = ({ product }) => {
  return (
    <Div
      key={product.id}
      textAlign="center"
      m={{ t: "2rem", l: { xs: "2rem", lg: "3.5rem" } }}
      p={{ x: 0 }}
      w="13rem"
      d="inline-block"
      borderColor="gray400"
      shadow="2"
      hoverShadow="4"
      border="1px solid"
      transition
      rounded="sm"
    >
      <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
        <Div
          bgImg={product.pictureUrl}
          bgSize="cover"
          bgPos="center"
          h="13rem"
          w="100%"
          rounded={{ tl: "sm", tr: "sm" }}
        />
        <Text
          textSize="title"
          textWeight="400"
          textDecor="none"
          textColor="black"
          cursor="pointer"
          rounded="sm"
          m={{ t: "0.5rem", b: "0rem" }}
          p={{ x: "1rem" }}
        >
          <EllipsisText>{product.name}</EllipsisText>
        </Text>
        <Div d="flex" align="center" m={{ t: "0.5rem", b: "0rem" }} w="100%">
          <Div
            bgImg={product.Vendor.avatarUrl || "defaultImage.png"}
            bgSize="cover"
            bgPos="center"
            h="2rem"
            w="2rem"
            rounded="circle"
            m={{ l: "1.5rem", r: "1rem", y: "0rem" }}
          ></Div>
          <Text
            textSize="subheader"
            textColor="gray600"
            cursor="pointer"
            maxW="7.5rem"
            m={{ r: "1rem", y: "0rem" }}
          >
            <EllipsisText>{product.Vendor.vendorName}</EllipsisText>
          </Text>
        </Div>

        <Text
          textSize="subheader"
          m={{ b: "0.5rem", t: "0rem" }}
          textColor="info600"
        >
          NT$ {product.price}
        </Text>
      </Link>
    </Div>
  )
}
Product.propTypes = {
  product: PropTypes.object,
}

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
    console.log(limit, count, totalPages)
  }
  useEffect(() => {
    dispatch(getProducts({ page, sort, limit }))

    return () => dispatch(cleanProducts())
  }, [page, dispatch])

  console.log(totalPages)

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
            <Product key={product.id} product={product} />
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
