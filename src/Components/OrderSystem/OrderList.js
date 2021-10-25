import React from "react";
import PropTypes from "prop-types";
import { Div, Button, Icon, Text } from "atomize";
import styled from "styled-components";
import { Link } from "react-router-dom";

const OrderDetails = styled(Link)`
  text-decoration: none;
`;

const OrderList = ({ orders, identity }) => {
  return (
    <Div p={{ x: { xs: "1rem", lg: "5rem" }, y: { xs: "3rem", lg: "4rem" } }}>
      {orders.map((order) => (
        <Div key={order.id} order={order}>
          <Div
            border="1px solid"
            borderColor="gray400"
            m={{ b: "2rem" }}
            rounded="lg"
            shadow="2"
            bg="warning200"
          >
            <Div p="1rem" bg="info300">
              {new Date(order.createdAt).toLocaleString()}
            </Div>
            <Div
              d={{ xs: "static", lg: "flex" }}
              justify="space-between"
              m={{ x: "4rem", y: "2rem" }}
            >
              <Div>
                <Div d="flex">
                  <Icon name="Store" size="20px" />
                  {identity === "client" ? (
                    <Text>
                      商家名稱 &nbsp; {order.Vendor && order.Vendor.vendorName}
                    </Text>
                  ) : (
                    <Text>
                      買家名稱 &nbsp; {order.User && order.User.nickname}
                    </Text>
                  )}
                </Div>
                <Div d="flex" m={{ t: "1rem" }}>
                  <Icon name="Bag" size="20px" />
                  <Text>商品總數 &nbsp; {order.totalQuantity}</Text>
                </Div>
                <Div d="flex" m={{ t: "1rem" }}>
                  <Icon name="Card" size="20px" />
                  <Text>訂單金額 &nbsp;NT {order.totalPrice}</Text>
                </Div>
                <Div d="flex" m={{ t: "1rem" }}>
                  <Icon name="TimestampSolid" size="20px" />
                  <Text>
                    預約時間 &nbsp;
                    {new Date(order.pickupTime).toLocaleString()}
                  </Text>
                </Div>
              </Div>
              <Div>
                <OrderDetails to={`/order_details/${order.id}`}>
                  <Button
                    prefix={
                      <Icon
                        name="EyeSolid"
                        size="16px"
                        color="white"
                        m={{ r: "0.5rem" }}
                      />
                    }
                    bg="warning700"
                    hoverBg="warning800"
                    rounded="circle"
                    p={{ r: "1.5rem", l: "1rem" }}
                    shadow="3"
                    hoverShadow="4"
                    w={{ xs: "10rem", lg: "9.3rem" }}
                    m={{ t: { xs: "1.5rem" } }}
                  >
                    查看訂單詳情
                  </Button>
                </OrderDetails>
              </Div>
            </Div>
          </Div>
        </Div>
      ))}
    </Div>
  );
};

OrderList.propTypes = {
  orders: PropTypes.array,
  identity: PropTypes.string,
};

export default OrderList;
