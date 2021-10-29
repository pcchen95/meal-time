import React from "react";
import PropTypes from "prop-types";
import { Div, Button } from "atomize";

const OrderDetails = ({
  order,
  handleCompleteClick,
  handleCancelClick,
  isDisabled,
}) => {
  return (
    <Div d="flex" m={{ t: "2rem" }} justify="center">
      {order.order.isCompleted ||
      order.order.isCanceledByClient ||
      order.order.isCanceledByVendor ? (
        <Button
          h="3rem"
          p={{ x: "1.25rem" }}
          textSize="body"
          border="1px solid"
          borderColor="info700"
          m={{ t: "2rem" }}
          disabled={true}
        >
          訂單已完成/取消
        </Button>
      ) : (
        <>
          <Button
            h="3rem"
            p={{ x: "1.25rem" }}
            textSize="body"
            textColor="info700"
            hoverTextColor="info500"
            bg="white"
            hoverBg="warning300"
            border="1px solid"
            borderColor="info700"
            hoverBorderColor="info800"
            onClick={handleCompleteClick}
            disabled={isDisabled}
          >
            完成訂單
          </Button>
          <Button
            h="3rem"
            p={{ x: "1.25rem" }}
            textSize="body"
            textColor="info700"
            hoverTextColor="danger600"
            bg="white"
            hoverBg="warning300"
            border="1px solid"
            borderColor="info700"
            hoverBorderColor="danger800"
            m={{ l: "0.5rem" }}
            onClick={handleCancelClick}
            disabled={isDisabled}
          >
            取消訂單
          </Button>
        </>
      )}
    </Div>
  );
};

OrderDetails.propTypes = {
  order: PropTypes.object,
  handleCompleteClick: PropTypes.func,
  handleCancelClick: PropTypes.func,
  isDisabled: PropTypes.bool,
};

export default OrderDetails;
