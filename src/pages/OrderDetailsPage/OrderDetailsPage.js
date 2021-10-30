import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { Div, Text } from "atomize";
import OrderItems from "../../Components/OrderSystem/OrderItems";
import OrderDetails from "../../Components/OrderSystem/OrderDetails";
import OrderButton from "../../Components/OrderSystem/OrderButton";
import BackButton from "../../Components/OrderSystem/BackButton";
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
  const orderPage = true;
  const order = useSelector(selectSingleOrder);
  const isLoading = useSelector(selectIsLoading);
  const isDisabled = useSelector(selectIsDisabled);
  const user = useSelector((store) => store.users.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (user === "non-login") {
      return history.push("/");
    }
    window.scroll(0, 0);
    dispatch(getOrder(id));
    return () => dispatch(cleanOrderDetails());
  }, [user, id, isDisabled]);

  const handleCompleteClick = () => {
    dispatch(completeOrder(id));
  };

  const handleCancelClick = () => {
    dispatch(cancelOrder(id));
  };

  return (
    <Div w="80%" m={{ y: "2rem", x: "auto" }} minH={isLoading ? "120rem" : "0"}>
      <Div border={{ b: "4px solid" }} borderColor="info600" w="7rem">
        <Text textSize="heading" w="10rem">
          訂單詳情
        </Text>
      </Div>
      {isLoading && <LoadingPage />}
      {order.orderItems ? (
        <OrderItems orderItems={order.orderItems} />
      ) : (
        <BackButton orderPage={orderPage} isLoading={isLoading} />
      )}
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
