import React from "react";
import { Div, Button, Text } from "atomize";
import SmallSizeDropdown from "../../Components/Dropdown";

export default function ProductsPage() {
  const productsList = (
    <Div>
      {[
        "食物1",
        "食物2",
        "食物3",
        "食物4",
        "食物5",
        "食物6",
        "食物7",
        "食物8",
        "食物9",
        "食物10",
      ].map((name, index) => (
        <Div
          key={index}
          textAlign="center"
          m={{ t: "2rem", l: { xs: "2rem", lg: "3.5rem" } }}
          d="inline-block"
        >
          <Div
            bg="gray400"
            m={{ t: "2rem", l: { xs: "1rem" } }}
            h="13rem"
            w="13rem"
            border="1px solid"
            rounded="sm"
          />
          <Text textSize="title" textWeight="400" cursor="pointer">
            {name}
          </Text>
          <Text
            textSize="subheader"
            textColor="gray400"
            cursor="pointer"
            m={{ t: "0.5rem" }}
          >
            賣場名字
          </Text>
          <Text textSize="subheader" m={{ t: "0.5rem" }}>
            NT$ 0
          </Text>
        </Div>
      ))}
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
    <>
      <Div
        pos="relative"
        bg="gray300"
        w="78%"
        m={{ x: "auto", y: "4rem" }}
        minH="60rem"
        p={{ b: { xs: "3rem" } }}
      >
        <Div d="flex" m={{ t: "2rem" }}>
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
            目前分類
          </Button>
          <SmallSizeDropdown />
        </Div>

        {productsList}

        <Div
          m={{ t: "1rem" }}
          pos="absolute"
          right="2rem"
          bottom="1rem"
          d="flex"
        >
          {buttonList}
        </Div>
      </Div>
    </>
  );
}
