import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Div } from "atomize";

const HomepageCarousel = () => {
  return (
    <Carousel>
      <Div
        bgImg="https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1464&q=80"
        bgSize="cover"
        bgPos="left"
        h="30rem"
      />
      <Div
        bgImg="https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
        bgSize="cover"
        bgPos="left"
        h="30rem"
      />

      <Div
        bgImg="https://images.unsplash.com/photo-1592502712628-c5219bf0bc12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
        bgSize="cover"
        bgPos="left"
        h="30rem"
      />
    </Carousel>
  );
};

export default HomepageCarousel;

/*
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
*/

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

/*
const Carousel = () => {
  return (
    <Div>
      <CarouselImgae />
    </Div>
  );
};
*/
