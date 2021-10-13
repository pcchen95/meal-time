import React from "react";
import { useState, useEffect, createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getVendorById } from "../../redux/reducers/vendorReducer";

import {
  setErrorMessage,
  setShowWarningNotification,
} from "../../redux/reducers/notificationReducer";
import { Div, Col, Text } from "atomize";
import { remindText, inputRule } from "../../constants/inputText";
import StoreBanner from "../../Components/VendorSystem/StoreBanner";
import InputField from "../../Components/VendorSystem/InputField";
import Map from "../../Components/Ｍap/Map";
import Dropdown from "../../Components/Dropdown";

export default function StorePage() {
  const dispatch = useDispatch();
  const vendor = useSelector((store) => store.vendors.vendorById);
  const { id } = useParams();
  const productsList = (
    <>
      {["食物名稱", "食物名稱", "食物名稱", "食物名稱", "食物名稱"].map(
        (name, index) => (
          <Div key={index} p="1.5rem">
            <Col>
              <Div
                bgImg="https://images.unsplash.com/photo-1559963629-38ed0fbd4c86?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
                bgSize="cover"
                bgPos="center"
                h="15rem"
                w="15rem"
                m={{ t: "1rem" }}
              />
            </Col>
            <Div d={{ xs: "block", xl: "flex" }} justify="space-between">
              <Text>{name}</Text>
              <Text>距離 km</Text>
            </Div>
          </Div>
        )
      )}
    </>
  );

  useEffect(() => {
    dispatch(getVendorById(id));
  }, []);

  return (
    <>
      <StoreBanner
        banner={vendor && vendor.bannerUrl}
        avatar={vendor && vendor.avatarUrl}
      />
      <Div w="80%" m={{ y: "4rem", x: "auto" }}>
        <Div w="100%">
          <Div w="100%">
            <Div
              p="1rem"
              d={{ xs: "", md: "flex" }}
              align="center"
              w="100%"
              h={{ xs: "auto", md: "20rem" }}
            >
              <Div
                w={{ xs: "100%", md: "calc(100% - 14rem)" }}
                d="flex"
                flexDir="column"
                justify="center"
                m={{ l: { xs: "0", md: " 2rem" }, t: { xs: "2rem", md: " 0" } }}
              >
                <InputField
                  name="賣場名稱"
                  type="text"
                  value={vendor && vendor.vendorName}
                />
                <InputField
                  name="聯絡電話"
                  type="tel"
                  value={vendor && vendor.phone}
                />
                <InputField
                  name="賣場地址"
                  type="text"
                  value={vendor && vendor.address}
                />
                <InputField
                  name="賣場分類"
                  type="dropdown"
                  value={vendor && vendor.categoryId}
                />
              </Div>
            </Div>
            <Div
              d={{ xs: "", md: "flex" }}
              align="flex-end"
              h={{ xs: "auto", md: "18rem" }}
              border={{ b: "4px solid" }}
              borderColor="gray400"
              p="1rem 0"
            >
              <Div w={{ xs: "100%", md: "60%" }} p={{ x: "1rem" }} h="100%">
                賣場介紹
                <Div>{vendor && vendor.description}</Div>
              </Div>
              <Div
                w={{ xs: "100%", md: "40%" }}
                h={{ xs: "18rem", md: "16rem" }}
                border={{ t: { xs: "4px solid", md: "" } }}
                borderColor="gray400"
                m={{ l: { xs: "0", md: "1rem" }, t: { xs: "2rem", md: "0" } }}
                p={{ y: { xs: "2rem", md: "0" } }}
                d="flex"
                align="center"
              >
                <Map
                  completeAddress={vendor && vendor.address}
                  latlng={
                    vendor && {
                      lat: vendor.position.coordinates[0],
                      lng: vendor.position.coordinates[1],
                    }
                  }
                />
              </Div>
            </Div>
          </Div>
        </Div>
        <Div>
          <Div d="flex" p="1rem">
            <Text p="0.5rem">目前分類</Text>
            <Div m={{ l: "1rem" }}>
              <Dropdown />
            </Div>
          </Div>
          <Div d={{ xs: "block", xl: "flex" }}>{productsList}</Div>
        </Div>
      </Div>
    </>
  );
}
