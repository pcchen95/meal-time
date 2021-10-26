import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Div } from "atomize";

export default function ProductInfo({ products, searchedProducts, id }) {
  let lists;
  if (products && (!searchedProducts || searchedProducts.count === 0)) {
    lists = products;
  }
  if (searchedProducts && searchedProducts.count > 0) {
    lists = searchedProducts.rows.filter((product) => product.vendorId === id);
  }
  return lists.map((product) => {
    return (
      <Div
        w="100%"
        key={product.id}
        d="flex"
        m={{ y: { xs: "0.5rem", lg: "1rem" } }}
      >
        <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
          <Div
            bgImg={product.pictureUrl}
            bgSize="cover"
            bgPos="center"
            w="3rem"
            h="3rem"
            rounded="lg"
          />
        </Link>
        <Div m={{ l: "0.5rem" }}>
          <Link
            to={`/product/${product.id}`}
            style={{ textDecoration: "none" }}
          >
            <Div
              textSize="paragraph"
              textColor="black"
              hoverTextColor="info900"
            >
              {product.name}
            </Div>
          </Link>
          <Div d="flex" align="flex-end">
            <Div textSize="14px" textColor="info700">
              ${product.price}
            </Div>
            <Div textSize="12px" textColor="gray600" m={{ l: "0.3rem" }}>
              {product.ProductCategory.name}
            </Div>
          </Div>
        </Div>
      </Div>
    );
  });
}

ProductInfo.propTypes = {
  products: PropTypes.array,
  searchedProducts: PropTypes.object,
  id: PropTypes.number,
};
