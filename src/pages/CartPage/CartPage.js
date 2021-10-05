import React, { useState } from "react";
import { Div, Text, Col, Checkbox, Button, Label, Icon } from "atomize";
import styled from "styled-components";

const BookingProducts = styled.div`
  visibility: hidden;
  width: 0;
  background: white;
  height: 0;

  ${(props) =>
    props.$isShow &&
    `
    visibility: visible;
    position: absolute;
    z-index: 99;
    height: 12rem;
    width: 18rem;
    background: white;
    border: 1px solid #adadad;
    border-radius: 6px;
    top: 1.5rem;
    right: 1rem;
    transition: all 0.5s ease-in-out;

    @media screen and (max-width: 768px){
      height: 18rem;
      width: 12rem;
      right: 0.5rem;
      top: 1rem;
    }
  `}
`;

const BasicCheckbox = () => {
  const [checked, setChecked] = useState(false);
  const handleToggle = (e) => {
    e.target.checked ? setChecked(true) : setChecked(false);
  };

  return (
    <>
      <Label align="center" textWeight="600">
        <Checkbox onChange={handleToggle} checked={checked} />
      </Label>
    </>
  );
};

export default function CartPage() {
  const [isShow, setIsShow] = useState(false);

  const handleToggleBooking = () => {
    isShow ? setIsShow(false) : setIsShow(true);
  };

  const cartList = (
    <Div p={{ x: { xs: "1rem", lg: "5rem" }, t: { xs: "3rem", lg: "5rem" } }}>
      {["賣家A", "賣家B", "賣家C"].map((name, index) => (
        <Div key={index} pos="relative">
          <Div p="1rem" bg="gray400" m={{ t: "2rem" }}>
            {name}
          </Div>
          <Div d={{ xs: "block", lg: "flex" }} pos="relative">
            <Div d="flex">
              <BasicCheckbox />
              <Div m={{ l: "2rem" }}>
                <Col>
                  <Div
                    bgImg="https://cdn2.ettoday.net/images/3161/d3161278.jpg"
                    bgSize="cover"
                    bgPos="center"
                    w={{ xs: "10rem", lg: "12rem" }}
                    h={{ xs: "10rem", lg: "12rem" }}
                    rounded="lg"
                    m={{ t: "1rem" }}
                  />
                </Col>
              </Div>
            </Div>
            <Div
              d={{ xs: "static", lg: "flex" }}
              justify="space-between"
              m={{ x: "4rem", y: "2rem" }}
            >
              <Div>
                <Text>商品名稱</Text>
                <Text m={{ t: "1rem" }}>數量</Text>
                <Text>$ 0</Text>
              </Div>
            </Div>
            <Icon
              pos={{ xs: "static", lg: "absolute" }}
              name="Cross"
              size="20px"
              right="1rem"
              top="1rem"
              m={{ y: "0.5rem", l: "6rem" }}
            />
            <BookingProducts $isShow={isShow} />
          </Div>
        </Div>
      ))}
    </Div>
  );

  return (
    <Div
      bg="gray200"
      w="80%"
      m={{ y: "4rem", x: "auto" }}
      p={{ xs: "1rem", lg: "2rem" }}
    >
      {cartList}
      <Div m={{ t: "4rem" }} border="2px solid" borderColor="gray400" />
      <Div m={{ y: "2rem", l: "3rem" }} p={{ xs: "1rem", lg: "2rem" }}>
        <Div d={{ xs: "block", lg: "flex" }} justify="space-between">
          <div>
            <Label>
              <BasicCheckbox />
              全選
            </Label>
          </div>
          <div>
            合計價格：$ 0
            <Button
              h="3rem"
              p={{ x: "1.25rem" }}
              textSize="body"
              textColor="info700"
              hoverTextColor="info900"
              bg="white"
              hoverBg="info200"
              border="1px solid"
              borderColor="info700"
              hoverBorderColor="info900"
              m={{ r: "0.5rem", t: "1rem" }}
              onClick={handleToggleBooking}
              $isShow={isShow}
            >
              預訂食物
            </Button>
          </div>
        </Div>
      </Div>
    </Div>
  );
}

/*<BookingProducts $isShow={isShow} onClick={handleShowBooking}>
        {vendorList}
        <Div d={{ xs: "block", xl: "flex" }}>
          <Button
            h="3rem"
            p={{ x: "1.25rem" }}
            textSize="body"
            textColor="info700"
            hoverTextColor="info900"
            bg="white"
            hoverBg="info200"
            border="1px solid"
            borderColor="info700"
            hoverBorderColor="info900"
            m={{ x: "auto", y: "1rem" }}
          >
            提交
          </Button>
          <Button
            h="3rem"
            p={{ x: "1.25rem" }}
            textSize="body"
            textColor="info700"
            hoverTextColor="info900"
            bg="white"
            hoverBg="info200"
            border="1px solid"
            borderColor="info700"
            hoverBorderColor="info900"
            m={{ x: "auto", y: "1rem" }}
          >
            取消
          </Button>
          </BookingProducts>
    </Div>
    
    const vendorList = (
  <Div m={{ x: "auto", y: "1rem" }}>
    {["賣家A", "賣家B", "賣家C"].map((name, index) => (
      <Div
        key={index}
        border={{ b: "2px solid" }}
        borderColor="gray400"
        textSize="subheader"
        p="2rem"
        w="60%"
        m={{ x: "auto", y: "1rem" }}
      >
        <Div>{name}</Div>
        <Div>營業時間：10:00 AM ~ 17:00 PM</Div>
        <Input type="time"></Input>
      </Div>
    ))}
  </Div>
);
*/
