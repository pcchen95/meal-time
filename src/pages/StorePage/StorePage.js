import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { setCurrentPosition } from "../../redux/reducers/userReducer";
import { getVendorById } from "../../redux/reducers/vendorReducer";
import {
  getVendorProducts,
  getVendorProductCategories,
} from "../../redux/reducers/productReducer";
import { Div } from "atomize";
import { useJsApiLoader } from "@react-google-maps/api";
import googleMapToken from "../../constants/googleMapToken";
import LoadingPage from "../LoadingPage/LoadingPage";
import StoreBanner from "../../Components/VendorSystem/StoreBanner";
import StoreDropdown from "../../Components/VendorSystem/StoreDropdown";
import StoreInfo from "../../Components/VendorSystem/StoreInfo";
import ProductsList from "../../Components/VendorSystem/StoreProductList";
import PaginationButton from "../../Components/VendorSystem/PaginationButton";

export default function StorePage() {
  const dispatch = useDispatch();
  const [hoverItem, setHoverItem] = useState(null);
  const [categoryId, setCategoryId] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [pageStart, setPageStart] = useState(null);
  const [pageEnd, setPageEnd] = useState(null);

  const vendor = useSelector((store) => store.vendors.vendorById);
  const products = useSelector((store) => store.products.vendorProducts);
  const isLoadingVendor = useSelector((store) => store.vendors.isLoading);
  const count = useSelector((store) => store.products.count);
  const { id } = useParams();
  const history = useHistory();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: googleMapToken,
  });
  const limit = 10;

  const getProducts = (id, categoryId, page) => {
    if (categoryId === 0) {
      dispatch(getVendorProducts(id, { limit, page }));
    }
    if (categoryId !== 0) {
      dispatch(
        getVendorProducts(id, {
          limit,
          category: categoryId,
          page,
        })
      );
    }
  };

  useEffect(() => {
    dispatch(getVendorById(id));
    navigator?.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        const position = { lat, lng };
        dispatch(setCurrentPosition(position));
      }
    );
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [dispatch]);

  useEffect(() => {
    if (vendor) {
      if (vendor === "no-result") {
        return history.push("/");
      }
      dispatch(getVendorProductCategories(vendor.id));
      getProducts(vendor.id, categoryId, page);
    }
  }, [vendor]);

  useEffect(() => {
    if (vendor) {
      getProducts(vendor.id, categoryId, page);
    }
    setPageStart(() => (count === 0 ? 0 : limit * (page - 1) + 1));
    setPageEnd(() => (limit * page > count ? count : limit * page));
  }, [vendor, page, categoryId]);

  useEffect(() => {
    if (count) setTotalPages(Math.ceil(count / limit));
  }, [count]);

  useEffect(() => {
    setPageStart(limit * (page - 1) + 1);
    setPageEnd(() => (limit * page > count ? count : limit * page));
  }, [page, count]);

  useEffect(() => {
    setPage(1);
  }, [categoryId]);
  return (
    <>
      {isLoadingVendor && !isLoaded && <LoadingPage />}
      {isLoaded && (
        <>
          <StoreBanner />
          <Div
            w={{ xs: "100%", md: "80%" }}
            maxW="1100px"
            m="0 auto"
            p="0 1.5rem 2rem 1.5rem"
          >
            <StoreInfo />
            <Div d="flex" flexDir="column" align="center">
              <Div d="flex" p="1rem" w="100%" justify="flex-start">
                <StoreDropdown
                  categoryId={categoryId}
                  setCategoryId={setCategoryId}
                />
              </Div>
              <Div
                textSize="caption"
                textColor="gray600"
                p={{ x: "1rem" }}
                w="100%"
                textAlign="left"
              >
                共 {count} 筆搜尋結果，顯示第 {pageStart} ～ {pageEnd} 筆結果
              </Div>
              <Div
                w={{ xs: "100%", md: "540px", lg: "720px", xl: "900px" }}
                d="flex"
                flexWrap="wrap"
              >
                {products && (
                  <ProductsList
                    products={products}
                    hoverItem={hoverItem}
                    setHoverItem={setHoverItem}
                  />
                )}
              </Div>
            </Div>
            {count > 0 && (
              <PaginationButton
                setPage={setPage}
                page={page}
                totalPages={totalPages}
              />
            )}
          </Div>
        </>
      )}
    </>
  );
}
