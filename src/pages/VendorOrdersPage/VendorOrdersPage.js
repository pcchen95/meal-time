import React, { useEffect, useState } from "react";
import { Div, Text } from "atomize";
import { useDispatch, useSelector } from "react-redux";
import PaginationButton from "../../Components/PaginationButton";
import LoadingPage from "../LoadingPage";
import OrderList from "../../Components/OrderSystem/OrderList";
import FilterButton from "../../Components/OrderSystem/FilterButton";
import {
  getOrdersSold,
  selectAllOrders,
  selectStatus,
  selectIsLoading,
  selectTotalPages,
  cleanOrders,
} from "../../redux/reducers/orderReducer";
import SuccessNotification from "../../Components/Notifications/SuccessNotification";
import WarningNotification from "../../Components/Notifications/WarningNotification";

export default function OrdersBoughtPage() {
  const orders = useSelector(selectAllOrders);
  const status = useSelector(selectStatus);
  const totalPages = useSelector(selectTotalPages);
  const isLoading = useSelector(selectIsLoading);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const limit = 5;

  useEffect(() => {
    window.scroll(0, 0);
    dispatch(
      getOrdersSold({
        limit,
        page,
        status,
      })
    );
    return () => {
      dispatch(cleanOrders());
    };
  }, [page, status]);

  return (
    <Div
      w="80%"
      minH="40rem"
      m={{ y: "4rem", x: "auto" }}
      p={{ xs: "1rem", lg: "3rem", b: { lg: "6rem" } }}
      pos="relative"
    >
      {isLoading && <LoadingPage />}
      <FilterButton setPage={setPage} />
      {!orders || orders.length === 0 ? (
        <Div
          rounded="lg"
          w="40%"
          h="4rem"
          m={{ x: "auto", y: "auto" }}
          textAlign="center"
        >
          <Text textColor="warning700" textSize="title">
            目前還沒有訂單資料…
          </Text>
        </Div>
      ) : (
        orders && <OrderList orders={orders} />
      )}
      <PaginationButton totalPages={totalPages} page={page} setPage={setPage} />
      <SuccessNotification />
      <WarningNotification />
    </Div>
  );
}
