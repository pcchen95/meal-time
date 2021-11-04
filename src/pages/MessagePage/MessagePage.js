import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Div, Button, Icon } from "atomize";
import { getVendor } from "../../redux/reducers/vendorReducer";
import {
  setCurrentRole,
  getUserMessages,
  getUserMessagesById,
  sendMessageToVendor,
  getVendorMessages,
  cleanMessages,
  getVendorMessagesById,
  cleanMessagesById,
  sendMessageToClient,
  setSelectedId,
  cleanRoleInfo,
  setRole,
  getSystemMessages,
  sendMessageToAdmin,
} from "../../redux/reducers/messageReducer";
import MessageList from "../../Components/MessageSystem/MessageList";
import MessageContent from "../../Components/MessageSystem/MessageContent";
import SystemMessageContent from "../../Components/MessageSystem/SystemMessageContent";

const UserMessagePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [input, setInput] = useState("");
  const [isUserDisabled, setIsUserDisabled] = useState(false);
  const [isVendorDisabled, setIsVendorDisabled] = useState(false);
  const user = useSelector((store) => store.users.user);
  const vendor = useSelector((store) => store.vendors.vendor);
  const role = useSelector((store) => store.messages.role);
  const messages = useSelector((store) => store.messages.messages);
  const messagesById = useSelector((store) => store.messages.messagesById);
  const id = useSelector((store) => store.messages.id);
  const roleInfo = useSelector((store) => store.messages.roleInfo);
  const isLoading = useSelector((store) => store.messages.isLoading);

  const handleSendMessage = () => {
    if (!input) return;
    if (id === "admin") {
      dispatch(sendMessageToAdmin(input)).then(() => {
        dispatch(getSystemMessages());
      });
      setInput("");
      return;
    }
    if (role === "user") {
      dispatch(sendMessageToVendor(id, input)).then(() => {
        dispatch(getUserMessages());
      });
    }
    if (role === "vendor") {
      dispatch(sendMessageToClient(id, input)).then(() => {
        dispatch(getVendorMessages());
      });
    }
    setInput("");
  };

  const handleChange = (id) => {
    dispatch(setSelectedId(id));
  };

  const clearData = () => {
    dispatch(cleanMessages());
    dispatch(cleanMessagesById());
    dispatch(cleanRoleInfo());
    dispatch(setSelectedId(null));
  };

  useEffect(() => {
    if (user && user === "non-login") {
      history.push("/");
    }
    return () => {
      clearData();
      dispatch(setRole("user"));
    };
  }, []);

  useEffect(() => {
    if (user && user.role === "suspended") {
      return setIsUserDisabled(true);
    }
    dispatch(getSystemMessages());
    if (user && user.vendorId) {
      dispatch(getVendor());
    }
  }, [user]);

  useEffect(() => {
    if (vendor && vendor.isSuspended) {
      return setIsVendorDisabled(true);
    }
  }, [vendor]);

  useEffect(() => {
    if (role && role === "user") dispatch(getUserMessages());
    if (role && role === "vendor") dispatch(getVendorMessages());
  }, [role]);

  useEffect(() => {
    if (id) {
      if (id === "admin") return;
      if (role === "user") dispatch(getUserMessagesById(id));
      if (role === "vendor") dispatch(getVendorMessagesById(id));
    }
  }, [id]);

  useEffect(() => {
    if (!id && messages && messages.length > 0) {
      if (role === "user") dispatch(setSelectedId(messages[0].vendorId));
      if (role === "vendor") dispatch(setSelectedId(messages[0].clientId));
    }
  }, [id, messages]);

  return (
    <Div
      w={{ xs: "100%", lg: "70%" }}
      maxW="900px"
      m="0 auto"
      p="2rem 1rem 5rem 1rem"
      textAlign="center"
    >
      <Div d="flex" justify="space-between" align="center">
        <Div tag="h2">
          {role && role === "user" ? "使用者訊息" : "賣場訊息"}
        </Div>
        {user && user.vendorId && (
          <Button
            suffix={
              <Icon
                name="LongRight"
                size="16px"
                color="white"
                m={{ l: "1rem" }}
              />
            }
            shadow="3"
            bg="black200"
            hoverShadow="4"
            m={{ r: "1rem" }}
            onClick={() => {
              clearData();
              role === "user"
                ? dispatch(setCurrentRole("vendor"))
                : dispatch(setCurrentRole("user"));
            }}
          >
            {role === "user" ? "賣場訊息" : "使用者訊息"}
          </Button>
        )}
      </Div>
      {(isUserDisabled || (role === "vendor" && isVendorDisabled)) && (
        <Div tag="h4" textColor="danger800">
          您已被停權！
        </Div>
      )}
      <Div d="flex" w="100%" flexDir={{ xs: "column", sm: "row" }}>
        <MessageList
          messages={messages}
          selectedId={id}
          handleChange={handleChange}
        />
        {id === "admin" && (
          <SystemMessageContent
            handleSendMessage={handleSendMessage}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
          />
        )}
        {id !== "admin" && (
          <MessageContent
            role={role}
            roleInfo={roleInfo}
            messages={messagesById}
            handleSendMessage={handleSendMessage}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
            isUserDisabled={isUserDisabled}
            isVendorDisabled={isVendorDisabled}
          />
        )}
      </Div>
    </Div>
  );
};

export default UserMessagePage;
