import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Div, Button, Text, Icon } from "atomize";
import CartList from "../../Components/CartSystem/CartList";
import BookingBoard from "../../Components/CartSystem/BookingBoard";
import LoadingPage from "../LoadingPage";
import {
  getMe,
  selectCart,
  setVendorId,
  selectVendorId,
  selectIsLoading,
  getCartData,
  selectCartData,
  setCartData,
  selectUserId,
  selectOrderProducts,
  setOrderProducts,
} from "../../redux/reducers/cartReducer";
import { newOrder } from "../../redux/reducers/orderReducer";
import { getVendorById } from "../../redux/reducers/vendorReducer";
import { setErrorMessage } from "../../redux/reducers/notificationReducer";
import SuccessNotification from "../../Components/Notifications/SuccessNotification";
import WarningNotification from "../../Components/Notifications/WarningNotification";

export default function CartPage() {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const cartData = useSelector(selectCartData);
  const userId = useSelector(selectUserId);
  const cart = useSelector(selectCart);
  const vendorId = useSelector(selectVendorId);
  const isLoading = useSelector(selectIsLoading);
  const orderProducts = useSelector(selectOrderProducts);
  const vendorById = useSelector((store) => store.vendors.vendorById);
  const errMessage = useSelector((store) => store.notifications.errMessage);

  useEffect(() => {
    dispatch(getMe());
    dispatch(getCartData(userId));
    dispatch(setCartData(localStorage.getItem(`cartId${userId}`)));
    return () => {
      dispatch(setErrorMessage(null));
    };
  }, [userId, cartData]);

  const handleIsShow = (type) => {
    if (type === "book") {
      if (isChecked === true) {
        dispatch(setErrorMessage(null));
        dispatch(getVendorById(vendorId));
        setIsShow(true);
      } else {
        window.scroll(0, 0);
        dispatch(setErrorMessage("請至少勾選一個購物車才能預訂食物"));
      }
      if (vendorId) {
        let isSelectFood = [];
        let result = [];
        if (vendorId) {
          vendorId &&
            cart[vendorId].forEach((item) => isSelectFood.push(item.id));
          for (let i = 0; i < isSelectFood.length; i++) {
            result.push(
              JSON.parse(cartData).find((item) => item.id == isSelectFood[i])
            );
          }
          console.log("vendorId", vendorId);
          console.log("orderProducts:", orderProducts);

          dispatch(setOrderProducts(result));
        }
      }
    }
    if (type === "cancel") {
      setIsShow(false);
      setVendorId(null);
    }
  };

  const handleCheckedClick = (e) => {
    dispatch(setVendorId(e.target.value));
    setIsChecked(!isChecked);

    if (isChecked) {
      dispatch(setVendorId(null));
      dispatch(setOrderProducts([]));
    }
  };

  const handleDeleteClick = (id, userId) => {
    const newCartData = JSON.stringify(
      JSON.parse(cartData).filter((item) => item.id !== id)
    );
    localStorage.setItem(`cartId${userId}`, newCartData);
    dispatch(setCartData(newCartData));
  };

  const handleSubmit = (orderProducts, vendorId, pickupTime, remarks) => {
    dispatch(
      newOrder({
        orderProducts,
        vendorId,
        pickupTime,
        remarks,
      })
    );
  };

  return (
    <Div
      bg="gray200"
      w="80%"
      m={{ y: "4rem", x: "auto" }}
      p={{ xs: "1rem", lg: "2rem" }}
    >
      {isLoading && <LoadingPage />}
      <Div m={{ t: "2rem", l: { xs: "0", lg: "5rem" } }}>
        <Div
          border={{ b: "4px solid" }}
          borderColor="info600"
          w="10rem"
          textAlign="center"
        >
          <Div d="flex">
            <Icon name="Bag" size="50px" color="black300" />
            <Text textSize="display1" w="24rem" textColor="black300">
              購物車
            </Text>
          </Div>
        </Div>
        <Div d="flex" m={{ t: "1rem" }} textColor="warning800">
          <Icon name="Alert" size="20px" color="warning800" />
          <Text>一次只能預訂一位賣家商品，如果有多位賣家商品請分開下單</Text>
        </Div>
        {errMessage && (
          <Text
            m={{ t: "1rem" }}
            textColor="danger700"
            textSize="title"
            textWeight="700"
          >
            {errMessage}
          </Text>
        )}
      </Div>
      <CartList
        setErrorMessage={setErrorMessage}
        isChecked={isChecked}
        vendorId={vendorId}
        handleCheckedClick={handleCheckedClick}
        handleDeleteClick={handleDeleteClick}
        userId={userId}
        cart={cart}
        cartData={cartData}
      />
      <Div m={{ t: "4rem" }} border="2px solid" borderColor="warning600" />
      <Div m={{ y: "2rem" }} p={{ xs: "1rem", lg: "2rem" }} pos="relative">
        <Button
          h="3rem"
          p={{ x: "1.25rem" }}
          textSize="body"
          textColor="info700"
          bg="white"
          hoverBg="warning300"
          border="1px solid"
          borderColor="info700"
          hoverBorderColor="info800"
          m={{ r: "0.5rem", t: "1rem" }}
          pos="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          onClick={() => handleIsShow("book")}
          $isShow={isShow}
        >
          預訂
        </Button>
      </Div>
      <BookingBoard
        vendorById={vendorById}
        isShow={isShow}
        handleIsShow={handleIsShow}
        handleSubmit={handleSubmit}
      />
      <SuccessNotification />
      <WarningNotification />
    </Div>
  );
}
