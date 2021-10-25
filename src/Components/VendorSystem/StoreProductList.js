import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Div } from "atomize";

const ProductsList = ({ products, hoverItem, setHoverItem }) => {
  return products.map((product) => (
    <Div
      w={{ xs: "150px", sm: "150px", md: "180px" }}
      p={{ x: "0.5rem" }}
      key={product.id}
      onMouseEnter={() => setHoverItem(product.id)}
      onMouseLeave={() => setHoverItem(null)}
      transform={product.id === hoverItem && "scale(1.02)"}
    >
      <Link to={`/product/${product.id}`}>
        <Div
          bgImg={product.pictureUrl}
          bgSize="cover"
          bgPos="center"
          rounded="sm"
          h={{ xs: "150px", sm: "150px", md: "180px" }}
          w="100%"
          m={{ t: "1rem" }}
          cursor="pointer"
          border="1px solid"
          borderColor="gray300"
        />
      </Link>
      <Div>
        <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
          <Div
            w="100%"
            textAlign="center"
            textSize="14px"
            textColor="black800"
            m={{ t: "0.5rem" }}
            cursor="pointer"
            style={{
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {product.name}
          </Div>
        </Link>
        <Div
          w="100%"
          textAlign="center"
          textSize="14px"
          textColor="info800"
          m={{ t: "0.5rem" }}
        >
          ${product.price}
        </Div>
      </Div>
    </Div>
  ));
};

ProductsList.propTypes = {
  products: PropTypes.array,
  hoverItem: PropTypes.number,
  setHoverItem: PropTypes.func,
};

export default ProductsList;
