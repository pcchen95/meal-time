import React from "react";
import styled from "styled-components";
/* import { Link } from "react-router-dom"; */
import { Div, Button } from "atomize";

const Root = styled.div``;

export default function HomePage() {
  const productsList = (
    <>
      {["食物1", "食物2", "食物3", "食物4", "食物5"].map((name, index) => (
        <Div
          key={index}
          bg="gray400"
          m={{ t: "2rem", l: { xs: "1rem" } }}
          h="12rem"
          w="13rem"
          border="1px solid"
          rounded="sm"
        >
          {name}
        </Div>
      ))}
    </>
  );

  return (
    <Root>
      <Div bg="gray200" h="25rem" m={{ t: "2rem" }}></Div>
      <Div maxW={{ xs: "70%", lg: "60%" }} m={{ y: "3rem", x: "auto" }}>
        <Div textSize="title">嚴選食物</Div>
        <Div d={{ xs: "block", lg: "flex" }}>{productsList}</Div>
      </Div>
      <Div
        d="flex"
        align={{ xs: "space-around", lg: "center" }}
        pos="relative"
        h="4rem"
      >
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
          pos="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          載入更多
        </Button>
      </Div>
    </Root>
  );
}
