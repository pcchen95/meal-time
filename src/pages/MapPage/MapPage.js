import React from "react";
import { Div, Text, Col, Button, Icon } from "atomize";

export default function SingleProductPage() {
  const productInfo = (
    <>
      {["食物名稱", "食物分類", "單價", "距離"].map((name, index) => (
        <Div key={index} p={{ l: { xs: "3rem", lg: "1rem" } }}>
          <Text m={{ y: "1rem", l: "2.2rem" }}>{name}</Text>
        </Div>
      ))}
    </>
  );

  return (
    <Div w="80%" m={{ y: "2rem", x: "auto" }} d={{ xs: "block", lg: "flex" }}>
      <Div
        bg="gray200"
        w={{ xs: "18rem", md: "38rem", lg: "80rem" }}
        h={{ xs: "16rem", md: "32rem", lg: "50rem" }}
      />
      <Div
        m={{ l: { lg: "2rem", xs: "0" }, t: { xs: "2rem", lg: "0" } }}
        p="2rem"
        d="block"
        justify="center"
        align="center"
        border="1px solid"
        borderColor="gray400"
        shadow="4"
        rounded="lg"
      >
        <Div textSize="title">賣家名稱</Div>
        <Col>
          <Div
            bgImg="https://cdn2.ettoday.net/images/3161/d3161278.jpg"
            bgSize="cover"
            bgPos="center"
            w="12rem"
            h="12rem"
            rounded="lg"
            m={{ t: "1rem" }}
          />
        </Col>
        <Div border={{ b: "2px solid" }} borderColor="gray400">
          {productInfo}
        </Div>
        <Div>
          <Col>
            <Div
              bgImg="https://images.unsplash.com/photo-1559963629-38ed0fbd4c86?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
              bgSize="cover"
              bgPos="center"
              w="8rem"
              h="8rem"
              rounded="circle"
              m={{ l: "2rem", t: "2rem" }}
            />
          </Col>
          <Div
            m={{ l: "2rem", t: "2rem" }}
            p={{ l: { xs: "3rem", lg: "1rem" } }}
          >
            賣場分類
          </Div>
          <Div m={{ t: "2rem", l: "3rem" }}>
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
              m={{ r: "1rem" }}
            >
              前往賣場
            </Button>
          </Div>
        </Div>
      </Div>
    </Div>
  );
}
