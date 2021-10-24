import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Div } from "atomize";
import UploadButton from "../../Components/VendorSystem/UploadButton";

const InputField = ({ name, avatarInput, handleAvatar }) => {
  const isVendor = useSelector(
    (store) => store.vendors.vendor && store.vendors.vendor !== "not-vendor"
  );
  const isOpen = useSelector(
    (store) => store.vendors.vendor && store.vendors.vendor.isOpen
  );
  const isSuspended = useSelector(
    (store) => store.vendors.vendor && store.vendors.vendor.isSuspended
  );
  const isDisabled = isVendor && (!isOpen || isSuspended);
  return (
    <Div>
      <Div d="flex" flexDir="row" justify="flex-start" align="center" w="100%">
        <Div d="flex" align="center" w="5.5rem">
          {name}
        </Div>
        <Div w="calc(100% - 5.5rem)">
          {!isDisabled && (
            <UploadButton
              type="avatar"
              fileInput={avatarInput}
              handleEvent={handleAvatar}
            />
          )}
        </Div>
      </Div>
      <Div textSize="14px" textColor="gray700">
        {"僅限上傳 .PNG .JPG .JPEG 格式檔案，尺寸 < 1 MB"}
      </Div>
    </Div>
  );
};

InputField.propTypes = {
  name: PropTypes.string,
  avatarInput: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  handleAvatar: PropTypes.func,
};

export default InputField;
