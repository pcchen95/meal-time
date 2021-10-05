import React from "react";
import styled from "styled-components";
import { Div, Text, Col, Button, Row } from "atomize";

const Root = styled.div``;

export default function OrderDetailsPage() {
  return (
    <Root>
      <Div w="80%" m={{ y: "2rem", x: "auto" }} pos="relative">
        <Div d="flex">
          <Text>Home</Text>/<Text>商品分類</Text>/<Text>商品名稱</Text>
        </Div>
        <Div
          d={{ xs: "block", xl: "flex" }}
          justify="space-between"
          p={{ y: "6rem", x: "2rem" }}
          border={{ b: "4px solid" }}
          borderColor="gray500"
        >
          <Div m={{ l: { xs: "1rem", xl: "6rem" } }} maxW="12rem">
            <Text m={{ t: "1rem" }}>單價：NT $ 0</Text>
            <Text m={{ t: "1rem" }}>面交</Text>
            <Text m={{ t: "1rem" }}>
              產品敘述產品敘述產品敘述產品敘述產品敘述產品敘述產品敘述
              產品敘述產品敘述產品敘述產品敘述產品敘述產品敘述產品敘述
              產品敘述產品敘述產品敘述產品敘述產品敘述產品敘述產品敘述
            </Text>
          </Div>

          <Row>
            <Col>
              <Div
                bg="gray400"
                w={{ xs: "16rem", md: "26rem", lg: "40rem" }}
                h={{ xs: "16rem", md: "20rem", lg: "25rem" }}
                m={{ t: "1rem", l: { lg: "1rem", xs: "0" }, b: "2rem" }}
              >
                地圖
              </Div>
            </Col>
            <Col>
              <Div
                bgImg="https://images.unsplash.com/photo-1559963629-38ed0fbd4c86?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
                bgSize="cover"
                bgPos="center"
                h={{ xs: "14rem", md: "20rem", lg: "25rem" }}
                w={{ xs: "16rem", md: "26rem", lg: "25rem" }}
                m={{ t: "1rem", l: { xs: "0", xl: "2rem" } }}
              />
            </Col>
          </Row>
        </Div>

        <Div
          m={{ l: { xs: "1rem", xl: "6rem" } }}
          p={{ x: "4rem", t: "4rem", b: "8rem" }}
        >
          <Text m={{ t: "1rem" }}>AC131247</Text>
          <Text m={{ t: "1rem" }}>訂單狀態：處理中</Text>
          <Text m={{ t: "1rem" }}>預訂數量：1 個</Text>
          <Text m={{ t: "1rem" }}>總價：NT $ 0</Text>
          <Text m={{ t: "1rem" }}>面交</Text>
          <Text m={{ t: "1rem" }}>面交地點(店家地址)</Text>
          <Text m={{ t: "1rem" }}>預訂時間：2021-09-28 20:00</Text>
        </Div>
        <Div d="flex" pos="absolute" bottom="1rem" right="2rem">
          <Button
            h="3rem"
            p={{ x: "1.25rem" }}
            textSize="body"
            textColor="info700"
            hoverTextColor="info900"
            bg="white"
            hoverBg="info200"
            border="1px solid"
            borderColor="info700"
            hoverBorderColor="info900"
            m={{ r: "0.5rem" }}
          >
            完成訂單
          </Button>
          <Button
            h="3rem"
            p={{ x: "1.25rem" }}
            textSize="body"
            textColor="info700"
            hoverTextColor="info900"
            bg="white"
            hoverBg="info200"
            border="1px solid"
            borderColor="info700"
            hoverBorderColor="info900"
            m={{ r: "0.5rem" }}
          >
            取消訂單
          </Button>
        </Div>
      </Div>
    </Root>
  );
}
