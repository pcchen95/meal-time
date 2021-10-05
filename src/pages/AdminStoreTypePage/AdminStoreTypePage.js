import React from "react";
// Variable Width
import { Div, Dropdown, Anchor } from "atomize";
import NavBar from "../../Components/NavBar";
import Footer from "../../Components/Footer";

const StoreListOption = (
  <Div p={{ x: "1rem", y: "0.5rem" }}>
    {["生鮮雜貨", "冷藏肉品", "零食", "飲品", "其他"].map((name, index) => (
      <Anchor d="block" p={{ y: "0.25rem" }}>
        {name}
      </Anchor>
    ))}
  </Div>
);
class StoreTypeFilter extends React.Component {
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
        menu={StoreListOption}
      >
        商家類別
      </Dropdown>
    );
  }
}
const StoreList = () => {
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
      <Div transform="translateY(25%)">1. 商家編號：5298974923</Div>
      <StoreTypeFilter />
    </Div>
  );
};

const AdminStoreTypePage = () => {
  return (
    <Div>
      <NavBar />
      <Div m={{ l: "5rem", r: "5rem" }}>
        <StoreTypeFilter />
        <StoreList></StoreList>
        <StoreList />
        <StoreList />
      </Div>
      <Footer />
    </Div>
  );
};

export default AdminStoreTypePage;
