import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Div, Text } from "atomize";
import OrderItems from "../../Components/OrderSystem/OrderItems";
import OrderDetails from "../../Components/OrderSystem/OrderDetails";
import OrderButton from "../../Components/OrderSystem/OrderButton";
import LoadingPage from "../LoadingPage";
import SuccessNotification from "../../Components/Notifications/SuccessNotification";
import WarningNotification from "../../Components/Notifications/WarningNotification";
import {
  getOrder,
  selectSingleOrder,
  completeOrder,
  cancelOrder,
  selectIsDisabled,
  cleanOrderDetails,
  selectIsLoading,
} from "../../redux/reducers/orderReducer";

export default function OrderDetailsPage() {
  let { id } = useParams();
  const order = useSelector(selectSingleOrder);
  const isLoading = useSelector(selectIsLoading);
  const isDisabled = useSelector(selectIsDisabled);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrder(id));
    return () => dispatch(cleanOrderDetails());
  }, [id, isDisabled]);

  const handleCompleteClick = () => {
    dispatch(completeOrder(id));
  };

  const handleCancelClick = () => {
    dispatch(cancelOrder(id));
  };

  return (
    <Div w="80%" m={{ y: "2rem", x: "auto" }} pos="relative">
      <Div border={{ b: "4px solid" }} borderColor="info600" w="7rem">
        <Text textSize="heading" w="10rem">
          訂單詳情
        </Text>
      </Div>
      {isLoading && <LoadingPage />}
      {order.orderItems && <OrderItems orderItems={order.orderItems} />}
      {order.order && (
        <>
          <OrderDetails order={order} />
          <OrderButton
            order={order}
            handleCompleteClick={handleCompleteClick}
            handleCancelClick={handleCancelClick}
            isDisabled={isDisabled}
          />
        </>
      )}
      <SuccessNotification />
      <WarningNotification />
    </Div>
  );
}
