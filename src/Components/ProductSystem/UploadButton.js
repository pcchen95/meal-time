import React from "react";
import PropTypes from "prop-types";
import { Div, Label, Input, Icon } from "atomize";

export default function UploadButton({ fileInput, handleEvent }) {
  return (
    <Div
      m={{ l: { xs: "0", md: "1rem" } }}
      d="flex"
      align={{ xs: "center", md: "flex-start" }}
      justify="center"
      flexDir="column"
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
      <Div textSize="14px" textColor="gray700" m={{ t: "1rem" }}>
        {"僅限上傳 .PNG .JPG .JPEG 格式檔案，尺寸 < 1 MB"}
      </Div>
    </Div>
  );
}

UploadButton.propTypes = {
  fileInput: PropTypes.object,
  handleEvent: PropTypes.func,
};
