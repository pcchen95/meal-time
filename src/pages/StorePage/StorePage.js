import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setCurrentPosition } from "../../redux/reducers/userReducer";
import { getVendorById } from "../../redux/reducers/vendorReducer";
import { Div, Text } from "atomize";
import StoreBanner from "../../Components/VendorSystem/StoreBanner";
import Dropdown from "../../Components/Dropdown";
import StoreInfo from "../../Components/VendorSystem/StoreInfo";

const ProductsList = () => {
  return (
    <>
      {["食物名稱", "食物名稱", "食物名稱", "食物名稱", "食物名稱"].map(
        (name, index) => (
          <Div
            w={{ xs: "150px", sm: "150px", md: "180px" }}
            p={{ x: "0.5rem" }}
            key={index}
          >
            <Div
              bgImg="https://images.unsplash.com/photo-1559963629-38ed0fbd4c86?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
              bgSize="cover"
              bgPos="center"
              h={{ xs: "150px", sm: "150px", md: "180px" }}
              w="100%"
              m={{ t: "1rem" }}
            />
            <Div d={{ xs: "block", xl: "flex" }} justify="space-between">
              <Text>{name}</Text>
              <Text>價錢</Text>
            </Div>
          </Div>
        )
      )}
    </>
  );
};

export default function StorePage() {
  const dispatch = useDispatch();
  const vendor = useSelector((store) => store.vendors.vendorById);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getVendorById(id));
    navigator?.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        const pos = { lat, lng };
        dispatch(setCurrentPosition(pos));
      }
    );
  }, []);

  return (
    <>
      <StoreBanner
        banner={vendor && vendor.bannerUrl}
        avatar={vendor && vendor.avatarUrl}
      />
      <Div
        w={{ xs: "100%", md: "80%" }}
        maxW="1100px"
        m="0 auto"
        p="0 1.5rem 2rem 1.5rem"
      >
        <StoreInfo />
        <Div d="flex" flexDir="column" align="center">
          <Div d="flex" p="1rem" w="100%" justify="flex-start">
            <Text p="0.5rem">選擇分類</Text>
            <Div m={{ l: "1rem" }}>
              <Dropdown />
            </Div>
          </Div>
          <Div
            w={{ xs: "300px", md: "540px", lg: "720px", xl: "900px" }}
            d="flex"
            flexWrap="wrap"
          >
            <ProductsList />
          </Div>
        </Div>
      </Div>
    </>
  );
}
