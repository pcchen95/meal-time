import React from "react";
import PropTypes from "prop-types";
import { Div, Label, Input, Icon } from "atomize";

export default function UploadButton({ type, fileInput, handleEvent }) {
  return (
    <Div
      m={{ y: "0.5rem" }}
      d="flex"
      align={{ xs: "flex-start", md: "center" }}
      justify="flex-start"
      flexDir={{ xs: "column", md: "row" }}
    >
      <Label>
        <Input
          type="file"
          accept=".png,.jpg,.jpeg"
          ref={fileInput}
          onChange={handleEvent}
          style={{ display: "none" }}
        />
        <Div
          bg="info700"
          shadow="1"
          hoverShadow="3"
          p={{ x: "1rem" }}
          h="2.5rem"
          textSize="body"
          textWeight="500"
          textColor="white"
          fontFamily="primary"
          rounded="md"
          d="flex"
          align="center"
          justify="center"
          transition
        >
          上傳檔案
          <Icon
            name="CameraSolid"
            size="16px"
            color="white"
            m={{ l: "1rem" }}
          />
        </Div>
      </Label>
      {type !== "avatar" && (
        <Div
          textSize="14px"
          textColor="gray700"
          m={{ l: { xs: "0", md: "1rem" }, t: { xs: "0.5rem", md: "0" } }}
        >
          {"僅限上傳 .PNG .JPG .JPEG 格式檔案，尺寸 < 1 MB"}
        </Div>
      )}
    </Div>
  );
}

UploadButton.propTypes = {
  type: PropTypes.string,
  fileInput: PropTypes.string,
  handleEvent: PropTypes.func,
};
