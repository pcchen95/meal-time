import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Div, Button, Text, Icon } from "atomize";
import CartList from "../../Components/CartSystem/CartList";
import BookingBoard from "../../Components/CartSystem/BookingBoard";
import LoadingPage from "../LoadingPage";
import {
  getMe,
  getCartData,
  newOrder,
  setCartData,
  setVendorId,
  setOrderProducts,
  selectCart,
  selectUserId,
  selectVendorId,
  selectCartData,
} from "../../redux/reducers/cartReducer";
import { getVendorById } from "../../redux/reducers/vendorReducer";
import {
  setErrorMessage,
  setShowWarningNotification,
} from "../../redux/reducers/notificationReducer";
import SuccessNotification from "../../Components/Notifications/SuccessNotification";
import WarningNotification from "../../Components/Notifications/WarningNotification";

export default function CartPage() {
  const [isChecked, setIsChecked] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const cartData = useSelector(selectCartData);
  const userId = useSelector(selectUserId);
  const cart = useSelector(selectCart);
  const vendorId = useSelector(selectVendorId);
  const user = useSelector((store) => store.users.user);
  const vendorById = useSelector((store) => store.vendors.vendorById);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (user === "non-login") {
      return history.push("/");
    }
    setIsLoading(true);
    batch(async () => {
      await dispatch(getMe());
      if (userId) {
        await dispatch(getCartData(userId));
      }
      await dispatch(setCartData(localStorage.getItem(`cartId${userId}`)));
      setIsLoading(false);
    });
    return () => {
      dispatch(setErrorMessage(null));
    };
  }, [user, userId, cartData, dispatch]);

  const handleIsShow = (type) => {
    if (type === "book") {
      if (isChecked === true) {
        dispatch(setErrorMessage(null));
        dispatch(getVendorById(vendorId));
        setIsShow(true);
        let isSelectFood = [];
        let result = [];
        cart && cart[vendorId].forEach((item) => isSelectFood.push(item.id));
        for (let i = 0; i < isSelectFood.length; i++) {
          result.push(
            JSON.parse(cartData).find((item) => item.id === isSelectFood[i])
          );
        }
        dispatch(setOrderProducts(result));
      } else {
        window.scroll(0, 0);
        dispatch(setErrorMessage("請至少勾選一個購物車才能預訂食物"));
        dispatch(setShowWarningNotification(true));
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
  };

  const handleDeleteClick = (id, userId) => {
    const newCartData = JSON.stringify(
      JSON.parse(cartData).filter((item) => item.id !== id)
    );
    localStorage.setItem(`cartId${userId}`, newCartData);
    dispatch(setCartData(newCartData));
  };

  const handleSubmit = (orderProducts, vendorId, pickupTime, remarks) => {
    if (!pickupTime) {
      setIsShow(false);
      dispatch(setErrorMessage("請填寫預約時間!"));
      dispatch(setShowWarningNotification(true));
      return;
    }
    dispatch(
      newOrder({
        orderProducts,
        vendorId,
        pickupTime,
        remarks,
      })
    );
    setIsShow(false);
    let newData = [].concat(
      JSON.parse(cartData).filter((obj1) =>
        orderProducts.every((obj2) => obj1.id !== obj2.id)
      ),
      orderProducts.filter((obj2) =>
        JSON.parse(cartData).every((obj1) => obj2.id !== obj1.id)
      )
    );
    localStorage.setItem(`cartId${userId}`, JSON.stringify(newData));
    dispatch(setCartData(JSON.stringify(newData)));
  };

  return (
    <Div
      bg="gray200"
      w="80%"
      minH="30rem"
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
      </Div>
      {cartData && cartData.length == 2 ? (
        <Div>
          <Div
            textAlign="center"
            textSize="title"
            textWeight="700"
            m={{ t: "6rem" }}
          >
            目前購物車是空的…
          </Div>
        </Div>
      ) : (
        <>
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
            userId={userId}
          />
        </>
      )}
      <SuccessNotification />
      <WarningNotification />
    </Div>
  );
}
