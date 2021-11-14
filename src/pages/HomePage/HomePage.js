import React, { useEffect } from "react";
import { Div, Icon, Button } from "atomize";
import HomepageCarousel from "../../Components/Carousel";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  getProducts,
  cleanProducts,
} from "../../redux/reducers/productReducer";
import ProductCard from "../../Components/ProductSystem/ProductCard";
import LoadingPage from "../LoadingPage";
import { useHistory } from "react-router";

const NewItemList = ({ products, loadMoreEvent }) => {
  return (
    <Div w={{ xs: "100%" }}>
      <Div
        textAlign="center"
        textSize="heading"
        textWeight="700"
        textColor="black700"
        m={{ t: "3rem", b: "1rem" }}
      >
        最新商品
      </Div>
      <Div
        d={{ xs: "flex", md: "block", lg: "flex" }}
        flexDir={{ xs: "column", lg: "row" }}
        justify="center"
        align="center"
        m={{ r: { xs: "2rem", lg: "3.5rem" } }}
      >
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Div>
      <Div d="flex" justify="center" m={{ t: "4rem" }}>
        <Button
          suffix={
            <Icon
              name="LongRight"
              size="16px"
              color="black500"
              m={{ l: "0.25rem" }}
            />
          }
          bg="white"
          hoverBg="warning300"
          rounded="circle"
          textColor="black500"
          border="1px solid"
          borderColor="black500"
          shadow="1"
          hoverShadow="2"
          m={{ b: "3rem" }}
          onClick={loadMoreEvent}
        >
          查看更多
        </Button>
      </Div>
    </Div>
  );
};

NewItemList.propTypes = {
  products: PropTypes.array,
  loadMoreEvent: PropTypes.func,
};

const HomePage = () => {
  const history = useHistory();
  const isLoading = useSelector((store) => store.products.isLoading);
  const dispatch = useDispatch();
  const productsData = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(getProducts({ limit: 5 }));
    return () => dispatch(cleanProducts());
  }, []);

  let products;
  if (productsData) {
    products = productsData.rows;
  }
  return (
    <Div>
      {isLoading && <LoadingPage />}
      <HomepageCarousel />
      <Div d="flex" flexDir="column" align="center" justify="center">
        <NewItemList
          products={products}
          loadMoreEvent={() => history.push("/products")}
        />
      </Div>
    </Div>
  );
};

export default HomePage;
