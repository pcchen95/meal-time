import React, { useState, useEffect } from "react";
import { Div } from "atomize";
import PropTypes from "prop-types";
import ProductDropdown from "../../Components/AdminSystem/ProductDropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  getProductCategories,
} from "../../redux/reducers/productReducer";

const ProductList = ({ product }) => {
  return (
    <Div
      border="1px solid"
      m={{ t: "2rem" }}
      p="1rem"
      rounded="sm"
      d="flex"
      justify="space-between"
    >
      {" "}
      <Div transform="translateY(25%)">
        1. 商品編號：{product.id} {product.ProductCategory.id}{" "}
        {product.ProductCategory.name}
      </Div>
    </Div>
  );
};

ProductList.propTypes = {
  product: PropTypes.object,
  id: PropTypes.number,
  name: PropTypes.string,
  categoryId: PropTypes.number,
};

const AdminProductTypePage = () => {
  const dispatch = useDispatch();
  const [categoryId, setCategoryId] = useState(0);
  const products = useSelector((store) => store.products.products);

  useEffect(() => {
    categoryId !== 0
      ? dispatch(getProducts({ categoryId }))
      : dispatch(getProducts({}));
    dispatch(getProductCategories());
  }, [categoryId, dispatch]);

  return (
    <Div>
      <Div m={{ l: "5rem", r: "5rem" }}>
        <ProductDropdown
          categoryId={categoryId}
          setCategoryId={setCategoryId}
        />
        {products &&
          products.rows.map((product) => (
            <ProductList key={product.id} product={product} />
          ))}
      </Div>
    </Div>
  );
};

export default AdminProductTypePage;
