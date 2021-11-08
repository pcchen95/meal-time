import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Div, Icon } from "atomize";

const SystemMessageCard = ({ selectedId, content, handleChange }) => {
  const latestSender = Object.keys(content[content.length - 1])[0];
  const lastIndex = Object.values(content[content.length - 1])[0].length - 1;
  const latestMessage = Object.values(content[content.length - 1])[0][
    lastIndex
  ];

  return (
    <Div
      p="1rem 0.5rem"
      w="100%"
      border={{ b: "1px dotted" }}
      borderColor="gray700"
      textAlign="left"
      cursor="pointer"
      d="flex"
      align="center"
      onClick={() => handleChange("admin")}
      bg={selectedId === "admin" ? "success400" : "success300"}
      hoverBg="success400"
      rounded="md"
    >
      <Div w="3rem" h="3rem" d="flex" align="center" justify="center">
        <Icon name="NotificationSolid" size="20px" color="success900" />
      </Div>
      <Div w="calc(100% - 3.5rem)">
        <Div w="100%" textColor="black" d="flex">
          系統訊息
        </Div>
        <Div
          w="100%"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          textColor="info900"
        >
          {`${latestSender === "client" ? "我：" : ""}${latestMessage}`}
        </Div>
      </Div>
    </Div>
  );
};

SystemMessageCard.propTypes = {
  selectedId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  content: PropTypes.array,
  handleChange: PropTypes.func,
};

const UserCard = ({ id, info, selectedId, content, handleChange }) => {
  const [isVendorDisabled, setIsVendorDisabled] = useState(false);
  const [isUserDisabled, setIsUserDisabled] = useState(false);
  const latestSender = Object.keys(content[content.length - 1])[0];
  const lastIndex = Object.values(content[content.length - 1])[0].length - 1;
  const latestMessage = Object.values(content[content.length - 1])[0][
    lastIndex
  ];
  const role = useSelector((store) => store.messages.role);

  useEffect(() => {
    if (role === "user") {
      setIsVendorDisabled(info.isSuspended || info.User.role === "suspended");
    }
    if (role === "vendor") {
      setIsUserDisabled(info.role === "suspended");
    }
  }, [role]);
  return (
    <Div
      p="1rem 0.5rem"
      w="100%"
      border={{ b: "1px dotted" }}
      borderColor="gray700"
      textAlign="left"
      cursor="pointer"
      d="flex"
      align="center"
      onClick={() => handleChange(id)}
      bg={id === selectedId && "gray300"}
      hoverBg="gray200"
    >
      {role === "user" && !isVendorDisabled && (
        <Div
          w="3rem"
          h="3rem"
          rounded="circle"
          bgImg={info.avatarUrl || "defaultAvatar.png"}
          bgSize="cover"
          bgPos="center"
          m={{ r: "0.5rem" }}
        />
      )}

      {role === "vendor" && !isUserDisabled && (
        <Div
          w="3rem"
          h="3rem"
          rounded="circle"
          bgImg={info.avatarURL || "defaultAvatar.png"}
          bgSize="cover"
          bgPos="center"
          m={{ r: "0.5rem" }}
        />
      )}
      {((role === "user" && isVendorDisabled) ||
        (role === "vendor" && isUserDisabled)) && (
        <Div w="3rem" h="3rem" d="flex" align="center" justify="center">
          <Icon name="RemoveSolid" size="20px" />
        </Div>
      )}
      <Div w="calc(100% - 3.5rem)">
        <Div
          w="100%"
          textColor="black"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {role === "user" && !isVendorDisabled && info.vendorName}

          {role === "vendor" && !isUserDisabled && (
            <Div>
              <Div>{info.nickname}</Div>
              <Div textSize="body">(@{info.username})</Div>
            </Div>
          )}
          {((role === "user" && isVendorDisabled) ||
            (role === "vendor" && isUserDisabled)) && <Div> 未知的使用者</Div>}
        </Div>
        <Div
          w="100%"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          textColor="info900"
        >
          {role === "user" &&
            `${latestSender === "client" ? "我：" : ""}${latestMessage}`}
          {role === "vendor" &&
            `${latestSender === "vendor" ? "我：" : ""}${latestMessage}`}
        </Div>
      </Div>
    </Div>
  );
};

UserCard.propTypes = {
  id: PropTypes.number,
  info: PropTypes.object,
  selectedId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  content: PropTypes.array,
  handleChange: PropTypes.func,
};

const MessageList = ({ messages, selectedId, handleChange }) => {
  const systemMessages = useSelector((store) => store.messages.systemMessages);
  const role = useSelector((store) => store.messages.role);
  return (
    <Div
      w={{ xs: "100%", sm: "10rem", md: "15rem" }}
      h={{ xs: "8rem", sm: "calc(30rem + 4px)" }}
      border="2px solid"
      borderColor="gray500"
      m={{ r: "1rem" }}
      overflow="scroll"
      rounded="md"
      shadow="4"
    >
      {role === "user" && systemMessages && (
        <SystemMessageCard
          selectedId={selectedId}
          content={systemMessages}
          handleChange={handleChange}
        />
      )}
      {messages &&
        role === "user" &&
        messages.map((message, index) => (
          <UserCard
            key={index}
            info={message.Vendor}
            id={message.vendorId}
            selectedId={selectedId}
            vendorName={message.Vendor.vendorName}
            avatarUrl={message.Vendor.avatarUrl}
            content={JSON.parse(message.content)}
            handleChange={handleChange}
          />
        ))}
      {messages &&
        messages.length > 0 &&
        role === "vendor" &&
        messages.map((message, index) => (
          <UserCard
            key={index}
            info={message.User}
            id={message.clientId}
            selectedId={selectedId}
            nickname={message.User.nickname}
            username={message.User.username}
            avatarURL={message.User.avatarURL}
            content={JSON.parse(message.content)}
            handleChange={handleChange}
          />
        ))}
      {messages && messages.length === 0 && (
        <Div m={{ t: "1rem" }} textSize="title">
          目前尚無訊息
        </Div>
      )}
    </Div>
  );
};

MessageList.propTypes = {
  messages: PropTypes.array,
  selectedId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  handleChange: PropTypes.func,
};

export default MessageList;
