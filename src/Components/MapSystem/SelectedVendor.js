import React from "react";
import PropTypes from "prop-types";
import { Div } from "atomize";
import VendorInfo from "./VendorInfo";
import ProductInfo from "./ProductInfo";

export default function SelectedVendor({
  vendorOfMap,
  products,
  distance,
  searchedProducts,
}) {
  return (
    <Div
      m={{ l: { lg: "2rem", xs: "0" }, t: { xs: "2rem", lg: "0" } }}
      p="1.5rem"
      d="flex"
      flexDir={{ xs: "column", sm: "row", lg: "column" }}
      justify="flex-start"
      align={{ xs: "center", sm: "flex-start", lg: "center" }}
      border="1px solid"
      borderColor="gray400"
      shadow="4"
      rounded="lg"
      w={{ xs: "100%", lg: "16rem" }}
    >
      {!vendorOfMap && (
        <Div text="title" textColor="info800">
          點選圖標以顯示店家資訊
        </Div>
      )}
      {vendorOfMap && products && (
        <>
          <VendorInfo vendorOfMap={vendorOfMap} distance={distance} />
          <Div m={{ t: { xs: "1rem", sm: "0", lg: "1rem" } }} w="100%">
            <ProductInfo
              products={products}
              searchedProducts={searchedProducts}
              id={vendorOfMap.id}
            />
          </Div>
        </>
      )}
    </Div>
  );
}

SelectedVendor.propTypes = {
  vendorOfMap: PropTypes.object,
  products: PropTypes.array,
  distance: PropTypes.string,
  searchedProducts: PropTypes.object,
};
