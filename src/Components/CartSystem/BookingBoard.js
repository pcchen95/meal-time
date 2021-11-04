import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Div, Text, Textarea, Button } from "atomize";
import OpeningHour from "./OpeningHour";
import {
  selectVendorId,
  selectOrderProducts,
} from "../../redux/reducers/cartReducer";
import { useSelector } from "react-redux";
import ChooseTime from "./ChooseTime";

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
    height: 40rem;
    width: 26rem;
    background: white;
    border: 1px solid #adadad;
    border-radius: 6px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    @media screen and (max-width: 768px){
      top: 0;
      left: 0;
      position: static;
      transform: translate(0,0);
      height: 38rem;
      width: 100%;
    }
  `}
`;

const BookingBoard = ({
  vendorById,
  isShow,
  handleIsShow,
  handleSubmit,
  pickupTime,
  setPickupTime,
  pickupDate,
  setPickupDate,
  remarks,
  setRemarks,
  cart,
  availBookingTime,
  availPickupDates,
}) => {
  const vendorId = useSelector(selectVendorId);
  const orderProducts = useSelector(selectOrderProducts);
  return (
    <Booking $isShow={isShow}>
      <BookingProducts $isShow={isShow}>
        {vendorById == "no-result" ? (
          <Div textAlign="center">
            <Div textColor="danger700" textSize="title">
              此賣家已被停權，請選擇其他賣家商品
            </Div>
            <Button
              h="3rem"
              p={{ x: "1.25rem" }}
              textSize="body"
              textColor="info700"
              hoverTextColor="info800"
              bg="white"
              hoverBg="info300"
              border="1px solid"
              borderColor="info700"
              hoverBorderColor="info800"
              m={{ t: "1rem" }}
              onClick={() => handleIsShow("cancel")}
              pos="absolute"
              left="50%"
              transform="translate(-50%)"
            >
              確定
            </Button>
          </Div>
        ) : (
          <Div fontFamily="code" textAlign="center">
            <OpeningHour vendorById={vendorById} />
            <div>
              <Div border={{ t: "3px solid" }} borderColor="gray200">
                <Text textSize={{xs: "subheader", lg: "title"}} m={{y: "0.5rem"}} textColor="info800">
                  預約時間
                </Text>
                <Text textSize={{xs: "body", lg: "paragraph"}} textColor="warning700">
                  請預約在店家營業時段
                </Text>
                {vendorId && cart && vendorById && (
                  <ChooseTime
                    pickupDate={pickupDate}
                    setPickupDate={setPickupDate}
                    pickupTime={pickupTime}
                    setPickupTime={setPickupTime}
                    availBookingTime={availBookingTime}
                    availPickupDates={availPickupDates}
                  />
                )}
                <Text textSize={{xs: "paragraph", lg: "subheader"}} m={{y: "0.5rem"}} textColor="gray800">
                  備註
                </Text>
                <Textarea
                  m={{x: "1rem"}}
                  maxH="6rem"
                  name="remarks"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
                <Div d="flex" w="26rem" align="center" justify="center" m={{t: "0.5rem" }}>
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
                    onClick={() =>
                      handleSubmit(
                        orderProducts,
                        vendorId,
                        pickupTime,
                        remarks,
                        setPickupTime,
                        setRemarks
                      )
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
                    m={{ l: "0.5rem"}}
                    onClick={() => handleIsShow("cancel")}
                  >
                    取消
                  </Button>
                </Div>
              </Div>
            </div>
          </Div>
        )}
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
  pickupDate: PropTypes.number,
  remarks: PropTypes.string,
  setPickupTime: PropTypes.func,
  setPickupDate: PropTypes.func,
  setRemarks: PropTypes.func,
  cart: PropTypes.object,
  availBookingTime: PropTypes.object,
  availPickupDates: PropTypes.array,
};

export default BookingBoard;
