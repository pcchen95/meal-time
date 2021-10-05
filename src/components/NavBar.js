import React from "react";
import { Row, Col, Div, Input, Icon, Image, Button } from "atomize";

const InputWithRightIcon = () => {
  return (
    <Div d="flex">
      <Image
        transform="translateY(-25%)"
        rounded="circle"
        h="5rem"
        w="5rem"
        src="https://i.pinimg.com/564x/82/ba/7d/82ba7db3760b88da021a340ee9eb861e.jpg"
      />
      <Input
        placeholder="Search"
        suffix={
          <Icon
            name="Search"
            size="20px"
            cursor="pointer"
            onClick={() => console.log("clicked")}
            pos="absolute"
            top="25%"
            right="1rem"
            transform="translateY(-50%)"
          />
        }
      />
    </Div>
  );
};

const CategoryButton = () => {
  return (
    <Div d="flex">
      <Button
        h="2.5rem"
        p={{ x: "1.25rem" }}
        textSize="body"
        bg="white"
        hoverBg="warning300"
        rounded="circle"
        m={{ r: "1rem" }}
        fontFamily="code"
        textColor="info700"
        border="1px solid"
        borderColor="info500"
      >
        生鮮蔬果
      </Button>
      <Button
        h="2.5rem"
        p={{ x: "1.25rem" }}
        textSize="body"
        bg="white"
        hoverBg="warning300"
        rounded="circle"
        m={{ r: "1rem" }}
        fontFamily="code"
        textColor="info700"
        border="1px solid"
        borderColor="info500"
      >
        冷藏肉品
      </Button>{" "}
      <Button
        h="2.5rem"
        p={{ x: "1.25rem" }}
        textSize="body"
        bg="white"
        hoverBg="warning300"
        rounded="circle"
        m={{ r: "1rem" }}
        fontFamily="code"
        textColor="info700"
        border="1px solid"
        borderColor="info500"
      >
        生鮮蔬果
      </Button>
      <Button
        h="2.5rem"
        p={{ x: "1.25rem" }}
        textSize="body"
        bg="white"
        hoverBg="warning300"
        rounded="circle"
        m={{ r: "1rem" }}
        fontFamily="code"
        textColor="info700"
        border="1px solid"
        borderColor="info500"
      >
        冷藏肉品
      </Button>
      <Button
        h="2.5rem"
        p={{ x: "1.25rem" }}
        textSize="body"
        bg="white"
        hoverBg="warning300"
        rounded="circle"
        m={{ r: "1rem" }}
        fontFamily="code"
        textColor="info700"
        border="1px solid"
        borderColor="info500"
      >
        零食
      </Button>
      <Button
        h="2.5rem"
        p={{ x: "1.25rem" }}
        textSize="body"
        bg="white"
        hoverBg="warning300"
        rounded="circle"
        m={{ r: "1rem" }}
        fontFamily="code"
        textColor="info700"
        border="1px solid"
        borderColor="info500"
      >
        飲品
      </Button>
      <Button
        h="2.5rem"
        p={{ x: "1.25rem" }}
        textSize="body"
        bg="white"
        hoverBg="warning300"
        rounded="circle"
        m={{ r: "1rem" }}
        fontFamily="code"
        textColor="info700"
        border="1px solid"
        borderColor="info500"
      >
        其他
      </Button>
    </Div>
  );
};

const LikeButton = () => {
  return (
    <Button
      h="2.5rem"
      w="2.5rem"
      bg="white"
      hoverBg="warning400"
      rounded="circle"
    >
      <Icon name="HeartSolid" size="20px" color="danger700" />
    </Button>
  );
};

const NotiButton = () => {
  return (
    <Button
      h="2.5rem"
      w="2.5rem"
      bg="white"
      hoverBg="warning400"
      rounded="circle"
    >
      <Icon name="Notification" size="20px" color="black700" />
    </Button>
  );
};

const MenuButton = () => {
  return (
    <Button
      h="2.5rem"
      w="2.5rem"
      bg="white"
      hoverBg="warning400"
      rounded="circle"
    >
      <Icon name="Menu" size="20px" color="black700" />
    </Button>
  );
};

const UserButton = () => {
  return (
    <Button
      h="2.5rem"
      w="2.5rem"
      bg="white"
      hoverBg="warning600"
      rounded="circle"
      m={{ l: "1rem" }}
    >
      <Icon name="UserCircle" size="30px" color="black900" />
    </Button>
  );
};

/*const Container = () => {
  return (
    <Row>
      <Col size="5">
        <Div p="1rem" bg="warning500">
          This is 5 of 12
        </Div>
      </Col>
      <Col size="7">
        <Div p="1rem" bg="warning500">
          This is 7 of 12
        </Div>
      </Col>
    </Row>
  );
};*/

const NavBar = () => {
  return (
    <Div
      m={{ t: "1.5rem", l: "1.5rem", r: "1.5rem", b: "3rem" }}
      p={{ t: "2rem", l: "2rem", r: "2rem" }}
      d="flex"
      justify="space-between"
      border={{ b: "1px solid" }}
      borderColor="info400"
      shadow="2"
    >
      <InputWithRightIcon></InputWithRightIcon>
      <CategoryButton></CategoryButton>
      <Div d="flex">
        <LikeButton></LikeButton>
        <NotiButton></NotiButton>
        <MenuButton></MenuButton>
        <UserButton></UserButton>
      </Div>
    </Div>
  );
};

export default NavBar;
