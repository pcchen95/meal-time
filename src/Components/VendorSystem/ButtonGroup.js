import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Div, Button, Icon } from "atomize";

export function ButtonGroup({
  isDisabled: inputDisabled,
  handleBack,
  vendor,
  handleToggleOpen,
}) {
  const isVendor = useSelector((store) => store.vendors.vendor || false);
  const isOpen = useSelector(
    (store) => store.vendors.vendor && store.vendors.vendor.isOpen
  );
  const isSuspended = useSelector(
    (store) => store.vendors.vendor && store.vendors.vendor.isSuspended
  );
  const isDisabled = isVendor && (!isOpen || isSuspended || inputDisabled);
  return (
    <Div
      d="flex"
      flexDir="column"
      p="1rem"
      justify="center"
      w="100%"
      h="auto"
      pos="relative"
    >
      <Div d="flex" justify="center" w="100%">
        <Button
          h="3rem"
          w={{ xs: "50%", md: "auto" }}
          p={{ x: "1.25rem" }}
          textSize="body"
          textColor="info700"
          hoverTextColor={!isDisabled && "info900"}
          bg="white"
          hoverBg={!isDisabled && "info200"}
          border="1px solid"
          borderColor="info700"
          hoverBorderColor={!isDisabled && "info900"}
          disabled={isDisabled}
        >
          {vendor ? "提交修改" : "註冊"}
        </Button>
        <Button
          type="button"
          h="3rem"
          w={{ xs: "50%", md: "auto" }}
          p={{ x: "1.25rem" }}
          textSize="body"
          textColor="info700"
          hoverTextColor="info900"
          bg="white"
          hoverBg="info200"
          border="1px solid"
          borderColor="info700"
          hoverBorderColor="info900"
          m={{ l: "0.5rem" }}
          onClick={handleBack}
        >
          返回
        </Button>
      </Div>
      {isVendor && isOpen && !isSuspended && (
        <Button
          suffix={
            <Icon
              name="Close"
              size="16px"
              color="danger700"
              m={{ l: "1rem" }}
            />
          }
          pos={{ md: "absolute" }}
          m={{ t: { xs: "2rem", md: "0" } }}
          right={{ md: "1rem" }}
          top={{ md: "1rem" }}
          h="3rem"
          w={{ xs: "100%", md: "auto" }}
          border="1px solid"
          borderColor="danger700"
          bg="white"
          hoverBg="danger300"
          textColor="danger700"
          shadow="1"
          hoverShadow="2"
          onClick={handleToggleOpen}
        >
          關閉賣場
        </Button>
      )}
      {isVendor && !isSuspended && !isOpen && (
        <Button
          suffix={
            <Icon
              name="Checked"
              size="16px"
              color="success700"
              m={{ l: "1rem" }}
            />
          }
          type="button"
          pos={{ md: "absolute" }}
          m={{ t: { xs: "2rem", md: "0" } }}
          right={{ md: "1rem" }}
          top={{ md: "1rem" }}
          h="3rem"
          w={{ xs: "100%", md: "auto" }}
          border="1px solid"
          borderColor="success700"
          bg="white"
          hoverBg="success300"
          textColor="success700"
          shadow="1"
          hoverShadow="2"
          onClick={handleToggleOpen}
        >
          開啟賣場
        </Button>
      )}
    </Div>
  );
}

ButtonGroup.propTypes = {
  isDisabled: PropTypes.bool,
  handleBack: PropTypes.func,
  vendor: PropTypes.object,
  handleToggleOpen: PropTypes.func,
};

export default ButtonGroup;
