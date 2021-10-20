import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Div, Dropdown, Anchor } from "atomize";
import { useSelector } from "react-redux";

const lists = ({
  productCategories: categories,
  categoryId,
  setCategoryId,
  setShowDropdown,
}) => {
  return (
    <Div p={{ x: "1rem", y: "0.5rem" }}>
      {categories &&
        categories
          .filter((category) => category.id !== categoryId)
          .map((category) => {
            return (
              <Anchor
                key={category.id}
                d="block"
                p={{ y: "0.25rem" }}
                value={category.id}
                onClick={(e) => {
                  setCategoryId(Number(e.target.getAttribute("value")));
                  setShowDropdown(false);
                }}
              >
                {category.name}
              </Anchor>
            );
          })}
    </Div>
  );
};

lists.propTypes = {
  categoryId: PropTypes.number,
  setCategoryId: PropTypes.func,
  categories: PropTypes.object,
  setShowDropdown: PropTypes.func,
};

export function StoreDropdown({ categoryId, setCategoryId }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [name, setName] = useState("");
  const productCategories = useSelector(
    (store) => store.products.productCategories
  );

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    if (productCategories) {
      if (categoryId === 0) return setName("全部");
      for (let i = 0; i < productCategories.length; i++) {
        if (productCategories[i].id === categoryId)
          return setName(productCategories[i].name);
      }
    }
  }, [productCategories, categoryId]);

  return (
    <Dropdown
      w="8rem"
      isOpen={showDropdown}
      onClick={handleToggleDropdown}
      menu={lists({
        productCategories,
        categoryId,
        setCategoryId,
        setShowDropdown,
      })}
    >
      {name}
    </Dropdown>
  );
}

StoreDropdown.propTypes = {
  categoryId: PropTypes.number,
  setCategoryId: PropTypes.func,
};

export default StoreDropdown;
