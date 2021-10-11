import React from 'react'
import { Div, Text, Col, Button } from 'atomize'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom'
import {
  getProduct,
  cleanProduct,
  getVendorProducts,
  getCategoryProducts,
  // cleanVendorProducts,
  // cleanCategoryProducts,
} from '../../redux/reducers/productReducer'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Product = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
      <Div key={product.id} p={{ l: { xs: '3rem', lg: '1rem' } }}>
        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
          <Col>
            <Div
              bgImg={product.pictureUrl}
              bgSize="cover"
              bgPos="center"
              h="8rem"
              w="8rem"
              m={{ t: '1rem' }}
            />
          </Col>
          <Text m={{ y: '1rem', l: '2.2rem' }}>{product.name}</Text>
        </Link>
      </Div>
    </Link>
  )
}
Product.propTypes = {
  product: PropTypes.object,
}

export default function SingleProductPage() {
  let { id } = useParams()
  const dispatch = useDispatch()
  const product = useSelector((state) => state.products.product)
  const vendorProducts = useSelector((state) => state.products.vendorProducts)
  const categoryProducts = useSelector(
    (state) => state.products.categoryProducts
  )
  const page = useSelector((state) => state.products.page)
  const sort = useSelector((state) => state.products.sort)
  const queryParameters = { page, sort, limit: 3, order: 'DESC' }

  useEffect(() => {
    dispatch(getProduct(id))
    return () => dispatch(cleanProduct())
  }, [id, dispatch])

  useEffect(() => {
    if (product) {
      dispatch(getCategoryProducts(product.categoryId, queryParameters))
      dispatch(getVendorProducts(product.vendorId, queryParameters))
    }
  }, [product, dispatch])

  return (
    <Div w={{ xs: '80%', lg: '60%' }} m={{ y: '2rem', x: 'auto' }}>
      <Div d="flex">
        <Text>Home</Text>/<Text>Category</Text>
      </Div>
      <Div d={{ xs: 'block', xl: 'flex' }} w={{ xs: '18rem', lg: '30rem' }}>
        <div>
          <Col>
            <Div
              bgImg={product && product.pictureUrl}
              bgSize="cover"
              bgPos="center"
              h={{ xs: '20rem', lg: '30rem' }}
              m={{ l: '2rem', t: '1rem' }}
            />
          </Col>
          <Text
            h={{ xs: '12rem', lg: '30rem' }}
            w={{ xs: '15rem', lg: '30rem' }}
            bg="gray400"
            m={{ t: '3rem', l: '2rem' }}
            textSize="subheader"
            border="1px solid"
            shadow="2"
            borderColor="gray400"
            rounded="sm"
          >
            {product && product.description}
          </Text>
        </div>
        <Div m={{ l: { xs: '1rem', lg: '5rem' }, t: '2rem' }}>
          <div>
            <Text tag="h1">{product && product.name}</Text>
            <Text m={{ t: '1rem' }}>NT $ {product && product.price}</Text>
            <Text m={{ t: '1rem' }}>Distance：</Text>
            <Text m={{ t: '1rem' }}>
              生產日期：{product && product.manufactureDate}
            </Text>
            <label>
              數量：{product && product.quantity}
              <select>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </label>
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
              m={{ r: '0.5rem', t: '2rem' }}
            >
              放入購物車
            </Button>
          </div>
          <Div
            m={{ t: '2rem' }}
            minH="10rem"
            border={{ t: '2px solid' }}
            borderColor="gray600"
            d={{ xs: 'block', lg: 'flex' }}
            p={{
              l: { lg: '2rem', xs: '3.2rem' },
              y: { lg: '2rem', xs: '2rem' },
              r: { lg: '2rem', xs: '2rem' },
            }}
          >
            <Col>
              <Div
                bgImg={product && product.Vendor.avatarUrl}
                bgSize="cover"
                bgPos="center"
                w="8rem"
                h="8rem"
                rounded="circle"
                m={{ t: '1rem' }}
              />
            </Col>
            <Div minH="8rem" minW="12rem" m={{ l: '2rem' }}>
              <Text textSize="title" m={{ t: '1rem' }}>
                {product && product.Vendor.vendorName}
              </Text>
              <Text textSize="subheader" m={{ t: '1rem' }}>
                {product && product.Vendor.categoryId}
              </Text>
            </Div>
          </Div>
          <Div border={{ t: '2px solid' }} borderColor="gray600" p="1rem">
            <Text textSize="subheader" m="1rem">
              此賣家其他食物
            </Text>
            <Div d={{ xs: 'block', lg: 'flex' }}>
              {vendorProducts &&
                vendorProducts.map((product) => (
                  <Product key={product.id} product={product} />
                ))}
            </Div>
          </Div>
          <Div border={{ t: '2px solid' }} borderColor="gray600" p="1rem">
            <Text textSize="subheader" m="1rem">
              此分類其他食物
            </Text>
            <Div d={{ xs: 'block', lg: 'flex' }}>
              {categoryProducts &&
                categoryProducts.map((product) => (
                  <Product key={product.id} product={product} />
                ))}
            </Div>
          </Div>
        </Div>
      </Div>
    </Div>
  )
}
