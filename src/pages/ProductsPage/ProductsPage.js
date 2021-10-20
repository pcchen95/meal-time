import React from "react"
import { Div, Button, Text } from "atomize"
import PropTypes from "prop-types"

import { useEffect } from "react"
import { Link } from "react-router-dom"
import { getProducts, cleanProducts } from "../../redux/reducers/productReducer"
import { useDispatch, useSelector } from "react-redux"

const Product = ({ product }) => {
  return (
    <Div
      key={product.id}
      textAlign="center"
      m={{ t: "2rem", l: { xs: "2rem", lg: "3.5rem" } }}
      p={{ x: 0 }}
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
          w="13rem"
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
        >
          {product.name}
        </Text>
        <Div d="flex" align="center" m={{ t: "0.5rem", b: "0rem" }}>
          <Div
            bgImg={product.Vendor.avatarUrl || "defaultImage.png"}
            bgSize="cover"
            bgPos="center"
            h="2rem"
            w="2rem"
            rounded="circle"
            m={{ l: "1.5rem", r: "1rem" }}
          ></Div>
          <Text textSize="subheader" textColor="gray600" cursor="pointer">
            {product.Vendor.vendorName}
          </Text>
        </Div>

        <Text textSize="subheader" m="0rem">
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
    count = productsData.count
  }

  const page = useSelector((state) => state.products.page)
  const sort = useSelector((state) => state.products.sort)
  const limit = useSelector((state) => state.products.limit)
  useEffect(() => {
    dispatch(getProducts({ page, sort, limit }))
    return () => dispatch(cleanProducts())
  }, [page, dispatch])
  const totalPages = Math.ceil(limit / count)

  console.log(totalPages)

  const buttonList = (
    <>
      {["1", "2", ">"].map((name, index) => (
        <Button
          key={index}
          h="2rem"
          p={{ x: "1rem" }}
          textSize="caption"
          textColor="info700"
          hoverTextColor="info900"
          bg="white"
          hoverBg="info200"
          border="1px solid"
          borderColor="info700"
          hoverBorderColor="info900"
          m={{ r: "0.5rem" }}
        >
          {name}
        </Button>
      ))}
    </>
  )

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
          {buttonList}
        </Div>
      </Div>
    </>
  )
}
