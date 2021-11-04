import React from "react";
import PropTypes from "prop-types";
import { Div } from "atomize";

const UserCard = ({ id, info, selectedId, content, handleChange }) => {
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
      onClick={() => handleChange(id)}
      bg={id === selectedId && "gray300"}
      hoverBg="gray200"
    >
      <Div
        w="3rem"
        h="3rem"
        rounded="circle"
        bgImg={info.avatarURL || "defaultAvatar.png"}
        bgSize="cover"
        bgPos="center"
        m={{ r: "0.5rem" }}
      />
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
          <Div>
            <Div>{info.nickname}</Div>
            <Div textSize="body">(@{info.username})</Div>
          </Div>
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
          {`${latestSender === "admin" ? "我：" : ""}${latestMessage}`}
        </Div>
      </Div>
    </Div>
  );
};

UserCard.propTypes = {
  id: PropTypes.number,
  info: PropTypes.object,
  selectedId: PropTypes.number,
  content: PropTypes.array,
  handleChange: PropTypes.func,
};

const MessageList = ({ messages, selectedId, handleChange }) => {
  return (
    <Div
      bg="gray700"
      w={{ xs: "100%", sm: "15rem", lg: "10rem" }}
      m={{ r: { xs: "0", sm: "1rem" }, b: { xs: "1rem", lg: "0" } }}
      rounded="md"
    >
      <Div textSize="body" textColor="white" h="1.5rem">
        訊息列表
      </Div>
      <Div
        h={{ xs: "8rem", sm: "calc(13.5rem + 2px)", lg: "calc(28.5rem + 4px)" }}
        border="2px groove"
        borderColor="gray500"
        overflow="scroll"
        rounded="md"
        shadow="4"
        bg="white"
      >
        {messages &&
          messages.length > 0 &&
          messages.map((message, index) => (
            <UserCard
              key={index}
              info={message.User}
              id={message.userId}
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
    </Div>
  );
};

MessageList.propTypes = {
  messages: PropTypes.array,
  selectedId: PropTypes.number,
  handleChange: PropTypes.func,
};

export default MessageList;
