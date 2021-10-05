import React from "react";
// Variable Width
import { Div, Button } from "atomize";

const FooterButtons = () => {
  return (
    <Div d="flex" justify="space-around" m={{ t: "1rem", b: "1.5rem" }}>
      <Button
        h="2.5rem"
        p={{ x: "1.25rem" }}
        textSize="subheader"
        bg="transparent"
        textColor="black600"
        hoverTextColor="success800"
        m={{ r: "1rem" }}
      >
        FAQ
      </Button>
      <Button
        h="2.5rem"
        p={{ x: "1.25rem" }}
        textSize="subheader"
        bg="transparent"
        textColor="black600"
        hoverTextColor="success800"
        m={{ r: "1rem" }}
      >
        隱私權條款
      </Button>
      <Button
        h="2.5rem"
        p={{ x: "1.25rem" }}
        textSize="subheader"
        bg="transparent"
        textColor="black600"
        hoverTextColor="success800"
        m={{ r: "1rem" }}
      >
        聯絡我們
      </Button>
      <Button
        h="2.5rem"
        p={{ x: "1.25rem" }}
        textSize="subheader"
        bg="transparent"
        textColor="black600"
        hoverTextColor="success800"
        m={{ r: "1rem" }}
      >
        關於我們
      </Button>
    </Div>
  );
};

const Footer = () => {
  return (
    <Div
      tag="footer"
      bg="gray300"
      textAlign="center"
      p={{ t: "1.5rem", b: "1rem" }}
      w="100%"
    >
      <Div textSize="paragraph" fontFamily="code" textColor="black600">
        限食取餐，不再有浪費的食物！
      </Div>
      <FooterButtons />
    </Div>
  );
};

export default Footer;
