import React, { useState, useEffect } from "react";
import { Div } from "atomize";
import PropTypes from "prop-types";
import {
  getCategories,
  getAllVendors,
} from "../../redux/reducers/vendorReducer";
import { useDispatch, useSelector } from "react-redux";
import { EditVendorButton } from "../../Components/AdminSystem/EditButtonGroup";
import VendorDropdown from "../../Components/AdminSystem/VendorDropdown";
import LoadingPage from "../LoadingPage/LoadingPage";

const StoreList = ({ vendor }) => {
  return (
    <Div
      border="1px solid"
      m={{ t: "2rem" }}
      p="1rem"
      rounded="sm"
      d="flex"
      justify="flex-start"
      hoverBg="info900"
      hoverTextColor="white"
      cursor="pointer"
    >
      <Div>商家編號：{vendor.id} | </Div>
      <Div m={{ l: "1rem" }}>商家名稱：{vendor.vendorName} |</Div>
      <Div m={{ l: "1rem" }}>
        商家分類：
        {vendor.VendorCategory.name}
      </Div>
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
  const dispatch = useDispatch();
  const [categoryId, setCategoryId] = useState(0);
  const vendors = useSelector((store) => store.vendors.vendors);
  const isLoadingVendor = useSelector((store) => store.vendors.isLoading);
  console.log(vendors);

  useEffect(() => {
    categoryId !== 0
      ? dispatch(getAllVendors({ categoryId }))
      : dispatch(getAllVendors({}));
    dispatch(getCategories());
  }, [categoryId, dispatch]);

  return (
    <Div>
      {isLoadingVendor && <LoadingPage />}
      <Div m={{ l: "5rem", r: "5rem" }} fontFamily="code" textSize="subheader">
        <Div d="flex" justify="space-between">
          <VendorDropdown
            categoryId={categoryId}
            setCategoryId={setCategoryId}
          />
          <EditVendorButton />
        </Div>
        {vendors &&
          vendors.map((vendor) => (
            <StoreList key={vendor.id} vendor={vendor} />
          ))}
      </Div>
    </Div>
  );
};

export default AdminStoreTypePage;
