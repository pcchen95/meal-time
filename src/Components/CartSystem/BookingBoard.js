import React from "react";
import styled from "styled-components";
import BookingButton from "../../Components/CartSystem/BookingButton";
import { Div, Text, Input, Textarea } from "atomize";
import OpeningHour from "./OpeningHour";

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

const BookingBoard = ({ vendorById, isShow, handleIsShow }) => {
  return (
    <Booking $isShow={isShow}>
      <BookingProducts $isShow={isShow}>
        <Div fontFamily="code" textAlign="center">
          <OpeningHour vendorById={vendorById} />
          <form>
            <Div border={{ t: "3px solid" }} borderColor="gray200">
              <Text textSize="heading" m="1rem" textColor="info800">
                預約時間
              </Text>
              <Text textSize="subheader" textColor="warning700">
                請預約在店家營業時段
              </Text>
              <Input
                type="datetime-local"
                m="1rem"
                min={new Date().toISOString().split(".")[0]}
                required
              />
              <Text textSize="heading" m="1rem" textColor="gray800">
                備註
              </Text>
              <Textarea m="1rem" maxH="8rem" />
              <BookingButton handleIsShow={handleIsShow} />
            </Div>
          </form>
        </Div>
      </BookingProducts>
    </Booking>
  );
};

export default BookingBoard;
