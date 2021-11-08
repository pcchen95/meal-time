import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Div } from "atomize";

const HomepageCarousel = () => {
  return (
    <Carousel>
      <Div
        bgImg="https://i.imgur.com/vc6WV4u.png"
        bgSize="cover"
        bgPos="bottom"
        h="50rem"
      />
      <Div
        bgImg="https://i.imgur.com/I78GIvc.png"
        bgSize="cover"
        bgPos="left"
        h="50rem"
      />

      <Div
        bgImg="https://i.imgur.com/LIPGvxV.png"
        bgSize="cover"
        bgPos="left"
        h="50rem"
      />
    </Carousel>
  );
};

export default HomepageCarousel;
