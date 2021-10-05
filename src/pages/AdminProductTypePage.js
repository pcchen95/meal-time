import React from "react";
// Variable Width
import { Div, Dropdown, Anchor } from "atomize";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const ProductListOption = (
  <Div p={{ x: "1rem", y: "0.5rem" }}>
    {["生鮮雜貨", "冷藏肉品", "零食", "飲品", "其他"].map((name, index) => (
      <Anchor d="block" p={{ y: "0.25rem" }}>
        {name}
      </Anchor>
    ))}
  </Div>
);
class ProductTypeFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdown: false,
    };
  }
  render() {
    const { showDropdown } = this.state;
    return (
      <Dropdown
        w="fit-content"
        isOpen={showDropdown}
        onClick={() => this.setState({ showDropdown: !showDropdown })}
        menu={ProductListOption}
      >
        商品種類
      </Dropdown>
    );
  }
}
const ProductList = () => {
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
      <Div transform="translateY(25%)">1. 商品編號：5298974923</Div>
      <ProductTypeFilter />
    </Div>
  );
};

const AdminProductTypePage = () => {
  return (
    <Div>
      <NavBar />
      <Div m={{ l: "5rem", r: "5rem" }}>
        <ProductTypeFilter />
        <ProductList></ProductList>
        <ProductList />
        <ProductList />
      </Div>
      <Footer />
    </Div>
  );
};

export default AdminProductTypePage;
