import React from "react";
import PropTypes from "prop-types";
import { Div } from "atomize";
import UploadButton from "../../Components/VendorSystem/UploadButton";

const InputField = ({ name, avatarInput, handleAvatar }) => {
  return (
    <>
      <Div d="flex" flexDir="row" justify="flex-start" align="center" w="100%">
        <Div
          w="7rem"
          textAlign={{ md: "justify" }}
          style={{ textAlignLast: "justify" }}
        >
          {name}
        </Div>
        <Div w="calc(100% - 7rem)" m={{ l: "1rem" }}>
          <UploadButton
            type="avatar"
            fileInput={avatarInput}
            handleEvent={handleAvatar}
          />
        </Div>
      </Div>
      <Div textSize="14px" textColor="gray700">
        {"僅限上傳 .PNG .JPG .JPEG 格式檔案，尺寸 < 1 MB"}
      </Div>
    </>
  );
};

InputField.propTypes = {
  name: PropTypes.string,
  avatarInput: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  handleAvatar: PropTypes.func,
};

export default InputField;
