import React from "react";
import { Div, Button } from "atomize";

const TypeFilterButton = () => {
  return (
    <Div d="flex">
      <Button
        h="2.5rem"
        p={{ x: "1.25rem" }}
        textSize="body"
        bg="white"
        hoverBg="warning300"
        rounded="sm"
        m={{ r: "1rem" }}
        fontFamily="code"
        textColor="black700"
        border="2px solid"
        borderColor="black900"
        textWeight="600"
      >
        交易中
      </Button>
      <Button
        h="2.5rem"
        p={{ x: "1.25rem" }}
        textSize="body"
        bg="white"
        hoverBg="warning300"
        rounded="sm"
        m={{ r: "1rem" }}
        fontFamily="code"
        textColor="black700"
        border="2px solid"
        borderColor="black900"
        textWeight="600"
      >
        已完成
      </Button>
    </Div>
  );
};

const OrderList = () => {
  return (
    <Div
      border="1px solid"
      m={{ t: "2rem" }}
      p="1rem"
      rounded="sm"
      d="flex"
      justify="space-between"
    >
      {" "}
      <Div transform="translateY(25%)">1. 訂單編號：5298974923</Div>
      <Div d="flex">
        <Button
          h="2.5rem"
          p={{ x: "1.25rem" }}
          textSize="body"
          bg="white"
          hoverBg="warning300"
          rounded="xl"
          m={{ r: "1rem" }}
          fontFamily="code"
          textColor="black700"
          border="1px solid"
          borderColor="black900"
          textWeight="300"
        >
          編輯訂單
        </Button>
        <Button
          h="2.5rem"
          p={{ x: "1.25rem" }}
          textSize="body"
          bg="white"
          hoverBg="warning300"
          rounded="xl"
          m={{ r: "1rem" }}
          fontFamily="code"
          textColor="black700"
          border="1px solid"
          borderColor="black900"
          textWeight="300"
        >
          取消訂單
        </Button>
      </Div>
    </Div>
  );
};

const AdminOrderPage = () => {
  return (
    <Div>
      <Div m={{ l: "5rem", r: "5rem" }}>
        <TypeFilterButton />
        <OrderList></OrderList>
        <OrderList />
        <OrderList />
      </Div>
    </Div>
  );
};

export default AdminOrderPage;
