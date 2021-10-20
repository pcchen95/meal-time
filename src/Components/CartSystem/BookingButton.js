import React from "react";
import { Div, Button } from "atomize";

const BookingButton = ({ handleBookingClick, handleIsShow }) => {
  return (
    <Div d="flex" w="26rem" justify="center">
      <Button
        h="3rem"
        p={{ x: "1.25rem" }}
        textSize="body"
        textColor="info700"
        hoverTextColor="warning800"
        bg="white"
        hoverBg="warning300"
        border="1px solid"
        borderColor="info700"
        hoverBorderColor="warning800"
        m={{ r: "0.5rem", t: "1rem" }}
        onClick={handleBookingClick}
      >
        確定
      </Button>
      <Button
        h="3rem"
        p={{ x: "1.25rem" }}
        textSize="body"
        textColor="info700"
        hoverTextColor="brand800"
        bg="white"
        hoverBg="warning300"
        border="1px solid"
        borderColor="info700"
        hoverBorderColor="danger800"
        m={{ r: "0.5rem", t: "1rem" }}
        onClick={() => handleIsShow("cancel")}
      >
        取消
      </Button>
    </Div>
  );
};

export default BookingButton;
