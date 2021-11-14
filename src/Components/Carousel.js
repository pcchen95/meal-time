import React from "react";
import { Div } from "atomize";

const CarouselImgae = () => {
  return (
    <Div
      bgImg="https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1464&q=80"
      bgSize="cover"
      bgPos="left"
      h="20rem"
    />
  );
};

/*
const CarouselLeftButton = () => {
  return (
    <Button
      h="3rem"
      w="3rem"
      bg="transparent"
      hoverBg="danger300"
      rounded="lg"
      m={{ r: "1rem" }}
    >
      <Icon name="LeftArrow" size="35px" color="black900" />
    </Button>
  );
};

const CarouselRightButton = () => {
  return (
    <Button
      h="3rem"
      w="3rem"
      bg="transparent"
      hoverBg="danger300"
      rounded="lg"
      m={{ r: "1rem" }}
    >
      <Icon name="RightArrow" size="35px" color="black900" />
    </Button>
  );
};
*/

const Carousel = () => {
  return (
    <Div>
      <CarouselImgae />
    </Div>
  );
};

export default Carousel;
