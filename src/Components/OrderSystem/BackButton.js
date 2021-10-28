import React from "react";
import PropTypes from "prop-types";
import { Div, Button, Icon } from "atomize";
import { useHistory } from "react-router-dom";

const BackButton = ({ orderPage }) => {
  const history = useHistory();

  const handleBackClick = (position) => {
    if (position === "homepage") {
      history.push("/");
    }
    if (position === "orders") {
      history.push("/orders");
    }
    if (position === "products") {
      history.push("/products");
    }
  };

  return (
    <Div minH="28rem">
      <Div
        d="flex"
        pos="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      >
        <Button
          prefix={
            <Icon name="LongLeft" size="16px" color="white" m={{ r: "1rem" }} />
          }
          shadow="3"
          hoverShadow="4"
          m={{ r: "1rem" }}
          onClick={() => handleBackClick("homepage")}
        >
          返回首頁
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
          bg="warning700"
          shadow="3"
          hoverShadow="4"
          m={{ r: "1rem" }}
          onClick={() => handleBackClick(orderPage ? "orders" : "products")}
        >
          {orderPage ? "訂單列表" : "商品列表"}
        </Button>
      </Div>
    </Div>
  );
};

BackButton.propTypes = {
  orderPage: PropTypes.bool,
};

export default BackButton;
