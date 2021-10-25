import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getVendor } from "../../redux/reducers/vendorReducer";
import {
  getMyVendorProducts,
  getMyProductCategories,
  deleteProduct,
} from "../../redux/reducers/productReducer";
import { Div, Text } from "atomize";
import LoadingPage from "../LoadingPage/LoadingPage";
import PaginationButton from "../../Components/VendorSystem/PaginationButton";
import ProductList from "../../Components/ProductSystem/VendorProductList";
import ControlArea from "../../Components/ProductSystem/VendorControlArea";

export default function ProductManagePage() {
  const dispatch = useDispatch();
  const [categoryId, setCategoryId] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [availableFilter, setAvailableFilter] = useState("all");
  const [isDisabled, setIsDisabled] = useState(false);
  const [pageStart, setPageStart] = useState(null);
  const [pageEnd, setPageEnd] = useState(null);
  const user = useSelector((store) => store.users.user);
  const vendor = useSelector((store) => store.vendors.vendor);
  const products = useSelector((store) => store.products.myVendorProducts);
  const count = useSelector((store) => store.products.count);
  const isLoadingProduct = useSelector((store) => store.products.isLoading);
  const history = useHistory();
  const limit = 10;

  const getProducts = (id) => {
    if (categoryId === 0) {
      dispatch(
        getMyVendorProducts(id, {
          limit,
          page,
          isAvailable: availableFilter,
        })
      );
    }
    if (categoryId !== 0) {
      dispatch(
        getMyVendorProducts(id, {
          limit,
          category: categoryId,
          page,
          isAvailable: availableFilter,
        })
      );
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id)).then((res) => {
      if (res.ok) {
        getProducts(vendor.id, categoryId, page);
      }
    });
  };

  useEffect(() => {
    if (user && user === "non-login") return history.push("/");
    dispatch(getVendor());
  }, [user]);

  useEffect(() => {
    if (vendor && user) {
      if (vendor == "not-vendor") return history.push("/update_store");
      dispatch(getMyProductCategories(vendor.id));
      getProducts(vendor.id);
      if (vendor.isSuspended || user.role === "suspended") {
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }
    }
  }, [vendor, user]);

  useEffect(() => {
    if (vendor) {
      getProducts(vendor.id);
    }
  }, [categoryId, page, availableFilter]);

  useEffect(() => {
    if (count) setTotalPages(Math.ceil(count / limit));
  }, [count]);

  useEffect(() => {
    setPageStart(() => (count === 0 ? 0 : limit * (page - 1) + 1));
    setPageEnd(() => (limit * page > count ? count : limit * page));
  }, [page, count]);

  useEffect(() => {
    setPage(1);
  }, [categoryId, availableFilter]);

  return (
    <>
      {isLoadingProduct && <LoadingPage />}
      {vendor && (
        <Div w="80%" m={{ y: "2rem", x: "auto" }}>
          {isDisabled && (
            <Div tag="h4" textColor="danger800" w="100%" textAlign="center">
              您已被停權！
            </Div>
          )}
          <Text
            textSize="heading"
            textColor="info900"
            w="100%"
            textAlign="center"
          >
            商品管理
          </Text>
          <Div
            d="flex"
            flexDir="row"
            w="100%"
            justify="space-between"
            align="flex-end"
          >
            <ControlArea
              categoryId={categoryId}
              setCategoryId={setCategoryId}
              availableFilter={availableFilter}
              setAvailableFilter={setAvailableFilter}
              isDisabled={isDisabled}
            />
          </Div>
          <Div textSize="caption" textColor="gray600" m={{ t: "1rem" }}>
            共 {count} 筆搜尋結果，顯示第 {pageStart} ～ {pageEnd} 筆結果
          </Div>
          <Div minH="calc(100vh - 467px)">
            {products &&
              products.map((product) => (
                <ProductList
                  key={product.id}
                  product={product}
                  handleDelete={handleDelete}
                  isDisabled={isDisabled}
                />
              ))}
          </Div>
          {count > 0 && (
            <PaginationButton
              totalPages={totalPages}
              page={page}
              setPage={setPage}
            />
          )}
        </Div>
      )}
    </>
  );
}
