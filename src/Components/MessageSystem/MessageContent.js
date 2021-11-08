import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Div, Button, Input, Icon } from "atomize";
import LoadingPage from "./LoadingPage";

const Header = ({ role, roleInfo, isUserBanned }) => {
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
      {isUserBanned && (
        <>
          <Div w="3rem" h="3rem" d="flex" align="center" justify="center">
            <Icon name="RemoveSolid" size="20px" />
          </Div>
          <Div textSize="subheader">未知的使用者</Div>
        </>
      )}
      {!isUserBanned && role === "user" && roleInfo && (
        <>
          <Link to={`/store/${roleInfo && roleInfo.id}`}>
            <Div
              w="3rem"
              h="3rem"
              rounded="circle"
              bgImg={(roleInfo && roleInfo.avatarUrl) || "defaultAvatar.png"}
              bgSize="cover"
              bgPos="center"
              m={{ r: "1.5rem" }}
            />
          </Link>
          <Link
            to={`/store/${roleInfo && roleInfo.id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Div textSize="subheader">{roleInfo && roleInfo.vendorName}</Div>
            <Div textSize="subheader" textColor="black800">
              @{roleInfo && roleInfo.User.username}
            </Div>
          </Link>
        </>
      )}
      {!isUserBanned && role === "vendor" && (
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
              <Div textSize="subheader">{roleInfo && roleInfo.nickname}</Div>
              <Div textSize="subheader" textColor="black800">
                @{roleInfo && roleInfo.username}
              </Div>
            </Div>
          )}
        </>
      )}
    </Div>
  );
};

Header.propTypes = {
  role: PropTypes.string,
  roleInfo: PropTypes.object,
  isUserBanned: PropTypes.bool,
};

const ContentCard = ({ role, content }) => {
  const currentRole = useSelector((store) => store.messages.role);
  const [me, setMe] = useState("client");
  useEffect(() => {
    if (currentRole) setMe(currentRole === "user" ? "client" : "vendor");
  }, [currentRole]);
  return (
    <Div
      w="100%"
      p="0.5rem 1rem"
      d="flex"
      flexDir="column"
      align={role === me ? "flex-end" : "flex-start"}
    >
      <Div
        w="auto"
        maxW="18rem"
        rounded="xl"
        bg={role === me ? "success700" : "white"}
        textColor={role === me ? "white" : "black"}
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

const AddMessage = ({
  role,
  handleSendMessage,
  input,
  setInput,
  isUserDisabled,
  isVendorDisabled,
  isUserBanned,
}) => {
  const [isInputDisabled, setIsInputDisable] = useState(false);

  useEffect(() => {
    if (role === "user") {
      setIsInputDisable(isUserDisabled || isUserBanned);
    }
    if (role === "vendor") {
      setIsInputDisable(isVendorDisabled || isUserBanned);
    }
  }, [role, isUserDisabled, isVendorDisabled, isUserBanned]);
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
          if (e.key === "Enter" && !isInputDisabled) handleSendMessage();
        }}
        disabled={isInputDisabled}
        cursor={isInputDisabled && "not-allowed"}
        bg={isInputDisabled && "gray300"}
        suffix={
          <Button
            pos="absolute"
            top="0"
            right="0"
            bg="transparent"
            textColor={
              isUserDisabled || (role === "vendor" && isVendorDisabled)
                ? "gray800"
                : "info800"
            }
            rounded={{ r: "md" }}
            onClick={() => !isInputDisabled && handleSendMessage()}
            cursor={isInputDisabled ? "not-allowed" : "pointer"}
          >
            傳送
          </Button>
        }
      />
    </Div>
  );
};

AddMessage.propTypes = {
  role: PropTypes.string,
  setInput: PropTypes.func,
  input: PropTypes.string,
  handleSendMessage: PropTypes.func,
  isUserDisabled: PropTypes.bool,
  isVendorDisabled: PropTypes.bool,
  isUserBanned: PropTypes.bool,
};

const MessageContent = ({
  role,
  roleInfo,
  messages,
  handleSendMessage,
  input,
  setInput,
  isLoading,
  isUserDisabled,
  isVendorDisabled,
}) => {
  const [isUserBanned, setIsUserBanned] = useState(false);

  useEffect(() => {
    if (roleInfo) {
      if (role === "user") {
        setIsUserBanned(
          roleInfo.isSuspended || roleInfo.User.role === "suspended"
        );
      }
      if (role === "vendor") {
        setIsUserBanned(roleInfo.role === "suspended");
      }
    }
  }, [roleInfo, role]);
  return (
    <Div
      w={{
        xs: "100%",
        sm: "calc(100% - 11rem - 4px)",
        lg: "calc(100% - 16rem - 4px)",
      }}
      m={{ t: { xs: "1rem", sm: "0" } }}
      border="2px groove"
      borderColor="gray500"
      rounded="md"
      shadow="4"
      pos="relative"
      bg="info100"
    >
      {isLoading && <LoadingPage />}
      <Header role={role} roleInfo={roleInfo} isUserBanned={isUserBanned} />
      <ContentMain messages={messages} />
      <AddMessage
        role={role}
        handleSendMessage={handleSendMessage}
        input={input}
        setInput={setInput}
        isUserDisabled={isUserDisabled}
        isVendorDisabled={isVendorDisabled}
        isUserBanned={isUserBanned}
      />
    </Div>
  );
};

MessageContent.propTypes = {
  role: PropTypes.string,
  messages: PropTypes.array,
  input: PropTypes.string,
  roleInfo: PropTypes.object,
  handleSendMessage: PropTypes.func,
  setInput: PropTypes.func,
  isLoading: PropTypes.bool,
  isUserDisabled: PropTypes.bool,
  isVendorDisabled: PropTypes.bool,
};

export default MessageContent;
