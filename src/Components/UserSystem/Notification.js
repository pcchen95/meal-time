import { Div, Notification, Icon } from "atomize";

const MyNotification = ({ showNotification, setShowNotification }) => {
  return (
    <Div pos="fixed" top="50%" right="50%" transform="translateX(50%)">
      <Notification
        isOpen={showNotification}
        onClose={() => setShowNotification(false)}
        bg="success300"
        textColor="success800"
        pos="static"
        top="0"
        right="0"
        w="12rem"
        textAlign="center"
        border="2px solid"
        borderColor="success800"
        prefix={
          <Icon
            name="Success"
            color="success800"
            size="18px"
            m={{ r: "0.5rem" }}
          />
        }
      >
        更新完成！
      </Notification>
    </Div>
  );
};

export default MyNotification;
