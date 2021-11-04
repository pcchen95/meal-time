import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Div, Button, Input } from "atomize";
import LoadingPage from "./LoadingPage";

const Header = ({ roleInfo }) => {
  return (
    <Div
      w="100%"
      bg="white"
      p="1rem 1rem"
      border={{ b: "1px solid" }}
      borderColor="gray500"
      textAlign="left"
      d="flex"
      align="center"
      h="5rem"
    >
      <>
        <Div
          w="3rem"
          h="3rem"
          rounded="circle"
          bgImg={(roleInfo && roleInfo.avatarURL) || "defaultAvatar.png"}
          bgSize="cover"
          bgPos="center"
          m={{ r: "1.5rem" }}
        />
        {roleInfo && (
          <Div>
            <Div textSize="subheader">
              {roleInfo && roleInfo.nickname}{" "}
              {roleInfo.role === "suspended" && "(已被停權)"}
            </Div>
            <Div textSize="subheader" textColor="black800">
              @{roleInfo && roleInfo.username}{" "}
            </Div>
          </Div>
        )}
      </>
    </Div>
  );
};

Header.propTypes = {
  roleInfo: PropTypes.object,
};

const ContentCard = ({ role, content }) => {
  return (
    <Div
      w="100%"
      p="0.5rem 1rem"
      d="flex"
      flexDir="column"
      align={role === "admin" ? "flex-end" : "flex-start"}
    >
      <Div
        w="auto"
        maxW="18rem"
        rounded="xl"
        bg={role === "admin" ? "success700" : "white"}
        textColor={role === "admin" ? "white" : "black"}
        p="0.5rem 1rem"
        textAlign="left"
        style={{ wordBreak: "break-word" }}
      >
        {content}
      </Div>
    </Div>
  );
};

ContentCard.propTypes = {
  role: PropTypes.string,
  content: PropTypes.string,
};

const AlwaysScrollToBottom = ({ messages }) => {
  const messagesEndRef = useRef();
  useEffect(() => messagesEndRef.current.scrollIntoView(), [messages]);
  return <div ref={messagesEndRef} />;
};

AlwaysScrollToBottom.propTypes = {
  messages: PropTypes.array,
};

const ContentMain = ({ messages }) => {
  return (
    <Div h="25rem" w="100%" bg="gray200" overflow="scroll" p={{ b: "3rem" }}>
      {messages &&
        messages.length > 0 &&
        messages.map((message) => {
          const role = Object.keys(message)[0];
          const contents = Object.values(message)[0];
          return contents.map((content, index) => {
            return <ContentCard key={index} role={role} content={content} />;
          });
        })}
      <AlwaysScrollToBottom messages={messages} />
    </Div>
  );
};

ContentMain.propTypes = {
  messages: PropTypes.array,
};

const AddMessage = ({ handleSendMessage, input, setInput }) => {
  return (
    <Div
      pos="absolute"
      left="0.5rem"
      right="0.5rem"
      bottom="0.3rem"
      h="auto"
      rounded="circle"
    >
      <Input
        type="text"
        rounded="circle"
        p={{ x: "1.5rem" }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") handleSendMessage();
        }}
        suffix={
          <Button
            pos="absolute"
            top="0"
            right="0"
            bg="transparent"
            textColor="info800"
            rounded={{ r: "md" }}
            onClick={handleSendMessage}
            cursor="pointer"
          >
            傳送
          </Button>
        }
      />
    </Div>
  );
};

AddMessage.propTypes = {
  setInput: PropTypes.func,
  input: PropTypes.string,
  handleSendMessage: PropTypes.func,
};

const MessageContent = ({
  roleInfo,
  messages,
  handleSendMessage,
  input,
  setInput,
  isLoading,
}) => {
  return (
    <Div
      w={{ xs: "100%", sm: "calc(100% - 11rem)", lg: "calc(100% - 16rem)" }}
      m={{ t: { xs: "1rem", sm: "0" } }}
      border="2px groove"
      borderColor="gray500"
      rounded="md"
      shadow="4"
      pos="relative"
      bg="info100"
    >
      {isLoading && <LoadingPage />}
      <Header roleInfo={roleInfo} />
      <ContentMain messages={messages} />
      <AddMessage
        handleSendMessage={handleSendMessage}
        input={input}
        setInput={setInput}
      />
    </Div>
  );
};

MessageContent.propTypes = {
  messages: PropTypes.array,
  input: PropTypes.string,
  roleInfo: PropTypes.object,
  handleSendMessage: PropTypes.func,
  setInput: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default MessageContent;
