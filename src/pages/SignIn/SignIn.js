import React from "react";
import { Row, Col, Div, Input, Icon, Button } from "atomize";

const SignInInfo = () => {
  return (
    <Div m={{ l: "10rem", t: "15rem" }}>
      帳號：
      <Input placeholder="請輸入帳號" m={{ t: "1rem", b: "1rem" }}></Input>
      密碼：
      <Input placeholder="請輸入密碼" m={{ t: "1rem", b: "1rem" }}></Input>
      <Button
        suffix={
          <Icon name="LongRight" size="16px" color="white" m={{ l: "1rem" }} />
        }
        bg="black200"
        shadow="3"
        hoverShadow="4"
        m={{ r: "1rem", t: "3rem" }}
      >
        送出
      </Button>
    </Div>
  );
};

const SignIn = () => {
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

export default SignIn;
