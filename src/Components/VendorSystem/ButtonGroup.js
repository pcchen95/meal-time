import React from "react";
import PropTypes from "prop-types";
import { Div, Button, Icon } from "atomize";

export function ButtonGroup({
  isInputDisabled,
  isStoreOpen,
  isSuspended,
  handleBack,
  vendor,
  handleToggleOpen,
}) {
  const isDisabled = isInputDisabled || !isStoreOpen || isSuspended;
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
          {vendor && vendor !== "not-vendor" ? "提交修改" : "註冊"}
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
      {vendor && vendor !== "not-vendor" && !isSuspended && isStoreOpen && (
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
      {vendor && vendor !== "not-vendor" && !isSuspended && !isStoreOpen && (
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
  isInputDisabled: PropTypes.bool,
  isStoreOpen: PropTypes.bool,
  isSuspended: PropTypes.bool,
  handleBack: PropTypes.func,
  vendor: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  handleToggleOpen: PropTypes.func,
};

export default ButtonGroup;
