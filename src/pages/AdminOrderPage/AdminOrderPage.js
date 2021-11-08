import React, { useEffect, useState } from "react";
import { Div, Button } from "atomize";
import { login } from "../../WebAPI/userAPI";
import { getOrders, deleteOrder } from "../../WebAPI/orderAPI";
import { OrderFilterButton } from "../../Components/AdminSystem/FilterButton";
import PropTypes from "prop-types";

const OrderList = ({ order, handleDeleteOrder }) => {
  return (
    <Div
      border="1px solid"
      m={{ t: "2rem" }}
      p="1rem"
      rounded="sm"
      d="flex"
      justify="space-between"
    >
      {" "}
      <Div transform="translateY(25%)">編號：1{order.id}</Div>
      <Div d="flex">
        <Button
          h="2.5rem"
          p={{ x: "1.25rem" }}
          textSize="body"
          bg="white"
          hoverBg="warning300"
          rounded="xl"
          m={{ r: "1rem" }}
          fontFamily="code"
          textColor="black700"
          border="1px solid"
          borderColor="black900"
          textWeight="300"
          onClick={() => {
            handleDeleteOrder(order.id);
          }}
        >
          取消訂單
        </Button>
      </Div>
    </Div>
  );
};

OrderList.propTypes = {
  order: PropTypes.object,
  id: PropTypes.number,
  handleDeleteOrder: PropTypes.func,
};

const AdminOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [display, setDisplay] = useState("all");

  const DISPLAY_MAP = {
    all: (order) => order,
    trading: (order) => order.isCompleted == false,
    completed: (order) => order.isCompleted == true,
  };

  useEffect(() => {
    login("admin", "admin").then(() => {
      getOrders(1).then((res) => {
        setOrders(res.data.rows);
      });
    });
  }, []);

  function handleDeleteOrder(id) {
    deleteOrder(id);
  }

  console.log(orders);

  function handleAllFilter() {
    setDisplay("all");
  }

  function handleTradingFilter() {
    setDisplay("trading");
  }

  function handleCompletedFilter() {
    setDisplay("completed");
  }

  return (
    <Div>
      <Div m={{ l: "5rem", r: "5rem" }}>
        <OrderFilterButton
          order={orders}
          handleAllFilter={handleAllFilter}
          handleTradingFilter={handleTradingFilter}
          handleCompletedFilter={handleCompletedFilter}
        />
        {orders.filter(DISPLAY_MAP[display]).map((order) => (
          <OrderList
            key={order.id}
            order={order}
            handleDeleteOrder={handleDeleteOrder}
          />
        ))}
      </Div>
    </Div>
  );
};

export default AdminOrderPage;
