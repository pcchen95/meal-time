import React from "react";
import { useState, useEffect, useRef } from "react";
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
import ConfirmNotification from "../../Components/ProductSystem/ConfirmNotification";

export default function ProductManagePage() {
  const dispatch = useDispatch();
  const [categoryId, setCategoryId] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [filter, setFilter] = useState("all");
  const [isDisabled, setIsDisabled] = useState(false);
  const [pageStart, setPageStart] = useState(null);
  const [pageEnd, setPageEnd] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deletedId, setDeletedId] = useState(null);
  const [sort, setSort] = useState("id");
  const [order, setOrder] = useState("DESC");
  const currentTime = useRef(() => {
    const now = new Date();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return now.getTime();
  });
  const user = useSelector((store) => store.users.user);
  const vendor = useSelector((store) => store.vendors.vendor);
  const products = useSelector((store) => store.products.myVendorProducts);
  const count = useSelector((store) => store.products.count);
  const isLoadingProduct = useSelector((store) => store.products.isLoading);
  const history = useHistory();
  const limit = 10;

  const getProducts = (id) => {
    let queryParameters = {
      sort,
      order,
      limit,
      page,
      filter,
    };
    if (categoryId !== 0) {
      queryParameters.category = categoryId;
    }
    dispatch(getMyVendorProducts(id, queryParameters));
  };

  const handleSortById = () => {
    setSort("id");
    setOrder("DESC");
    setPage(1);
  };

  const handleSortByDate = () => {
    setSort("expiryDate");
    setOrder("ASC");
    setPage(1);
  };

  const handleConfirmDelete = (id) => {
    setShowConfirm(true);
    setDeletedId(id);
  };

  const handleDelete = () => {
    setShowConfirm(false);
    dispatch(deleteProduct(deletedId)).then((res) => {
      if (res.ok) {
        getProducts(vendor.id, categoryId, page);
      }
    });
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setDeletedId(null);
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
  }, [categoryId, page, filter, sort, order]);

  useEffect(() => {
    if (count) setTotalPages(Math.ceil(count / limit));
  }, [count]);

  useEffect(() => {
    setPageStart(() => (count === 0 ? 0 : limit * (page - 1) + 1));
    setPageEnd(() => (limit * page > count ? count : limit * page));
  }, [page, count]);

  useEffect(() => {
    setPage(1);
  }, [categoryId, filter]);

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

          <ControlArea
            categoryId={categoryId}
            setCategoryId={setCategoryId}
            filter={filter}
            setFilter={setFilter}
            isDisabled={isDisabled}
            handleSortById={handleSortById}
            handleSortByDate={handleSortByDate}
          />

          <Div textSize="caption" textColor="gray600" m={{ t: "1rem" }}>
            共 {count} 筆搜尋結果，顯示第 {pageStart} ～ {pageEnd} 筆結果
          </Div>
          <Div minH="calc(100vh - 467px)">
            {products &&
              products.map((product) => (
                <ProductList
                  key={product.id}
                  product={product}
                  filter={filter}
                  handleConfirmDelete={handleConfirmDelete}
                  isDisabled={isDisabled}
                  currentTime={currentTime.current()}
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
          <ConfirmNotification
            showConfirm={showConfirm}
            handleDelete={handleDelete}
            handleCancelDelete={handleCancelDelete}
          />
        </Div>
      )}
    </>
  );
}
