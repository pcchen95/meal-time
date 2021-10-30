import React from "react";
import { Div, Dropdown, Anchor } from "atomize";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const categoriesMenu = ({ categories }) => {
  return (
    <Div p={{ x: "1rem", y: "0.5rem" }}>
      {categories &&
        categories.map((category) => {
          return (
            <Anchor
              href={`#/products/category/${category.id}`}
              key={category.id}
              d="block"
              p={{ y: "0.25rem" }}
            >
              {category.name}
            </Anchor>
          );
        })}
    </Div>
  );
};

export function SmallSizeDropdown() {
  const categories = useSelector((store) => store.products.productCategories);
  return (
    <Dropdown
      w="fit-content"
      p={{ x: "1rem" }}
      targetHover
      menu={categoriesMenu({ categories })}
      hoverTextColor="info800"
      border="none"
      hoverBg="none"
      focusBg="none"
      textSize="subheader"
      textWeight="600"
      closeSuffix=""
    >
      分類搜尋
    </Dropdown>
  );
}

SmallSizeDropdown.propTypes = {
  categories: PropTypes.array,
};
export default SmallSizeDropdown;
