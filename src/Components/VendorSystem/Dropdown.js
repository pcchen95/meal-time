import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Div, Dropdown, Anchor } from "atomize";
import { useSelector } from "react-redux";

const lists = ({ categories, categoryId, setCategoryId, setShowDropdown }) => {
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

export function SmallDropdown({ value: categoryId, setCategoryId }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [name, setName] = useState("");
  const categories = useSelector((store) => store.vendors.categories);
  const isVendor = useSelector((store) => store.vendors.vendor || false);
  const isOpen = useSelector(
    (store) => store.vendors.vendor && store.vendors.vendor.isOpen
  );
  const isSuspended = useSelector(
    (store) => store.vendors.vendor && store.vendors.vendor.isSuspended
  );
  const isDisabled = isVendor && (!isOpen || isSuspended);

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    if (categories) {
      for (let i = 0; i < categories.length; i++) {
        if (categories[i].id === categoryId) return setName(categories[i].name);
      }
    }
  }, [categories, categoryId]);

  return (
    <Dropdown
      w="fit-content"
      isOpen={!isDisabled && showDropdown}
      onClick={handleToggleDropdown}
      textColor={isDisabled && "gray600"}
      menu={lists({ categories, categoryId, setCategoryId, setShowDropdown })}
    >
      {name}
    </Dropdown>
  );
}

SmallDropdown.propTypes = {
  value: PropTypes.number,
  setCategoryId: PropTypes.func,
};

export default SmallDropdown;
