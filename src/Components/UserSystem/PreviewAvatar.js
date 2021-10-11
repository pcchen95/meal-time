import React from "react";
import PropTypes from "prop-types";
import { Div } from "atomize";
import DeleteButton from "./DeleteButton";

export default function PreviewAvatar({ img, defaultImg, handleEvent }) {
  return (
    <Div
      pos="relative"
      bgImg={img || defaultImg}
      bgSize="cover"
      bgPos="center"
      d="flex"
      align="center"
      m={{ b: "0.5rem" }}
      h="15rem"
      w="15rem"
      border="1px solid"
      borderColor="info700"
      rounded="circle"
    >
      {img && <DeleteButton handleEvent={handleEvent} />}
    </Div>
  );
}

PreviewAvatar.propTypes = {
  img: PropTypes.string,
  defaultImg: PropTypes.string,
  handleEvent: PropTypes.func,
};
