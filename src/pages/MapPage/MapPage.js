import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setCurrentPosition } from "../../redux/reducers/userReducer";
import {
  getCategories,
  getAllVendors,
  getVendorOfMap,
} from "../../redux/reducers/vendorReducer";
import { Div, Text, Button, Icon } from "atomize";
import Map from "../../Components/MapSystem/Map";
import Dropdown from "../../Components/MapSystem/Dropdown";

const ProductInfo = () => {
  return ["食物名稱", "食物分類", "食物單價"].map((name, index) => (
    <Div key={index} p={{ l: { xs: "3rem", lg: "1rem" } }}>
      <Text m={{ y: "1rem", l: "2.2rem" }}>{name}</Text>
    </Div>
  ));
};

export default function MapPage() {
  const dispatch = useDispatch();
  const [distance, setDistance] = useState(null);
  const [vendorOfMap, setVendorOfMap] = useState(null);
  const [categoryId, setCategoryId] = useState(0);
  const currentPosition = useSelector((store) => store.users.position);
  const vendors = useSelector((store) => store.vendors.vendors);

  const handleEvent = (id) => {
    dispatch(getVendorOfMap(id)).then((vendor) => setVendorOfMap(vendor));
  };

  useEffect(() => {
    categoryId !== 0
      ? dispatch(getAllVendors({ categoryId }))
      : dispatch(getAllVendors({}));
    dispatch(getCategories());
    navigator?.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        const pos = { lat, lng };
        dispatch(setCurrentPosition(pos));
      }
    );
  }, [categoryId, dispatch]);

  return (
    <Div w="80%" m={{ y: "2rem", x: "auto" }}>
      <Div d="flex" w="100%" justify="flex-start">
        <Text p="0.5rem">選擇分類</Text>
        <Div>
          <Dropdown categoryId={categoryId} setCategoryId={setCategoryId} />
        </Div>
      </Div>
      <Div
        w="100%"
        m={{ y: "1rem" }}
        d={{ xs: "block", lg: "flex" }}
        justify="space-between"
      >
        <Div
          w={{ xs: "18rem", md: "calc(100% - 18rem)" }}
          h={{ xs: "16rem", md: "32rem", lg: "50rem" }}
        >
          <Map
            vendorOfMap={vendorOfMap}
            handleEvent={handleEvent}
            setDistance={setDistance}
          />
        </Div>
        <Div
          m={{ l: { lg: "2rem", xs: "0" }, t: { xs: "2rem", lg: "0" } }}
          p="1.5rem"
          d="flex"
          flexDir="column"
          justify="flex-start"
          align="center"
          border="1px solid"
          borderColor="gray400"
          shadow="4"
          rounded="lg"
          w="16rem"
        >
          {!vendorOfMap && (
            <Div text="title" textColor="info800">
              點選圖標以顯示店家資訊
            </Div>
          )}
          {vendorOfMap && (
            <>
              <Div
                w="100%"
                d="flex"
                flexDir="column"
                align="center"
                border={{ b: "2px solid" }}
                p={{ b: "0.5rem" }}
                borderColor="gray400"
              >
                <Div
                  bgImg={vendorOfMap.avatarUrl || "defaultAvatar.png"}
                  bgSize="cover"
                  bgPos="center"
                  w="8rem"
                  h="8rem"
                  rounded="circle"
                />
                <Div m={{ t: "1rem" }} w="100%">
                  <Div textSize="16px" w="100%">
                    {vendorOfMap.vendorName}
                  </Div>
                  <Div
                    textSize="12px"
                    m={{ t: "8px" }}
                    textColor="info600"
                    d="flex"
                  >
                    {vendorOfMap.VendorCategory.name}
                    <Text textColor="gray600">．{distance}</Text>
                  </Div>
                  <Div textSize="12px" m={{ t: "8px" }} textColor="black600">
                    {vendorOfMap.address}
                  </Div>
                  <Div textSize="12px" m={{ t: "8px" }} textColor="black600">
                    {vendorOfMap.phone}
                  </Div>
                </Div>
              </Div>
              <Div m={{ t: "2rem" }}>
                <Div
                  bgImg="https://cdn2.ettoday.net/images/3161/d3161278.jpg"
                  bgSize="cover"
                  bgPos="center"
                  w="12rem"
                  h="12rem"
                  rounded="lg"
                  m={{ t: "1rem" }}
                />
                <ProductInfo />
              </Div>
              <Link to={`/store/${vendorOfMap.id}`}>
                <Button
                  suffix={
                    <Icon
                      name="LongRight"
                      size="16px"
                      color="white"
                      m={{ l: "1rem" }}
                    />
                  }
                  shadow="3"
                  hoverShadow="4"
                >
                  前往賣場
                </Button>
              </Link>
            </>
          )}
        </Div>
      </Div>
    </Div>
  );
}
