import React from "react";
import PropTypes from "prop-types";
import { Div, Text } from "atomize";

const OrderDetails = ({ order }) => {
  return (
    <Div
      m={{ l: { xs: "1rem", xl: "6rem" }, t: "1rem" }}
      p={{ x: "2rem", y: "2rem" }}
      border="1px solid"
      borderColor="gray400"
      rounded="lg"
      w="50rem"
      shadow="3"
      minH="20rem"
      bg="warning200"
    >
      <Text bg="gray200" w="8rem" m={{ t: "1rem" }} textTransform="uppercase">
        {order.order.orderNumber}
      </Text>
      <Div m={{ t: "1rem" }} d="flex">
        訂單狀態：
        <Div
          bg="warning700"
          rounded="circle"
          p={{ r: "1.5rem", l: "1rem" }}
          w="5.5rem"
        >
          {order.order.isCanceledByVendor || order.order.isCanceledByClient
            ? "已取消"
            : order.order.isCompleted
            ? "已完成"
            : "待取貨"}
        </Div>
      </Div>
      <Text m={{ t: "1rem" }}>面交</Text>
      <Text m={{ t: "1rem" }}>訂單金額：NT$ {order.order.totalPrice}</Text>
      <Text m={{ t: "1rem" }}>
        預訂時間：{new Date(order.order.pickupTime).toLocaleString()}
      </Text>
      <Text m={{ t: "1rem" }}>店家地址：{order.order.Vendor.address}</Text>
      <Text m={{ t: "1rem" }} w="46rem">
        備註：
        {order.order.remarks}
      </Text>
    </Div>
  );
};

OrderDetails.propTypes = {
  order: PropTypes.object,
};

export default OrderDetails;
