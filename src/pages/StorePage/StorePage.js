import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { setCurrentPosition } from "../../redux/reducers/userReducer";
import {
  getVendorById,
  cleanVendorById,
} from "../../redux/reducers/vendorReducer";
import {
  getVendorProducts,
  getProductCategories,
} from "../../redux/reducers/productReducer";
import { Div, Text } from "atomize";
import StoreBanner from "../../Components/VendorSystem/StoreBanner";
import StoreDropdown from "../../Components/VendorSystem/StoreDropdown";
import StoreInfo from "../../Components/VendorSystem/StoreInfo";

const ProductsList = ({ products, hoverItem, setHoverItem }) => {
  return products.map((product) => (
    <Div
      w={{ xs: "150px", sm: "150px", md: "180px" }}
      p={{ x: "0.5rem" }}
      key={product.id}
      onMouseEnter={() => setHoverItem(product.id)}
      onMouseLeave={() => setHoverItem(null)}
      transform={product.id === hoverItem && "scale(1.05)"}
    >
      <Link to={`/product/${product.id}`}>
        <Div
          bgImg={product.pictureUrl}
          bgSize="cover"
          bgPos="center"
          rounded="sm"
          h={{ xs: "150px", sm: "150px", md: "180px" }}
          w="100%"
          m={{ t: "1rem" }}
          cursor="pointer"
          border="1px solid"
          borderColor="gray300"
        />
      </Link>
      <Div d={{ xs: "block", xl: "flex" }} justify="space-between">
        <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
          <Div
            w="100%"
            textAlign="center"
            textSize="14px"
            textColor="black800"
            m={{ t: "0.5rem" }}
            cursor="pointer"
            style={{
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {product.name}
          </Div>
        </Link>
        <Div
          w="100%"
          textAlign="center"
          textSize="14px"
          textColor="info800"
          m={{ t: "0.5rem" }}
        >
          ${product.price}
        </Div>
      </Div>
    </Div>
  ));
};

export default function StorePage() {
  const dispatch = useDispatch();
  const [hoverItem, setHoverItem] = useState(null);
  const [categoryId, setCategoryId] = useState(0);
  const vendor = useSelector((store) => store.vendors.vendorById);
  const products = useSelector((store) => store.products.vendorProducts);
  const productCategories = useSelector(
    (store) => store.products.productCategories
  );
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    dispatch(getVendorById(id));
    dispatch(getVendorProducts(id));
    dispatch(getProductCategories());
    navigator?.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        const position = { lat, lng };
        dispatch(setCurrentPosition(position));
      }
    );
    return () => {
      dispatch(cleanVendorById());
    };
  }, []);

  useEffect(() => {
    if (vendor && vendor === "no-result") {
      return history.push("/");
    }
  }, [vendor]);

  return (
    <>
      {vendor && vendor !== "no-result" && (
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
                  {productCategories && (
                    <StoreDropdown
                      categories={productCategories}
                      categoryId={categoryId}
                      setCategoryId={setCategoryId}
                    />
                  )}
                </Div>
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
          </Div>
        </>
      )}
    </>
  );
}
