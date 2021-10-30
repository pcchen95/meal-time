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
  const [pickupTime, setPickupTime] = useState("");
  const [pickupDate, setPickupDate] = useState(null);
  const [vendorAvailDays, setVendorAvailDays] = useState(null);
  const [availPickupDates, setAvailPickupDates] = useState(null);
  const [availBookingTime, setAvailBookingTime] = useState(null);
  const [remarks, setRemarks] = useState("");
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

  useEffect(() => {
    if (pickupDate) {
      const pickupDay = new Date(pickupDate).getDay();
      for (let i = 0; i < vendorAvailDays.length; i++) {
        const entries = Object.entries(vendorAvailDays[i]);
        if (Number(entries[0][0]) === pickupDay) {
          setAvailBookingTime(entries[0][1]);
        }
      }
    }
  }, [pickupDate, vendorAvailDays]);

  useEffect(() => {
    if (vendorById) {
      const openingHourDetails = Object.entries(
        JSON.parse(vendorById.openingHour)
      );
      setVendorAvailDays(() => {
        return openingHourDetails
          .filter((item) => item[1].isOpen)
          .map((item) => {
            switch (item[0]) {
              case "Monday":
                return { 1: { start: item[1].start, end: item[1].end } };
              case "Tuesday":
                return { 2: { start: item[1].start, end: item[1].end } };
              case "Wednesday":
                return { 3: { start: item[1].start, end: item[1].end } };
              case "Thursday":
                return { 4: { start: item[1].start, end: item[1].end } };
              case "Friday":
                return { 5: { start: item[1].start, end: item[1].end } };
              case "Saturday":
                return { 6: { start: item[1].start, end: item[1].end } };
              case "Sunday":
                return { 7: { start: item[1].start, end: item[1].end } };
            }
          });
      });
    }
  }, [vendorById]);

  useEffect(() => {
    if (vendorAvailDays) {
      const key = Object.keys(cart).indexOf(vendorId);
      const cartItems = Object.values(cart)[key];
      const now = new Date();
      now.setHours(0);
      now.setMinutes(0);
      now.setSeconds(0);
      const expiryDates = cartItems.map((cartItem) =>
        Date.parse(cartItem.expiryDate).valueOf()
      );
      const minExpiryDate = new Date(Math.min(...expiryDates));
      const array = [];
      for (
        let i = Date.parse(now).valueOf();
        i < Date.parse(minExpiryDate).valueOf();
        i += 86400000
      ) {
        vendorAvailDays.forEach((vendorAvailDay) => {
          if (new Date(i).getDay() === Number(Object.keys(vendorAvailDay)[0])) {
            array.push(i);
          }
        });
      }
      setAvailPickupDates(array);
    }
  }, [vendorAvailDays, vendorId, cart]);

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
    setPickupTime("");
    setRemarks("");
  };

  const handleDeleteClick = (id, userId) => {
    const newCartData = JSON.stringify(
      JSON.parse(cartData).filter((item) => item.id !== id)
    );
    localStorage.setItem(`cartId${userId}`, newCartData);
    dispatch(setCartData(newCartData));
  };

  const handleSubmit = (
    orderProducts,
    vendorId,
    pickupTime,
    remarks,
    userId,
    cartData
  ) => {
    if (!pickupTime || !pickupDate) {
      setIsShow(false);
      dispatch(setErrorMessage("請填寫預約時間!"));
      dispatch(setShowWarningNotification(true));
      return;
    }
    const start = Number(availBookingTime.start.replace(":", ""));
    const end = Number(availBookingTime.end.replace(":", ""));
    const pickup = Number(pickupTime.replace(":", ""));

    if (pickup < start || pickup > end) {
      setIsShow(false);
      dispatch(setErrorMessage("預約時間非店家營業時間"));
      dispatch(setShowWarningNotification(true));
      return;
    }

    let pickupDateAndTime = new Date(pickupDate);
    pickupDateAndTime.setHours(Number(pickupTime.slice(0, 2)));
    pickupDateAndTime.setMinutes(Number(pickupTime.slice(3, 5)));
    console.log(pickupDateAndTime);

    dispatch(
      newOrder({
        orderProducts,
        vendorId,
        pickupTime: pickupDateAndTime,
        remarks,
        userId,
        cartData,
      })
    );
    setIsShow(false);
    setIsChecked(false);
    setPickupTime("");
    setRemarks("");
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
            pickupTime={pickupTime}
            pickupDate={pickupDate}
            remarks={remarks}
            setPickupTime={setPickupTime}
            setPickupDate={setPickupDate}
            setRemarks={setRemarks}
            cart={cart}
            availBookingTime={availBookingTime}
            availPickupDates={availPickupDates}
          />
        </>
      )}
      <SuccessNotification />
      <WarningNotification />
    </Div>
  );
}
