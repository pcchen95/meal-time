import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Div } from "atomize";
import { getAllProfiles } from "../../redux/reducers/adminReducer";
import {
  getAdminMessages,
  cleanMessages,
  getAdminMessagesById,
  cleanMessagesById,
  sendMessageToUser,
  setSelectedId,
  cleanRoleInfo,
  setIsLoadingPage,
} from "../../redux/reducers/messageReducer";
import AdminUserList from "../../Components/MessageSystem/AdminUserList";
import AdminMessageList from "../../Components/MessageSystem/AdminMessageList";
import AdminMessageContent from "../../Components/MessageSystem/AdminMessageContent";

const AdminMessagePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [input, setInput] = useState("");
  const user = useSelector((store) => store.users.user);
  const messages = useSelector((store) => store.messages.messages);
  const messagesById = useSelector((store) => store.messages.messagesById);
  const id = useSelector((store) => store.messages.id);
  const roleInfo = useSelector((store) => store.messages.roleInfo);
  const isLoading = useSelector((store) => store.messages.isLoading);

  const handleSendMessage = () => {
    if (!input) return;
    dispatch(sendMessageToUser(id, input)).then(() => {
      dispatch(getAdminMessages());
    });
    setInput("");
  };

  const handleChange = (id) => {
    dispatch(setSelectedId(id));
    dispatch(cleanMessagesById());
    dispatch(cleanRoleInfo());
  };

  const clearData = () => {
    dispatch(cleanMessages());
    dispatch(cleanMessagesById());
    dispatch(cleanRoleInfo());
    dispatch(setSelectedId(null));
  };

  useEffect(() => {
    return () => {
      clearData();
    };
  }, []);

  useEffect(() => {
    if (user && (user === "non-login" || user.role !== "admin")) {
      history.push("/");
    }
    if (user && user.role === "admin") {
      dispatch(getAdminMessages());
      dispatch(getAllProfiles({ sort: "username", order: "ASC" }));
    }
  }, [user]);

  useEffect(() => {
    if (id) {
      dispatch(getAdminMessagesById(id));
    }
  }, [id]);

  useEffect(() => {
    if (!id && messages && messages.length > 0) {
      dispatch(setSelectedId(messages[0].userId));
    }
  }, [id, messages]);

  useEffect(() => {
    if (roleInfo) {
      dispatch(setIsLoadingPage(false));
    }
  }, [roleInfo]);

  return (
    <Div
      w={{ xs: "100%", lg: "80%" }}
      maxW="900px"
      m="0 auto"
      p="2rem 1rem 5rem 1rem"
      textAlign="center"
    >
      <Div d="flex" justify="space-between" align="center">
        <Div tag="h2">管理員訊息</Div>
      </Div>

      <Div d="flex" w="100%" flexDir={{ xs: "column", sm: "row" }}>
        <Div
          d="flex"
          flexDir={{ xs: "column", lg: "row-reverse" }}
          align={{ xs: "flex-start", lg: "center" }}
        >
          <AdminMessageList
            messages={messages}
            selectedId={id}
            handleChange={handleChange}
          />
          <AdminUserList selectedId={id} handleChange={handleChange} />
        </Div>
        <AdminMessageContent
          roleInfo={roleInfo}
          messages={messagesById}
          handleSendMessage={handleSendMessage}
          input={input}
          setInput={setInput}
          isLoading={isLoading}
        />
      </Div>
    </Div>
  );
};

export default AdminMessagePage;
