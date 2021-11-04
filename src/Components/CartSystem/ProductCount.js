import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Div, Button, Icon, Text } from "atomize";
import { setCartData } from "../../redux/reducers/cartReducer";
import {
  setErrorMessage,
  setShowWarningNotification,
} from "../../redux/reducers/notificationReducer";

const ProductCount = ({ item, cartData, userId }) => {
  const dispatch = useDispatch();
  const [productCount, setProductCount] = useState(item.cartQuantity);

  const handleMinusClick = (id) => {
    if (productCount === 1) {
      dispatch(setErrorMessage("最低購買數量: 1"));
      dispatch(setShowWarningNotification(true));
    }
    if (productCount > 1) {
      setProductCount(Number(productCount) - 1);
      const newCartData = JSON.stringify(
        JSON.parse(cartData).map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: Number(item.quantity) - 1,
            };
          }
          return item;
        })
      );
      localStorage.setItem(`cartId${userId}`, newCartData);
      dispatch(setCartData(newCartData));
    }
  };

  const handlePlusClick = (id) => {
    if (productCount === item.quantity) {
      dispatch(setErrorMessage("超過庫存"));
      dispatch(setShowWarningNotification(true));
    }
    if (item && productCount < item.quantity) {
      setProductCount(Number(productCount) + 1);
      const newCartData = JSON.stringify(
        JSON.parse(cartData).map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: Number(item.quantity) + 1,
            };
          }
          return item;
        })
      );
      localStorage.setItem(`cartId${userId}`, newCartData);
      dispatch(setCartData(newCartData));
    }
  };

  return (
    <Div d="flex" m={{ y: "1rem" }}>
      <Button
        h="2.5rem"
        w="2.5rem"
        bg="transparent"
        hoverBg="info300"
        rounded="sm"
        onClick={() => {
          handleMinusClick(item.id);
        }}
      >
        <Icon name="Minus" size="20px" color="info700" />
      </Button>
      <Div
        border={{ b: "1px solid" }}
        textAlign="center"
        textSize="subheader"
        w="4rem"
        title={`請輸入 0~${item && item.quantity} 內的數字`}
      >
        <Text>{productCount}</Text>
      </Div>
      <Button
        h="2.5rem"
        w="2.5rem"
        bg="transparent"
        hoverBg="info300"
        rounded="sm"
        onClick={() => {
          handlePlusClick(item.id);
        }}
      >
        <Icon name="Plus" size="20px" color="info700" />
      </Button>
    </Div>
  );
};

ProductCount.propTypes = {
  item: PropTypes.object,
  cartData: PropTypes.string,
  userId: PropTypes.number,
};

export default ProductCount;
