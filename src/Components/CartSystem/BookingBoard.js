import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Div, Text, Input, Textarea, Button } from "atomize";
import OpeningHour from "./OpeningHour";
import {
  selectVendorId,
  selectOrderProducts,
} from "../../redux/reducers/cartReducer";
import { useSelector } from "react-redux";

const Booking = styled.div`
  display: none;
  ${(props) =>
    props.$isShow &&
    `
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #c7c1c178;
    z-index: 2;
    `}
`;

const BookingProducts = styled.div`
  display: none;
  ${(props) =>
    props.$isShow &&
    `
    display: block;
    position: fixed;
    z-index: 3;
    height: 48rem;
    width: 26rem;
    background: white;
    border: 1px solid #adadad;
    border-radius: 6px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    @media screen and (max-width: 768px){
      bottom: 0;
      left: 0;
      right: 0;
      transform: translate(0,0);
      height: 48rem;
      width: 100%;
    }
  `}
`;

const BookingBoard = ({ vendorById, isShow, handleIsShow, handleSubmit }) => {
  const vendorId = useSelector(selectVendorId);
  const orderProducts = useSelector(selectOrderProducts);
  const [pickupTime, setPickupTime] = useState("");
  const [remarks, setRemarks] = useState("");
  
  return (
    <Booking $isShow={isShow}>
      <BookingProducts $isShow={isShow}>
        <Div fontFamily="code" textAlign="center">
          <OpeningHour vendorById={vendorById} />
          <div>
            <Div border={{ t: "3px solid" }} borderColor="gray200">
              <Text textSize="heading" m="1rem" textColor="info800">
                預約時間
              </Text>
              <Text textSize="subheader" textColor="warning700">
                請預約在店家營業時段
              </Text>
              <Input
                type="datetime-local"
                name="pickupTime"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                m="1rem"
                min={new Date().toISOString().slice(0, 16)}
                required
              />
              <Text textSize="heading" m="1rem" textColor="gray800">
                備註
              </Text>
              <Textarea
                m="1rem"
                maxH="8rem"
                name="remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
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
                  onClick={() =>
                    handleSubmit(orderProducts, vendorId, pickupTime, remarks)
                  }
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
            </Div>
          </div>
        </Div>
      </BookingProducts>
    </Booking>
  );
};

BookingBoard.propTypes = {
  vendorById: PropTypes.object,
  isShow: PropTypes.bool,
  handleIsShow: PropTypes.func,
  handleSubmit: PropTypes.func,
  pickupTime: PropTypes.string,
  remarks: PropTypes.string,
};

export default BookingBoard;
