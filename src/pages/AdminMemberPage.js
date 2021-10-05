import React from "react";
// Variable Width
import { Div, Button } from "atomize";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

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
        正常
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
        停權中
      </Button>
    </Div>
  );
};

const MemberList = () => {
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
      <Div transform="translateY(25%)">1. 會員編號：5298974923</Div>
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
          使停權
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
          使正常
        </Button>
      </Div>
    </Div>
  );
};

const AdminMemberPage = () => {
  return (
    <Div>
      <NavBar />
      <Div m={{ l: "5rem", r: "5rem" }}>
        <TypeFilterButton />
        <MemberList></MemberList>
        <MemberList />
        <MemberList />
      </Div>
      <Footer />
    </Div>
  );
};

export default AdminMemberPage;
