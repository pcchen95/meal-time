import React, { useState, useEffect } from "react";
import { Div, Dropdown, Anchor } from "atomize";
import { login } from "../../WebAPI/userAPI";
import { getProducts } from "../../WebAPI/productAPI";
import PropTypes from "prop-types";

const ProductListOption = () => {
  return (
    <Div p={{ x: "1rem", y: "0.5rem" }}>
      {["生鮮雜貨", "冷藏肉品", "零食", "飲品", "其他"].map((name, index) => (
        <Anchor
          key={index}
          d="block"
          p={{ y: "0.25rem" }}
          onClick={() => {
            //handleProductTypeFilter(name);
          }}
        >
          {name}
        </Anchor>
      ))}
    </Div>
  );
};

const ProductTypeFilter = (/*{ handleProductTypeFilter }*/) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <Dropdown
      w="fit-content"
      isOpen={showDropdown}
      onClick={handleToggleDropdown}
      menu={ProductListOption}
      //handleProductTypeFilter={handleProductTypeFilter}
    >
      商品種類
    </Dropdown>
  );
};

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
  const [products, setProducts] = useState([]);
  const [display, setDisplay] = useState("all");

  const DISPLAY_MAP = {
    all: (product) => product,
    //categoryId: (product) => product.categoryId == categoryId,
  };

  useEffect(() => {
    login("admin", "admin").then(() => {
      getProducts(1).then((res) => {
        setProducts(res.data.rows);
      });
    });
  }, []);

  console.log(products);

  function handleProductTypeFilter(type) {
    setDisplay(type);
  }

  return (
    <Div>
      <Div m={{ l: "5rem", r: "5rem" }}>
        <ProductTypeFilter handleProductTypeFilter={handleProductTypeFilter} />
        {products.filter(DISPLAY_MAP[display]).map((product) => (
          <ProductList key={product.id} product={product} />
        ))}
        {/*products.map((product) => (
          <ProductList key={product.id} product={product} />
        ))*/}
      </Div>
    </Div>
  );
};

export default AdminProductTypePage;
