import React, { useState } from "react";
import { Div, Dropdown, Anchor } from "atomize";

const categories = (
  <Div p={{ x: "1rem", y: "0.5rem" }}>
    {["蔬食水果", "麵包", "飲品"].map((name, index) => (
      <Anchor key={index} d="block" p={{ y: "0.25rem" }}>
        {name}
      </Anchor>
    ))}
  </Div>
);

export function SmallSizeDropdown() {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <Dropdown
      w="fit-content"
      isOpen={showDropdown}
      onClick={handleToggleDropdown}
      menu={categories}
    >
      分類選單
    </Dropdown>
  );
}
export default SmallSizeDropdown;
