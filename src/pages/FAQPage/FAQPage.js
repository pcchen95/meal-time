import React from "react";
import { Div, Icon, Button } from "atomize";

const FAQSection = () => {
  return (
    <Div m={{ l: "20rem" }}>
      <Div
        tag="header"
        m={{ b: "1rem" }}
        textWeight="800"
        textColor="black800"
        textSize="title"
      >
        常見問題
      </Div>
      <Div m={{ b: "0.5rem" }}>
        <Div d="flex" m={{ l: "-0.75rem" }}>
          <Button
            h="2.5rem"
            w="2.5rem"
            bg="white"
            hoverBg="warning300"
            rounded="circle"
          >
            <Icon name="DownArrow" size="20px" color="black900" />
          </Button>
          <Div
            transform="translateY(20%)"
            textWeight="500"
            textColor="black500"
          >
            請問是完全免費的嗎？
          </Div>
        </Div>
        <Div transform="translateY(20%)" textWeight="500" textColor="black500">
          是的，完全免費。
        </Div>
        <Div
          border="1px solid"
          borderColor="warning700"
          w="3rem"
          m={{ t: "0.5rem" }}
        ></Div>
      </Div>
      <Div m={{ b: "1rem" }}>
        <Div d="flex" m={{ l: "-0.75rem" }}>
          <Button
            h="2.5rem"
            w="2.5rem"
            bg="white"
            hoverBg="warning300"
            rounded="circle"
          >
            <Icon name="DownArrow" size="20px" color="black900" />
          </Button>
          <Div
            transform="translateY(20%)"
            textWeight="500"
            textColor="black500"
          >
            請問是完全免費的嗎？
          </Div>
        </Div>
        <Div transform="translateY(20%)" textWeight="500" textColor="black500">
          是的，完全免費。
        </Div>
        <Div
          border="1px solid"
          borderColor="warning700"
          w="3rem"
          m={{ t: "0.5rem" }}
        ></Div>
      </Div>

      <Div m={{ b: "1rem" }}>
        <Div d="flex" m={{ l: "-0.75rem" }}>
          <Button
            h="2.5rem"
            w="2.5rem"
            bg="white"
            hoverBg="warning300"
            rounded="circle"
          >
            <Icon name="DownArrow" size="20px" color="black900" />
          </Button>
          <Div
            transform="translateY(20%)"
            textWeight="500"
            textColor="black500"
          >
            請問是完全免費的嗎？
          </Div>
        </Div>
        <Div transform="translateY(20%)" textWeight="500" textColor="black500">
          是的，完全免費。
        </Div>
        <Div
          border="1px solid"
          borderColor="warning700"
          w="3rem"
          m={{ t: "0.5rem" }}
        ></Div>
      </Div>
    </Div>
  );
};

const FAQPage = () => {
  return (
    <Div>
      <FAQSection />
      <FAQSection />
      <FAQSection />
    </Div>
  );
};

export default FAQPage;
