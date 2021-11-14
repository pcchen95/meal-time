import React from "react";
import { useEffect } from "react";
import { Div, Text } from "atomize";
import PropTypes from "prop-types";

const Paragraph = (props) => {
  return (
    <Text m={{ y: "1rem" }} textSize="body" textColor="black500">
      {props.children}
    </Text>
  );
};

Paragraph.propTypes = {
  props: PropTypes.object,
  children: PropTypes.node,
};

const AboutMeInfo = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <Div w="100%" p="1rem">
      <Div
        tag="h1"
        textSize="heading"
        textColor="rgb(66, 100, 22)"
        m={{ b: "2rem" }}
      >
        限時取餐 Meal Time
      </Div>
      <Paragraph>
        是否有逛菜市場時不小心買了太多食材，卻在腐爛前都還來不及料理、食用完畢的經驗呢？
      </Paragraph>
      <Paragraph>
        或者是逛大賣場時失心瘋買了過量零食、水果，才發現吃下肚子的速度趕不上效期呢？
      </Paragraph>
      <Paragraph>
        這些即將過期的食物，若沒辦法在有效的利用下，往往最後只能被扔進廚餘桶或垃圾桶。
      </Paragraph>
      <Paragraph>但現在我們提供您另一種能珍惜每個食物的方式：</Paragraph>
      <Paragraph>
        刊登即期食物在
        <span style={{ color: "rgb(88,145, 15)" }}>限時取餐 Meal Time </span>
        上，將它們分享出去，讓有需要的人將每一個食材都發揮最大的功能。
      </Paragraph>
      <Paragraph>
        同時，您也可以在這裡以便宜的價格取得來自其他人的即期食物，
      </Paragraph>
      <Paragraph>這些食物及食材仍保有一樣的美味，卻更經濟實惠。</Paragraph>
      <Paragraph>
        <span style={{ color: "rgb(88,145, 15)" }}>限時取餐 Meal Time </span>
        的宗旨即在減少食物及金錢的浪費，
      </Paragraph>
      <Paragraph>每個珍惜資源的您，趕緊試試看吧！</Paragraph>
    </Div>
  );
};

const AboutMe = () => {
  return (
    <Div h="auto" minH="40rem">
      <Div
        d="flex"
        flexDir={{ xs: "column", sm: "row" }}
        w={{ xs: "100%", lg: "70%" }}
        maxW="1000px"
        minH="30rem"
        m="3rem auto"
        p="1rem"
      >
        <Div
          w={{ xs: "100%", md: "30%" }}
          bgImg="https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1464&q=80"
          bgSize="cover"
          bgPos="left"
          rounded="xl"
          h={{ xs: "10rem", sm: "auto" }}
        />
        <Div
          w={{ xs: "100%", md: "70%" }}
          d="flex"
          align="center"
          p={{ x: { xs: "0", sm: "2rem" } }}
          h="100%"
        >
          <AboutMeInfo></AboutMeInfo>
        </Div>
      </Div>
    </Div>
  );
};

export default AboutMe;
