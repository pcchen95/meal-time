import React from 'react'
import { Div, Button, Text } from 'atomize'
import SmallSizeDropdown from '../../Components/Dropdown'
import PropTypes from 'prop-types'

import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProducts, cleanProducts } from '../../redux/reducers/productReducer'
import { useDispatch, useSelector } from 'react-redux'

const Product = ({ product }) => {
  return (
    <Div
      key={product.id}
      textAlign="center"
      m={{ t: '2rem', l: { xs: '2rem', lg: '3.5rem' } }}
      d="inline-block"
    >
      <Div
        bgImg={product.pictureUrl}
        bgSize="cover"
        bgPos="center"
        m={{ t: '2rem', l: { xs: '1rem' } }}
        h="13rem"
        w="13rem"
        rounded="sm"
      />
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
        <Text
          textSize="title"
          textWeight="400"
          textDecor="none"
          textColor="black"
          cursor="pointer"
        >
          {product.name}
        </Text>
      </Link>
      <Text
        textSize="subheader"
        textColor="gray600"
        cursor="pointer"
        m={{ t: '0.5rem' }}
      >
        {product.Vendor.vendorName}
      </Text>
      <Text textSize="subheader" m={{ t: '0.5rem' }}>
        NT$ {product.price}
      </Text>
    </Div>
  )
}
Product.propTypes = {
  product: PropTypes.object,
}

export default function ProductsPage() {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products.products)
  const page = useSelector((state) => state.products.page)
  const sort = useSelector((state) => state.products.sort)
  useEffect(() => {
    dispatch(getProducts({ page, sort }))
    return () => dispatch(cleanProducts())
  }, [page, dispatch])
  const buttonList = (
    <>
      {['1', '2', '>'].map((name, index) => (
        <Button
          key={index}
          h="2rem"
          p={{ x: '1rem' }}
          textSize="caption"
          textColor="info700"
          hoverTextColor="info900"
          bg="white"
          hoverBg="info200"
          border="1px solid"
          borderColor="info700"
          hoverBorderColor="info900"
          m={{ r: '0.5rem' }}
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
        bg="gray300"
        w="78%"
        m={{ x: 'auto', y: '4rem' }}
        minH="60rem"
        p={{ b: { xs: '3rem' } }}
      >
        <Div d="flex" m={{ t: '2rem' }}>
          <Button
            h="3rem"
            p={{ x: '1.25rem' }}
            textSize="body"
            textColor="info700"
            hoverTextColor="info900"
            bg="white"
            hoverBg="info200"
            border="1px solid"
            borderColor="info700"
            hoverBorderColor="info900"
            m={{ r: '0.5rem' }}
          >
            目前分類
          </Button>
          <SmallSizeDropdown />
        </Div>
        {products &&
          products.map((product) => (
            <Product key={product.id} product={product} />
          ))}

        <Div
          m={{ t: '1rem' }}
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
