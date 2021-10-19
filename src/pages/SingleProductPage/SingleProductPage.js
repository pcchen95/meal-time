import React, { useState } from "react"
import { Div, Text, Col, Button, Icon, Input } from "atomize"
import PropTypes from "prop-types"
import { Link, useParams } from "react-router-dom"
import {
  getProduct,
  cleanProduct,
  getVendorProducts,
  getCategoryProducts,
  cleanVendorProducts,
  cleanCategoryProducts,
} from "../../redux/reducers/productReducer"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const ProductDetails = ({ title, content }) => {
  return (
    <Div d={{ xs: "block", xl: "flex" }} textSize="subheader">
      <Text
        textColor="gray900"
        m={{ y: "0rem", r: "1rem" }}
        w="5rem"
        textWeight="600"
        textAlign={{ xs: "left", md: "justify" }}
        style={{ textAlignLast: "justify" }}
      >
        {title}
      </Text>
      <Text>{content}</Text>
    </Div>
  )
}

ProductDetails.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
}

const Product = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
      <Div
        key={product.id}
        borderColor="gray400"
        shadow="2"
        hoverShadow="4"
        m={{ x: { xs: "1rem", lg: "0.5rem" } }}
        p={{ x: 0, b: "0.2rem" }}
        transition
      >
        <Col>
          <Div
            bgImg={product.pictureUrl}
            bgSize="cover"
            bgPos="center"
            h={{ xs: "12rem", lg: "8rem" }}
            w={{ xs: "100%", lg: "8rem" }}
            m={{ t: "1rem" }}
            rounded="sm"
          />
        </Col>
        <Text m={{ y: "1rem" }} textAlign="center">
          {product.name}
        </Text>
        <Text m={{ y: "1rem" }} textAlign="center">
          NT$ {product.price}
        </Text>
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
  const user = useSelector((state) => state.users.user)
  const product = useSelector((state) => state.products.product)
  const vendorProducts = useSelector((state) => state.products.vendorProducts)
  const categoryProducts = useSelector(
    (state) => state.products.categoryProducts
  )
  const page = useSelector((state) => state.products.page)
  const sort = useSelector((state) => state.products.sort)
  const queryParameters = { page, sort, limit: 4, order: "DESC" }
  const [productCoount, setProductCount] = useState(null)

  useEffect(() => {
    dispatch(getProduct(id))
    return () => {
      dispatch(cleanVendorProducts())
      dispatch(cleanCategoryProducts())
      dispatch(cleanProduct())
    }
  }, [id, dispatch])

  useEffect(() => {
    if (product) {
      dispatch(getCategoryProducts(product.categoryId, queryParameters))
      dispatch(getVendorProducts(product.vendorId, queryParameters))
    }
  }, [product, dispatch])

  useEffect(() => {
    if (product && productCoount > product.quantity) {
      setProductCount(product.quantity)
    }
    if (productCoount < 0) {
      setProductCount(0)
    }
  }, [productCoount])

  const addToCart = (value) => {
    const newVendorId = product && product.vendorId
    const newProductId = product && product.id
    let cart = localStorage.getItem(`cartId${user.id}`) || null
    const newCartArray = []
    const cartArray = JSON.parse(cart)

    const isVendorExist = (cartByVendor) => {
      return cartByVendor.vendorId === newVendorId
    }
    const isProductExist = (product) => {
      return product.productId === newProductId
    }
    if (cart) {
      if (cartArray.find(isVendorExist)) {
        if (cartArray.find(isVendorExist).cartItems.find(isProductExist)) {
          cartArray.forEach((element) => {
            element.vendorId === newVendorId
              ? newCartArray.push({
                  vendorId: newVendorId,
                  cartItems: element.cartItems.map((product) => {
                    if (product.productId !== newProductId) return product
                    return {
                      ...product,
                      quantity: product.quantity + value,
                    }
                  }),
                })
              : newCartArray.push(element)
          })
          localStorage.setItem(`cartId${user.id}`, JSON.stringify(newCartArray))
        } else {
          cartArray.forEach((element) => {
            element.vendorId === newVendorId
              ? newCartArray.push({
                  vendorId: newVendorId,
                  cartItems: [
                    ...element.cartItems,
                    { productId: newProductId, quantity: value },
                  ],
                })
              : newCartArray.push(element)
          })
          localStorage.setItem(`cartId${user.id}`, JSON.stringify(newCartArray))
        }
      } else {
        cartArray.forEach((element) => newCartArray.push(element))
        newCartArray.push({
          vendorId: newVendorId,
          cartItems: [{ productId: newProductId, quantity: value }],
        })
      }
      localStorage.setItem(`cartId${user.id}`, JSON.stringify(newCartArray))
    } else {
      let newCartArray = [
        {
          vendorId: newVendorId,
          cartItems: [{ productId: newProductId, quantity: value }],
        },
      ]
      localStorage.setItem(`cartId${user.id}`, JSON.stringify(newCartArray))
    }
    setProductCount(0)
  }

  return (
    <Div w={{ xs: "80%", lg: "60%" }} m={{ y: "2rem", x: "auto" }}>
      <Div d="flex" p={{ l: "0.4rem" }}>
        <Text>Home</Text>/<Text>Category</Text>
      </Div>
      <Div d={{ xs: "block", xl: "flex" }} w={{ xs: "100%", lg: "24rem" }}>
        <div>
          <Col>
            <Div
              bgImg={product && product.pictureUrl}
              bgSize="cover"
              bgPos="center"
              h={{ xs: "20rem", lg: "30rem" }}
              w={{ xs: "20rem", lg: "30rem" }}
              m={{ t: "1rem" }}
              border="1px solid"
              shadow="2"
              borderColor="gray400"
              rounded="sm"
            />
          </Col>

          <Div
            border="1px solid"
            shadow="2"
            borderColor="gray400"
            rounded="sm"
            m={{ t: "2rem", x: "0.5rem" }}
            w={{ xs: "20rem", lg: "30rem" }}
            p={{ x: "1rem", y: "1rem" }}
          >
            <Text textSize="title" textWeight="600" m={{ t: "0.5rem" }}>
              商品資訊
            </Text>
            <ProductDetails
              title="類別"
              content={product && product.ProductCategory.name}
            />
            <ProductDetails
              title="剩餘數量"
              content={product && product.quantity}
            />
            <ProductDetails
              title="製造日期"
              content={product && product.manufactureDate.slice(0, 10)}
            />
            <ProductDetails
              title="有效期限"
              content={product && product.expiryDate.slice(0, 10)}
            />
          </Div>
          <Div
            border="1px solid"
            shadow="2"
            borderColor="gray400"
            rounded="sm"
            m={{ t: "2rem", x: "0.5rem" }}
            w={{ xs: "20rem", lg: "30rem" }}
            p={{ x: "1rem", y: "1rem" }}
          >
            <Text textSize="title" textWeight="600" m={{ t: "0.5rem" }}>
              商品介紹
            </Text>
            <Text textSize="subheader">{product && product.description}</Text>
          </Div>
        </div>
        <Div m={{ l: { xs: "1rem", lg: "5rem" }, t: "2rem" }}>
          <div>
            <Text textSize="display1" textWeight="600">
              {product && product.name}
            </Text>
            <Text textSize="heading" m={{ y: "1rem" }}>
              NT$ {product && product.price}
            </Text>
            <Div d={{ xs: "block", lg: "flex" }}>
              <Div d="flex" m={{ b: "2rem" }}>
                <Button
                  h="2.5rem"
                  w="2.5rem"
                  bg="transparent"
                  hoverBg="info300"
                  rounded="sm"
                  m={{ r: "0" }}
                  onClick={() => {
                    if (productCoount > 0) {
                      setProductCount(Number(productCoount) - 1)
                    }
                  }}
                >
                  <Icon name="Minus" size="20px" color="info700" />
                </Button>
                <Input
                  type="number"
                  rounded="sm"
                  value={productCoount}
                  textAlign="center"
                  onChange={(e) => {
                    setProductCount(e.target.value)
                  }}
                  min={0}
                  max={product && product.quantity}
                  minW="6rem"
                  title={`請輸入 0~${product && product.quantity} 內的數字`}
                />
                <Button
                  h="2.5rem"
                  w="2.5rem"
                  bg="transparent"
                  hoverBg="info300"
                  rounded="sm"
                  m={{ x: "0" }}
                  onClick={() => {
                    if (product && productCoount < product.quantity) {
                      setProductCount(Number(productCoount) + 1)
                    }
                  }}
                >
                  <Icon name="Plus" size="20px" color="info700" />
                </Button>
              </Div>
              <Button
                onClick={() => {
                  addToCart(productCoount)
                }}
                w="100%"
                bg="info800"
                hoverBg="info900"
                hoverShadow="2"
                rounded="sm"
                m={{ b: "2rem" }}
              >
                新增到購物車
              </Button>
            </Div>
          </div>
          <Div
            m={{ t: "2rem" }}
            minH="10rem"
            border={{ t: "2px solid" }}
            borderColor="gray600"
            d={{ xs: "block", lg: "flex" }}
            p={{
              l: { lg: "2rem", xs: "3.2rem" },
              y: { lg: "2rem", xs: "2rem" },
              r: { lg: "2rem", xs: "2rem" },
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
                m={{ t: "1rem" }}
              />
            </Col>
            <Div minH="8rem" minW="12rem" m={{ l: "2rem" }}>
              <Text textSize="title" m={{ t: "1rem" }}>
                {product && product.Vendor.vendorName}
              </Text>
              <Div d="flex">
                <Text
                  textColor="gray900"
                  m={{ y: "0rem", r: "1rem" }}
                  textWeight="600"
                >
                  賣家分類
                </Text>
                <Text>{product && product.Vendor.VendorCategory.name}</Text>
              </Div>
            </Div>
          </Div>
          <Div border={{ t: "2px solid" }} borderColor="gray600" p="1rem">
            <Text textSize="subheader" m="1rem">
              此賣家其他食物
            </Text>
            <Div d={{ xs: "block", lg: "flex" }}>
              {product &&
                vendorProducts &&
                vendorProducts
                  .filter((item) => item.id !== product.id)
                  .slice(0, 3)
                  .map((product) => (
                    <Product key={product.id} product={product} />
                  ))}
            </Div>
          </Div>
          <Div border={{ t: "2px solid" }} borderColor="gray600" p="1rem">
            <Text textSize="subheader" m="1rem">
              此分類其他食物
            </Text>
            <Div d={{ xs: "block", lg: "flex" }}>
              {product &&
                categoryProducts &&
                categoryProducts
                  .filter((item) => item.id !== product.id)
                  .slice(0, 3)
                  .map((product) => (
                    <Product key={product.id} product={product} />
                  ))}
            </Div>
          </Div>
        </Div>
      </Div>
    </Div>
  )
}
