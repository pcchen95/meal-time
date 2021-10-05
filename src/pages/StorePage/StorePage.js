import React from "react";
import { Div, Col, Text } from "atomize";
import SmallSizeDropdown from "../../Components/Dropdown";

export default function StorePage() {
  const vendorInfo = (
    <>
      {["賣場名稱", "店家地址", "營業時間", "賣場分類"].map((name, index) => (
        <Div key={index} textSize="subheader" shadow="2">
          <Text bg="gray400" m={{ b: "0.5rem" }}>
            {name}
          </Text>
        </Div>
      ))}
    </>
  );

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

  return (
    <Div w="80%" m={{ y: "4rem", x: "auto" }}>
      <Div d={{ xs: "block", xl: "flex" }}>
        <Div border={{ b: "4px solid" }} borderColor="gray400">
          <Div p="1rem" d={{ xs: "block", lg: "flex" }}>
            <div>
              <Col>
                <Div
                  bgImg="https://images.unsplash.com/photo-1559963629-38ed0fbd4c86?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
                  bgSize="cover"
                  bgPos="center"
                  w="14rem"
                  h="14rem"
                  rounded="circle"
                  m={{ t: "1rem" }}
                  shadow="4"
                />
              </Col>
            </div>
            <div>
              <Div
                h={{ xs: "12rem", lg: "14rem" }}
                w={{ xs: "17rem", lg: "30rem" }}
                bg="gray400"
                m={{ t: "1rem", l: { xs: "0", md: "2rem" } }}
                shadow="4"
                rounded="sm"
              >
                賣場介紹
              </Div>
            </div>
          </Div>
          <Div
            w={{ xs: "20rem", md: "30rem" }}
            h="10rem"
            p="1.5rem"
            m={{ y: "2rem", l: { xs: "0", md: "3rem" } }}
          >
            {vendorInfo}
          </Div>
        </Div>
        <Div border={{ b: "4px solid" }} borderColor="gray400">
          <Col>
            <Div
              bg="gray400"
              w={{ xs: "16rem", md: "26rem", lg: "40rem" }}
              h={{ xs: "16rem", md: "20rem", lg: "25rem" }}
              m={{ t: "1rem", l: { lg: "5rem", xs: "2rem" }, b: "2rem" }}
            >
              地圖
            </Div>
          </Col>
        </Div>
      </Div>
      <Div>
        <Div d="flex" p="1rem">
          <Text p="0.5rem">目前分類</Text>
          <Div m={{ l: "1rem" }}>
            <SmallSizeDropdown />
          </Div>
        </Div>
        <Div d={{ xs: "block", xl: "flex" }}>{productsList}</Div>
      </Div>
    </Div>
  );
}
