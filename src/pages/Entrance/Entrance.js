import React from "react";
import { Row, Col, Div, Icon, Button } from "atomize";

const SignInInfo = () => {
  return (
    <Div m={{ l: "10rem", t: "15rem" }}>
      <Div d="flex">
        <Button
          h="2.5rem"
          w="2.5rem"
          bg="white"
          hoverBg="danger400"
          rounded="lg"
          m={{ r: "1rem" }}
        >
          <Icon name="Twitter" size="50px" color="black700" />
        </Button>
        <Button
          h="2.5rem"
          w="2.5rem"
          bg="white"
          hoverBg="danger400"
          rounded="lg"
          m={{ r: "1rem" }}
        >
          <Icon name="Instagram" size="50px" color="black700" />
        </Button>
      </Div>
      <Div d="flex">
        <Button
          suffix={
            <Icon
              name="LongRight"
              size="16px"
              color="white"
              m={{ l: "1rem" }}
            />
          }
          bg="black200"
          shadow="3"
          hoverShadow="4"
          m={{ r: "1rem", t: "3rem" }}
        >
          註冊
        </Button>
        <Button
          suffix={
            <Icon
              name="LongRight"
              size="16px"
              color="white"
              m={{ l: "1rem" }}
            />
          }
          bg="black200"
          shadow="3"
          hoverShadow="4"
          m={{ r: "1rem", t: "3rem" }}
        >
          登入
        </Button>
      </Div>
    </Div>
  );
};

const Entrance = () => {
  return (
    <Div>
      <Row>
        <Col>
          <SignInInfo></SignInInfo>
        </Col>
        <Col>
          <Div
            bgImg="https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1464&q=80"
            bgSize="cover"
            bgPos="left"
            rounded="xl"
            h="45rem"
            m={{ r: "10rem" }}
          />
        </Col>
      </Row>
    </Div>
  );
};

export default Entrance;
