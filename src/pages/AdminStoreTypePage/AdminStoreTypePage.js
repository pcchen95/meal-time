import React, { useState, useEffect } from "react";
import { Div, Dropdown, Anchor } from "atomize";
import { login } from "../../WebAPI/userAPI";
import { getAllVendorProfiles } from "../../WebAPI/vendorAPI";
import PropTypes from "prop-types";

const StoreListOption = (
  <Div p={{ x: "1rem", y: "0.5rem" }}>
    {["生鮮雜貨", "冷藏肉品", "零食", "飲品", "其他"].map((name, index) => (
      <Anchor key={index} d="block" p={{ y: "0.25rem" }}>
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

const StoreList = ({ vendor }) => {
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
        1. 商家編號：{vendor.id}
        {vendor.vendorName}
      </Div>
      <StoreTypeFilter />
    </Div>
  );
};

StoreList.propTypes = {
  vendor: PropTypes.object,
  id: PropTypes.number,
  nickname: PropTypes.string,
  role: PropTypes.string,
};

const AdminStoreTypePage = () => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    login("admin", "admin").then(() => {
      getAllVendorProfiles(1).then((res) => {
        setVendors(res.data.rows);
      });
    });
  }, []);

  console.log(vendors);

  return (
    <Div>
      <Div m={{ l: "5rem", r: "5rem" }}>
        <StoreTypeFilter />
        {vendors.map((vendor) => (
          <StoreList key={vendor.id} vendor={vendor} />
        ))}
      </Div>
    </Div>
  );
};

export default AdminStoreTypePage;
