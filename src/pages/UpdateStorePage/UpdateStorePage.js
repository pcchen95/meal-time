import React from "react";
import { Div, Col, Input, Button, Textarea, Text, Icon } from "atomize";
import CustomRaios from "../../Components/Radiobox";
import SmallSizeDropdown from "../../Components/Dropdown";

export default function UpdateStorePage() {
  const vendorInfo = (
    <>
      {["賣場名稱", "店家地址"].map((name, index) => (
        <Div key={index} textSize="subheader">
          <Input placeholder={name} m="0.5rem" />
        </Div>
      ))}
    </>
  );

  const businessHours = (
    <>
      {[
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
        "星期日",
      ].map((name, index) => (
        <Div
          key={index}
          d={{ xs: "block", md: "flex" }}
          p="1rem"
          align="center"
        >
          <Text textSize="title">{name}</Text>
          <Div m={{ l: "2rem", t: { xl: "0", xs: "2rem" } }}>
            <CustomRaios />
          </Div>
          <Text m={{ x: "2rem", y: "1rem" }}>Start time</Text>
          <Input type="time"></Input>
          <Text m={{ x: "2rem", y: "1rem" }}>Close time</Text>
          <Input type="time"></Input>
        </Div>
      ))}
    </>
  );

  return (
    <Div w="80%" m={{ y: "4rem", x: "auto" }}>
      <Div d={{ xs: "block", xl: "flex" }}>
        <Div border={{ b: "4px solid" }} borderColor="gray400">
          <Div p="1rem" d={{ xs: "block", lg: "flex" }}>
            <Div pos="relative">
              <Col>
                <Div
                  bgImg="https://images.unsplash.com/photo-1559963629-38ed0fbd4c86?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
                  bgSize="cover"
                  bgPos="center"
                  w="14rem"
                  h="14rem"
                  rounded="circle"
                  m={{ t: "1rem" }}
                />
              </Col>
              <Button
                h="2.4rem"
                w="2.4rem"
                bg="info300"
                hoverBg="info400"
                rounded="lg"
                pos="absolute"
                right="0"
                bottom="0"
              >
                <Icon name="Attachment" size="20px" />
              </Button>
            </Div>
            <div>
              <Textarea
                h="14rem"
                w="30rem"
                m={{ t: "1rem", l: "2rem" }}
                placeholder="賣場描述"
                textSize="subheader"
              />
            </div>
          </Div>
          <Div
            w={{ xs: "20rem", md: "30rem" }}
            h="14rem"
            p="1.5rem"
            m={{ y: "2rem", l: { xs: "0", md: "3rem" } }}
          >
            {vendorInfo}
            <SmallSizeDropdown />
          </Div>
        </Div>
        <Div border={{ b: "4px solid" }} borderColor="gray400">
          <Col>
            <Div
              bg="gray400"
              w={{ xs: "16rem", md: "26rem", lg: "40rem" }}
              h={{ xs: "16rem", md: "20rem", lg: "25rem" }}
              m={{ x: "auto", y: "2rem" }}
            >
              地圖
            </Div>
          </Col>
        </Div>
      </Div>
      <Div>
        <Div m={{ y: "1rem" }}>
          <Text textSize="title" textWeight="500" m={{ l: "1rem" }}>
            設定營業時間
          </Text>
          <Div
            bg="gray200"
            border="1px solid"
            shadow="4"
            borderColor="gray200"
            rounded="sm"
          >
            {businessHours}
          </Div>
        </Div>
        <Div d="flex" p="1rem" justify="center">
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
          >
            提交修改
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
            m={{ l: "0.5rem" }}
          >
            取消
          </Button>
        </Div>
      </Div>
    </Div>
  );
}
