import React, { useState } from "react";
import { Div, Text, Col, Button, Icon, Input, Tag } from "atomize";
import PropTypes from "prop-types";
import { Link, useParams, useHistory } from "react-router-dom";
import {
  getProduct,
  cleanProduct,
  getVendorProducts,
  getCategoryProducts,
  cleanVendorProducts,
  cleanCategoryProducts,
} from "../../redux/reducers/productReducer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import SyncSuccessNotification from "../../Components/Notifications/SyncSuccessNotification";
import SyncWarningNotification from "../../Components/Notifications/SyncWarningNotification";
import LoadingPage from "../LoadingPage";

const ProductDetails = ({ title, content }) => {
  return (
    <Div d="flex" textSize="subheader">
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
      <Div>{content}</Div>
    </Div>
  );
};

ProductDetails.propTypes = {
  title: PropTypes.string,
  content: PropTypes.object,
};

const EllipsisText = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

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
            bgImg={product.pictureUrl || "defaultImage.png"}
            bgSize="cover"
            bgPos="center"
            h={{ xs: "12rem", lg: "8rem" }}
            w={{ xs: "100%", lg: "8rem" }}
            m={{ t: "1rem" }}
            rounded="sm"
          />
        </Col>
        <Div
          m={{ y: "1rem", r: "0rem" }}
          textAlign="center"
          textColor="black"
          p={{ x: "0.5rem" }}
          w={{ xs: "100%", lg: "9rem" }}
        >
          <EllipsisText>{product.name}</EllipsisText>
        </Div>
        <Div m={{ y: "1rem" }} textAlign="center" textColor="info800">
          <EllipsisText>NT$ {product.price}</EllipsisText>
        </Div>
      </Div>
    </Link>
  );
};
Product.propTypes = {
  product: PropTypes.object,
};

export default function SingleProductPage() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector(
    (state) => state.products.singleProductIsLoading
  );
  const user = useSelector((state) => state.users.user);
  const product = useSelector((state) => state.products.product);
  const vendorProducts = useSelector((state) => state.products.vendorProducts);
  const categoryProducts = useSelector(
    (state) => state.products.categoryProducts
  );
  const page = useSelector((state) => state.products.page);
  const sort = useSelector((state) => state.products.sort);
  const queryParameters = { page, sort, limit: 4, order: "DESC" };
  const [productCount, setProductCount] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [productInCart, setProductInCart] = useState(null);
  let now = new Date();
  now.setHours(0);
  now.setMinutes(0);
  now.setSeconds(0);
  const today = now.getTime();

  useEffect(() => {
    if (user) getProductInCart();
    setProductCount("");
    dispatch(getProduct(id));
    return () => {
      dispatch(cleanVendorProducts());
      dispatch(cleanCategoryProducts());
      dispatch(cleanProduct());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (product === 0) {
      return history.push("/");
    }
    if (product) {
      dispatch(getCategoryProducts(product.categoryId, queryParameters));
      dispatch(getVendorProducts(product.vendorId, queryParameters));
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }
  }, [product]);

  useEffect(() => {
    getProductInCart();
    if (productInCart && productInCart + productCount > product.quantity) {
      setShowWarning(true);
      setProductCount(product.quantity - productInCart);
    }
    if (product && productCount > product.quantity) {
      setProductCount(product.quantity);
    }
    if (productCount < 0) {
      setProductCount(0);
    }
  }, [productCount]);

  const getProductInCart = () => {
    if (user && product) {
      let cart = localStorage.getItem(`cartId${user.id}`) || null;
      if (!cart) return;
      const cartProduct = JSON.parse(cart).find(
        (item) => item.id === product.id
      );
      if (cartProduct) {
        if (cartProduct.quantity > product.quantity) {
          setShowWarning(true);
          setCartCountToLimit();
          return;
        }
        setProductInCart(cartProduct.quantity);
      }
    }
  };

  const setCartCountToLimit = () => {
    const newProductId = product && product.id;
    let cart = localStorage.getItem(`cartId${user.id}`) || null;
    let newCartArray = [];
    const cartArray = JSON.parse(cart);
    cartArray.forEach((item) => {
      if (item.id === newProductId) {
        newCartArray.push({
          id: newProductId,
          quantity: product.quantity,
        });
      } else {
        newCartArray.push(item);
      }
    });

    localStorage.setItem(`cartId${user.id}`, JSON.stringify(newCartArray));
    setProductCount(0);
  };

  const addToCart = (value) => {
    if (user === "non-login") {
      setShowWarning(true);
      setProductCount("");
      return;
    }
    const newProductId = product && product.id;
    let cart = localStorage.getItem(`cartId${user.id}`) || null;
    let newCartArray = [];
    const cartArray = JSON.parse(cart);
    const isProductExist = (product) => {
      return product.id === newProductId;
    };
    if (cart) {
      if (cartArray.find(isProductExist)) {
        cartArray.forEach((item) => {
          if (item.id === newProductId) {
            newCartArray.push({
              id: newProductId,
              quantity: item.quantity + value,
            });
          } else {
            newCartArray.push(item);
          }
        });
      } else {
        cartArray.forEach((item) => newCartArray.push(item));
        newCartArray.push({ id: newProductId, quantity: value });
      }
    } else {
      newCartArray = [{ id: newProductId, quantity: value }];
    }
    localStorage.setItem(`cartId${user.id}`, JSON.stringify(newCartArray));
    setProductCount(0);
  };

  return (
    <Div
      d={{ xs: "block", xl: "flex" }}
      w={{ xs: "80%", lg: "64rem" }}
      m={{ y: "2rem", x: "auto" }}
      justify="center"
    >
      {isLoading && <LoadingPage />}

      <Col>
        <Div
          d="flex"
          justify="center"
          align="center"
          bgImg={(product && product.pictureUrl) || "defaultImage.png"}
          bgSize="cover"
          bgPos="center"
          h={{ xs: "20rem", lg: "30rem" }}
          minW={{ lg: "30rem" }}
          m={{ xs: "0rem", lg: { t: "1rem" } }}
          border="1px solid"
          shadow="2"
          borderColor="gray400"
          rounded="sm"
          opacity={
            (product && Date.parse(product.expiryDate) <= today && "0.6") ||
            (product && product.quantity === 0 && "0.6")
          }
        >
          {(product && product.quantity === 0 && (
            <Div
              d="flex"
              justify="center"
              align="center"
              top="0"
              right="0"
              bg="black900"
              h="10rem"
              w="10rem"
              textSize="display1"
              rounded="circle"
            >
              <Div textColor="white">完售</Div>
            </Div>
          )) ||
            (product && Date.parse(product.expiryDate) <= today && (
              <Div
                d="flex"
                justify="center"
                align="center"
                top="0"
                right="0"
                bg="black900"
                h="10rem"
                w="10rem"
                textSize="display1"
                rounded="circle"
              >
                <Div textColor="white">已過期</Div>
              </Div>
            ))}
        </Div>
        <Div
          border="1px solid"
          shadow="2"
          borderColor="gray400"
          rounded="sm"
          m={{ t: "2rem" }}
          minW={{ lg: "30rem" }}
          p={{ x: "1rem", y: "1rem" }}
        >
          <Text textSize="title" textWeight="600" m={{ t: "0.5rem" }}>
            商品資訊
          </Text>
          <ProductDetails
            title="類別"
            content={
              product && (
                <Link
                  key={product.ProductCategory.id}
                  to={`/products/category/${product.ProductCategory.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Text textColor="info600">
                    {product.ProductCategory.name}
                  </Text>
                </Link>
              )
            }
          />
          <ProductDetails
            title="剩餘數量"
            content={
              <Div>
                {product && product.quantity}
                {product && product.quantity === 0 && (
                  <Tag
                    bg={`danger100`}
                    border="1px solid"
                    borderColor={`danger500`}
                    textColor={`danger800`}
                    m={{ l: "0.5rem", b: "0.5rem" }}
                  >
                    售罄
                  </Tag>
                )}
              </Div>
            }
          />
          <ProductDetails
            title="製造日期"
            content={
              product &&
              product.manufactureDate && (
                <Div>{product.manufactureDate.slice(0, 10)}</Div>
              )
            }
          />
          <ProductDetails
            title="有效期限"
            content={
              <Div>
                {product &&
                  product.expiryDate &&
                  product.expiryDate.slice(0, 10)}
                {product && Date.parse(product.expiryDate) <= today && (
                  <Tag
                    bg={`danger100`}
                    border="1px solid"
                    borderColor={`danger500`}
                    textColor={`danger800`}
                    m={{ l: "0.5rem", b: "0.5rem" }}
                  >
                    已過期
                  </Tag>
                )}
              </Div>
            }
          />
        </Div>
        <Div
          border="1px solid"
          shadow="2"
          borderColor="gray400"
          rounded="sm"
          minW={{ lg: "30rem" }}
          m={{ t: "2rem" }}
          p={{ x: "1rem", y: "1rem" }}
        >
          <Text textSize="title" textWeight="600" m={{ t: "0.5rem" }}>
            商品介紹
          </Text>
          <Text textSize="subheader" style={{ whiteSpace: "pre-line" }}>
            {product && product.description}
          </Text>
        </Div>
      </Col>
      <Col>
        <Div maxW={{ xs: "0px", lg: "2rem" }}></Div>
      </Col>
      <Col>
        <Div m={{ l: { xs: "0rem", lg: "0rem" }, t: "2rem" }}>
          <div>
            <Text textSize="display1" textWeight="600">
              {(product && product.name) || "載入中"}
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
                    if (productCount > 0) {
                      setProductCount(Number(productCount) - 1);
                    }
                  }}
                >
                  <Icon name="Minus" size="20px" color="info700" />
                </Button>
                <Input
                  type="number"
                  rounded="sm"
                  value={productCount}
                  textAlign="center"
                  onChange={(e) => {
                    setProductCount(e.target.value);
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
                    if (product && productCount < product.quantity) {
                      setProductCount(Number(productCount) + 1);
                    }
                  }}
                >
                  <Icon name="Plus" size="20px" color="info700" />
                </Button>
              </Div>
              <Button
                onClick={() => {
                  if (Boolean(productCount) && user) {
                    setShowSuccess(true);
                    addToCart(productCount);
                    return;
                  }
                  setShowWarning(true);
                }}
                w="100%"
                bg="info800"
                hoverBg="info900"
                hoverShadow="2"
                rounded="sm"
                m={{ b: "2rem" }}
                disabled={
                  (product && product.quantity === 0) ||
                  (product && Date.parse(product.expiryDate) <= today) ||
                  !productCount ||
                  (product && productCount > product.quantity) ||
                  (product && productCount + productInCart > product.quantity)
                }
              >
                {(!productCount && "請加入商品數量") || "新增到購物車"}
              </Button>
            </Div>
          </div>

          <Div
            border="1px solid"
            borderColor="gray400"
            p="1rem"
            rounded="sm"
            shadow="2"
          >
            <Div
              minH="10rem"
              d="flex"
              flexDir={{ xs: "column", lg: "row" }}
              align={{ xs: "center" }}
              p={{
                l: { lg: "2rem", xs: "1rem" },
                y: { lg: "1rem", xs: "1rem" },
                r: { lg: "2rem", xs: "1rem" },
              }}
            >
              <Link
                to={`/store/${product && product.vendorId}`}
                style={{ textDecoration: "none" }}
              >
                <Div
                  d="flex"
                  flexDir={{ xs: "column", lg: "row" }}
                  align={{ xs: "center", lg: "flex-start" }}
                >
                  <Div
                    bgImg={
                      (product && product.Vendor.avatarUrl) ||
                      "defaultImage.png"
                    }
                    bgSize="cover"
                    bgPos="center"
                    w="8rem"
                    h="8rem"
                    rounded="circle"
                    m={{ r: { xs: "0rem", lg: "2rem" } }}
                  />
                  <Div
                    d="flex"
                    flexDir="column"
                    minH="8rem"
                    minW="12rem"
                    m={{ xs: "0rem", lg: { l: "2rem" } }}
                    textAlign={{ xs: "center", lg: "left" }}
                    align={{ xs: "center", lg: "flex-start" }}
                  >
                    <Text
                      textSize="title"
                      m={{ t: "1rem" }}
                      textColor="info800"
                    >
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
                      <Text>
                        {product && product.Vendor.VendorCategory.name}
                      </Text>
                    </Div>
                  </Div>
                </Div>
              </Link>
            </Div>
            <Div d="flex" align="center" flexDir={{ xs: "column", lg: "row" }}>
              <Text
                textSize="subheader"
                m="1rem"
                textAlign={{ xs: "center", lg: "left" }}
              >
                此賣家其他食物
              </Text>
              <Button
                bg="white"
                textColor="info700"
                hoverTextColor="info900"
                hoverBg="info200"
                border="1px solid"
                borderColor="info700"
                hoverBorderColor="info900"
                rounded="circle"
                onClick={() =>
                  history.push(`/store/${product && product.vendorId}`)
                }
              >
                <Text m={{ r: "0.5rem" }}>看更多</Text>
                <Icon name="External" size="1rem" color="info700" />
              </Button>
            </Div>

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
          <Div
            border="1px solid"
            borderColor="gray400"
            p="1rem"
            rounded="sm"
            shadow="2"
            m={{ t: "2rem" }}
          >
            <Div d="flex" align="center" flexDir={{ xs: "column", lg: "row" }}>
              <Text
                textSize="subheader"
                m="1rem"
                textAlign={{ xs: "center", lg: "left" }}
              >
                此分類其他食物
              </Text>
              <Button
                bg="white"
                textColor="info700"
                hoverTextColor="info900"
                hoverBg="info200"
                border="1px solid"
                borderColor="info700"
                hoverBorderColor="info900"
                rounded="circle"
                onClick={() =>
                  history.push(
                    `/products/category/${product && product.categoryId}`
                  )
                }
              >
                <Text m={{ r: "0.5rem" }}>看更多</Text>
                <Icon name="External" size="1rem" color="info700" />
              </Button>
            </Div>
            <Div d={{ xs: "block", lg: "flex" }}>
              {product &&
                categoryProducts &&
                categoryProducts.rows
                  .filter((item) => item.id !== product.id)
                  .slice(0, 3)
                  .map((product) => (
                    <Product key={product.id} product={product} />
                  ))}
            </Div>
          </Div>
        </Div>
      </Col>
      <SyncSuccessNotification
        showSuccess={showSuccess}
        setShowSuccess={setShowSuccess}
        successMessage={`成功加入購物車`}
      />
      <SyncWarningNotification
        showWarning={showWarning}
        setShowWarning={setShowWarning}
        warningMessage={
          ((user === null || user === "non-login") && "請登入") ||
          "購物車內數量達上限"
        }
      />
    </Div>
  );
}
