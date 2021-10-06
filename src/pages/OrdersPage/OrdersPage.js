import React from "react";
import { Div, Button, Text, Icon } from "atomize";
/* import { Link } from "react-router-dom"; */

export default function OrdersPage() {
  const filterOrders = (
    <Div d="flex">
      {["待處理", "待取貨", "已完成", "已取消"].map((name, index) => (
        <Button
          key={index}
          h="3rem"
          p={{ x: "1.25rem", y: { xs: "2.5rem", lg: "1.25rem" } }}
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
          {name}
        </Button>
      ))}
    </Div>
  );

  const orderList = (
    <Div p={{ x: { xs: "1rem", lg: "5rem" }, t: { xs: "3rem", lg: "5rem" } }}>
      {["2021-09-28 14:53", "2021-09-28 10:51", "2021-09-27 17:53"].map(
        (name, index) => (
          <Div key={index}>
            <Div p="1rem" bg="gray400">
              {name}
            </Div>
            <Div
              d={{ xs: "static", lg: "flex" }}
              justify="space-between"
              m={{ x: "4rem", y: "2rem" }}
            >
              <Div>
                <Text>Pinkoi</Text>
                <Text m={{ t: "1rem" }}>預約 2021-09-28 20:00</Text>
                <Text>$ 0</Text>
              </Div>
              <Div>
                <Button
                  prefix={
                    <Icon
                      name="EyeSolid"
                      size="16px"
                      color="white"
                      m={{ r: "0.5rem" }}
                    />
                  }
                  bg="warning700"
                  hoverBg="warning800"
                  rounded="circle"
                  p={{ r: "1.5rem", l: "1rem" }}
                  shadow="3"
                  hoverShadow="4"
                  w={{ xs: "10rem", lg: "9.3rem" }}
                  m={{ t: { xs: "1.5rem" } }}
                >
                  查看訂單詳情
                </Button>
              </Div>
            </Div>
          </Div>
        )
      )}
    </Div>
  );

  const buttonList = (
    <>
      {["1", "2", ">"].map((name, index) => (
        <Button
          key={index}
          h="2rem"
          p={{ x: "1rem" }}
          textSize="caption"
          textColor="info700"
          hoverTextColor="info900"
          bg="white"
          hoverBg="info200"
          border="1px solid"
          borderColor="info700"
          hoverBorderColor="info900"
          m={{ r: "0.5rem" }}
        >
          {name}
        </Button>
      ))}
    </>
  );

  return (
    <Div
      bg="gray200"
      w="80%"
      m={{ y: "4rem", x: "auto" }}
      p={{ xs: "1rem", lg: "3rem" }}
      pos="relative"
    >
      {filterOrders}
      {orderList}
      <Div m={{ t: "1rem" }} pos="absolute" right="2rem" bottom="1rem" d="flex">
        {buttonList}
      </Div>
    </Div>
  );
}
