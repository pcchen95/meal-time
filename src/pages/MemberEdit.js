import React from "react";
import { Div, Input, Icon, Image, Button } from "atomize";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const MemberEditInfo = () => {
  return (
    <Div m={{ l: "15rem", r: "15rem" }}>
      <Div tag="h2" m={{ b: "1.5rem" }}>
        基本資料
      </Div>
      <Div>
        <Div textSize="subheader" m={{ l: "0.5rem", b: "0.5rem" }}>
          上傳頭貼
        </Div>
        <Div d="flex" align="center" m={{ b: "0.5rem" }}>
          <Image
            src="https://i.pinimg.com/564x/05/7c/33/057c33b7e33bf6a476dd56b7949eee2d.jpg"
            h="15rem"
            w="15rem"
            border="1px solid"
            borderColor="info700"
            rounded="xl"
          />
          <Button
            suffix={
              <Icon
                name="LongRight"
                size="16px"
                color="white"
                m={{ l: "1rem" }}
              />
            }
            bg="info700"
            shadow="1"
            hoverShadow="2"
            m={{ l: "1rem" }}
          >
            上傳檔案
          </Button>
        </Div>
      </Div>
      <Div textSize="subheader" m={{ l: "0.5rem", b: "1rem", t: "3rem" }}>
        暱稱
      </Div>
      <Input
        placeholder="請輸入暱稱"
        m={{ t: "1rem", b: "1rem" }}
        w="30%"
      ></Input>
      <Div textSize="subheader" m={{ l: "0.5rem", b: "1rem" }}>
        密碼
      </Div>
      <Input
        placeholder="請輸入密碼"
        m={{ t: "1rem", b: "1rem" }}
        w="30%"
      ></Input>
      <Div textSize="subheader" m={{ l: "0.5rem", b: "1rem" }}>
        再次輸入密碼
      </Div>
      <Input
        placeholder="再次輸入密碼"
        m={{ t: "1rem", b: "1rem" }}
        w="30%"
      ></Input>
      <Button
        suffix={
          <Icon name="LongRight" size="16px" color="white" m={{ l: "1rem" }} />
        }
        bg="info700"
        shadow="1"
        hoverShadow="2"
        m={{ t: "3rem", b: "3rem" }}
      >
        送出
      </Button>
    </Div>
  );
};

/*
const MemberEditInfo = () => {
  return (
    <Div m={{ l: "10rem", t: "15rem" }}>
      <Div d="flex">
        <Text fontFamily="primary" textSize="title">
          帳號：
        </Text>
        <Input placeholder="請輸入帳號"></Input>
      </Div>
      <Div d="flex">
        <Text fontFamily="primary" textSize="title" m={{ b: "4rem" }}>
          電子信箱：
        </Text>
        <Input placeholder="請輸入帳號" m={{ t: "1rem", b: "1rem" }}></Input>
      </Div>
      <Div d="flex">
        <Text fontFamily="primary" textSize="title">
          密碼：
        </Text>
        <Input placeholder="請輸入帳號"></Input>
      </Div>
      <Div d="flex">
        <Text fontFamily="primary" textSize="title" m={{ b: "4rem" }}>
          請再次輸入密碼：
        </Text>
        <Input placeholder="請輸入帳號" m={{ t: "1rem", b: "1rem" }}></Input>
      </Div>
      <Button
        suffix={
          <Icon name="LongRight" size="16px" color="white" m={{ l: "1rem" }} />
        }
        bg="black200"
        shadow="3"
        hoverShadow="4"
        m={{ r: "1rem", t: "3rem" }}
      >
        送出
      </Button>
    </Div>
  );
};
*/

const MemberEdit = () => {
  return (
    <Div>
      <NavBar />
      <MemberEditInfo />
      <Footer />
    </Div>
  );
};

export default MemberEdit;
