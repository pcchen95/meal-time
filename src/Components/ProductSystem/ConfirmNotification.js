import React from "react";
import PropTypes from "prop-types";
import { Div, Notification, Button, Icon } from "atomize";

const YesButton = ({ handleEvent }) => {
  return (
    <Button
      prefix={
        <Icon name="Checked" size="16px" color="white" m={{ r: "0.5rem" }} />
      }
      h="2rem"
      p={{ x: "0.75rem" }}
      textSize="caption"
      textColor="white"
      bg="danger700"
      border="1px solid"
      borderColor="danger700"
      m={{ r: "0.5rem" }}
      onClick={handleEvent}
    >
      確定
    </Button>
  );
};

YesButton.propTypes = {
  handleEvent: PropTypes.func,
};

const NoButton = ({ handleEvent }) => {
  return (
    <Button
      prefix={
        <Icon name="Cross" size="16px" color="white" m={{ r: "0.5rem" }} />
      }
      h="2rem"
      p={{ x: "0.75rem" }}
      textSize="caption"
      textColor="white"
      bg="gray700"
      border="1px solid"
      borderColor="gray700"
      m={{ r: "0.5rem" }}
      onClick={handleEvent}
    >
      取消
    </Button>
  );
};

NoButton.propTypes = {
  handleEvent: PropTypes.func,
};

const ConfirmNotification = ({
  showConfirm,
  handleDelete,
  handleCancelDelete,
}) => {
  return (
    <Div pos="fixed" top="50%" right="50%" transform="translateX(50%)">
      <Notification
        isOpen={showConfirm}
        bg="white"
        textColor="info900"
        pos="static"
        top="0"
        right="0"
        w="18rem"
        textAlign="center"
        border="2px solid"
        borderColor="info600"
      >
        <Div d="flex" flexDir="column" justify="center" align="center">
          <Div textSize="18px" m={{ t: "1rem" }}>
            確定要刪除嗎？
          </Div>
          <Div d="flex" m={{ t: "2rem" }}>
            <YesButton handleEvent={handleDelete} />
            <NoButton handleEvent={handleCancelDelete} />
          </Div>
        </Div>
      </Notification>
    </Div>
  );
};

ConfirmNotification.propTypes = {
  showConfirm: PropTypes.bool,
  handleDelete: PropTypes.func,
  handleCancelDelete: PropTypes.func,
};

export default ConfirmNotification;
