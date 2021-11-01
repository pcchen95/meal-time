import React from "react";
import PropTypes from "prop-types";
// Variable Width
import { Div, Anchor, Text } from "atomize";

const Button = ({ name, link }) => {
  return (
    <Div w={{ xs: "50%", sm: "25%" }} textAlign="center">
      <Anchor
        href={link}
        h="2.5rem"
        p={{ x: "1.25rem" }}
        textSize={{ xs: "body", md: "subheader" }}
        bg="transparent"
        textColor="black600"
        hoverTextColor="success800"
      >
        {name}
      </Anchor>
    </Div>
  );
};

Button.propTypes = {
  name: PropTypes.string,
  link: PropTypes.string,
};

const FooterButtons = () => {
  return (
    <Div d="flex" m={{ t: "1rem", b: "1.5rem" }} w="100vw" flexWrap="wrap">
      <Button name="FAQ" link="#/faq" />
      <Button name="隱私權條款" link="#" />
      <Button name="聯絡我們" link="#" />
      <Button name="關於我們" link="#" />
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
      <Text textSize="tiny" textColor="gray800">
        Copyright © 2021 Meal Time All Rights Reserved.
      </Text>
    </Div>
  );
};

export default Footer;
