import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Div, Dropdown, Anchor } from "atomize";
import { useSelector } from "react-redux";

const lists = ({ categories, categoryId, setCategoryId, setShowDropdown }) => {
  return (
    <Div p={{ x: "1rem", y: "0.5rem" }}>
      {categories &&
        [{ id: 0, name: "全部" }, ...categories]
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

export function VendorDropdown({
  value: categoryId,
  setCategoryId,
  isDisabled,
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [name, setName] = useState("");
  const categories = useSelector((store) => store.vendors.categories);

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    if (categories) {
      if (categoryId === 0) return setName("全部");
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
      cursor={isDisabled ? "not-allowed" : "pointer"}
    >
      {categoryId ? name : "全部"}
    </Dropdown>
  );
}

VendorDropdown.propTypes = {
  value: PropTypes.number,
  setCategoryId: PropTypes.func,
  isDisabled: PropTypes.bool,
};

export default VendorDropdown;
