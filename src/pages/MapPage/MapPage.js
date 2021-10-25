import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPosition } from "../../redux/reducers/userReducer";
import {
  getCategories,
  getAllVendors,
  getVendorOfMap,
  getVendorOfSearchedProducts,
} from "../../redux/reducers/vendorReducer";
import {
  getVendorProducts,
  searchProducts,
} from "../../redux/reducers/productReducer";
import {
  setErrMessage,
  setShowWarningNotification,
} from "../../redux/reducers/notificationReducer";
import { Div, Text } from "atomize";
import Geocode from "react-geocode";
import LoadingPage from "../LoadingPage/LoadingPage";
import Map from "../../Components/MapSystem/Map";
import Dropdown from "../../Components/MapSystem/Dropdown";
import SearchBox from "../../Components/MapSystem/SearchBox";
import SelectedVendor from "../../Components/MapSystem/SelectedVendor";
import AddressInputBox from "../../Components/MapSystem/AddressInputBox";
import WarningNotification from "../../Components/Notifications/WarningNotification";

export default function MapPage() {
  const dispatch = useDispatch();
  const [distance, setDistance] = useState(null);
  const [vendorOfMap, setVendorOfMap] = useState(null);
  const [categoryId, setCategoryId] = useState(0);
  const [input, setInput] = useState("");
  const [address, setAddress] = useState("");
  const currentPosition = useSelector((store) => store.users.position);
  const isLoadingVendor = useSelector((store) => store.vendors.isLoading);
  const products = useSelector((store) => store.products.vendorProducts);
  const searchedProducts = useSelector(
    (store) => store.products.searchedProducts
  );
  const isLoadingProduct = useSelector((store) => store.products.isLoading);

  const handleEvent = (id) => {
    dispatch(getVendorOfMap(id)).then((vendor) => setVendorOfMap(vendor));
    dispatch(getVendorProducts(id, { limit: 5 }));
  };

  const handleOnChange = (e) => {
    setInput(e.target.value);
  };

  const handleSearch = () => {
    dispatch(searchProducts(input));
    setCategoryId(0);
    setVendorOfMap(null);
  };

  const handleClearSearch = () => {
    setInput("");
    dispatch(getVendorOfSearchedProducts());
    dispatch(searchProducts());
  };

  const handleEnter = () => {
    Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        dispatch(setCurrentPosition({ lat, lng }));
      },
      (error) => {
        console.log(error);
        dispatch(setErrMessage("找不到地址"));
        dispatch(setShowWarningNotification(true));
      }
    );
  };

  const handleClearAddress = () => {
    setAddress("");
    dispatch(setCurrentPosition(null));
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
        return pos;
      }
    );
  }, [categoryId, dispatch]);

  useEffect(() => {
    if (searchedProducts && searchedProducts.count > 0) {
      const array = [];
      searchedProducts.rows.forEach((product) => {
        if (array.indexOf(product.vendorId) < 0) array.push(product.vendorId);
      });
      dispatch(getVendorOfSearchedProducts(array));
    }
  }, [searchedProducts]);

  return (
    <>
      {(isLoadingVendor || isLoadingProduct) && <LoadingPage />}
      <Div w="80%" m={{ y: "2rem", x: "auto" }}>
        <Text textSize="heading" textColor="info900">
          搜尋賣家
        </Text>
        <Div
          d="flex"
          flexDir={{ xs: "column", sm: "row" }}
          w="100%"
          justify="flex-start"
        >
          <Dropdown categoryId={categoryId} setCategoryId={setCategoryId} />
          <SearchBox
            input={input}
            handleOnChange={handleOnChange}
            handleSearch={handleSearch}
            handleClearSearch={handleClearSearch}
          />
        </Div>
        {!currentPosition && (
          <AddressInputBox
            address={address}
            handleOnChange={(e) => setAddress(e.target.value)}
            handleEnter={handleEnter}
            handleClear={handleClearAddress}
          />
        )}
        <Div
          w="100%"
          m={{ y: "1rem" }}
          d="flex"
          flexDir={{ xs: "column", lg: "row" }}
          justify="space-between"
        >
          <Map
            vendorOfMap={vendorOfMap}
            handleEvent={handleEvent}
            setDistance={setDistance}
          />
          <SelectedVendor
            vendorOfMap={vendorOfMap}
            products={products}
            distance={distance}
            searchedProducts={searchedProducts}
          />
        </Div>
        <WarningNotification />
      </Div>
    </>
  );
}
