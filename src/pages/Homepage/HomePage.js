import React from "react";
import { Div, Icon, Button } from "atomize";
import NavBar from "../../Components/NavBar";
import Footer from "../../Components/Footer";
import Carousel from "../../Components/Carousel";

const NewItemList = () => {
  return (
    <Div>
      <Div
        textAlign="center"
        textSize="heading"
        textWeight="700"
        textColor="black700"
        m={{ t: "3rem", b: "1rem" }}
      >
        最新商品
      </Div>
      <Div d="flex" justify="space-around">
        <Div
          m="2.5rem"
          bgImg="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80"
          bgSize="cover"
          bgPos="center"
          h="15rem"
          w="15rem"
        ></Div>
        <Div
          m="2.5rem"
          bgImg="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=960&q=80"
          bgSize="cover"
          bgPos="center"
          h="15rem"
          w="15rem"
        ></Div>
        <Div
          m="2.5rem"
          bgImg="https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80"
          bgSize="cover"
          bgPos="center"
          h="15rem"
          w="15rem"
        ></Div>{" "}
        <Div
          m="2.5rem"
          bgImg="https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=820&q=80"
          bgSize="cover"
          bgPos="center"
          h="15rem"
          w="15rem"
        ></Div>
      </Div>
      <Div d="flex" justify="center">
        <Button
          suffix={
            <Icon
              name="LongRight"
              size="16px"
              color="black500"
              m={{ l: "0.25rem" }}
            />
          }
          bg="white"
          hoverBg="warning300"
          rounded="circle"
          textColor="black500"
          border="1px solid"
          borderColor="black500"
          shadow="1"
          hoverShadow="2"
          m={{ b: "3rem" }}
        >
          查看更多
        </Button>{" "}
      </Div>
    </Div>
  );
};

const HomePage = () => {
  return (
    <Div>
      <NavBar />
      <Carousel />
      <NewItemList />
      <Footer />
    </Div>
  );
};

export default HomePage;
