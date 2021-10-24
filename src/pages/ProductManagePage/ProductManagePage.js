import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getVendor } from "../../redux/reducers/vendorReducer";
import {
  getVendorProducts,
  getVendorProductCategories,
  deleteProduct,
} from "../../redux/reducers/productReducer";
import { Div, Text, Button, Icon } from "atomize";
import LoadingPage from "../LoadingPage/LoadingPage";
import Dropdown from "../../Components/ProductSystem/VendorProductDropdown";
import PaginationButton from "../../Components/VendorSystem/PaginationButton";
import VendorProductList from "../../Components/ProductSystem/VendorProductList";

export default function ProductManagePage() {
  const dispatch = useDispatch();
  const [categoryId, setCategoryId] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const user = useSelector((store) => store.users.user);
  const vendor = useSelector((store) => store.vendors.vendor);
  const isLoadingVendor = useSelector((store) => store.vendors.isLoading);
  const products = useSelector((store) => store.products.vendorProducts);
  const count = useSelector((store) => store.products.count);
  const isLoadingProduct = useSelector((store) => store.products.isLoading);
  const history = useHistory();
  const limit = 5;

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
  }, []);

  useEffect(() => {
    if (vendor) {
      if (vendor == "not-vendor") return history.push("/update_store");
      dispatch(getVendorProductCategories(vendor.id));
      getProducts(vendor.id, categoryId, page);
    }
  }, [vendor]);

  useEffect(() => {
    if (vendor) {
      getProducts(vendor.id, categoryId, page);
    }
  }, [vendor, categoryId, page]);

  useEffect(() => {
    setPage(1);
  }, [categoryId]);

  useEffect(() => {
    if (count) setTotalPages(Math.ceil(count / 5));
  }, [count]);

  return (
    <>
      {(isLoadingVendor || isLoadingProduct) && <LoadingPage />}
      <Div w="80%" m={{ y: "2rem", x: "auto" }}>
        <Text
          textSize="heading"
          textColor="info900"
          w="100%"
          textAlign="center"
        >
          商品管理
        </Text>
        <Div d="flex" flexDir="row" w="100%" justify="space-between">
          <Dropdown categoryId={categoryId} setCategoryId={setCategoryId} />
          <Link to="/product_edit/new" style={{ textDecoration: "none" }}>
            <Button
              prefix={
                <Icon
                  name="Add"
                  size="16px"
                  color="white"
                  m={{ r: "0.5rem" }}
                />
              }
              h="2rem"
              bg="warning700"
              hoverBg="warning800"
              rounded="md"
              p={{ r: "1rem", l: "1rem" }}
              shadow="2"
              hoverShadow="3"
            >
              新增商品
            </Button>
          </Link>
        </Div>
        <Div>
          {products &&
            products.map((product) => (
              <VendorProductList
                key={product.id}
                product={product}
                handleDelete={handleDelete}
              />
            ))}
        </Div>
        <PaginationButton
          totalPages={totalPages}
          page={page}
          setPage={setPage}
        />
      </Div>
    </>
  );
}
