import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../redux/reducers/userReducer";
import {
  setErrorMessage,
  setShowWarningNotification,
} from "../../redux/reducers/notificationReducer";
import { Row, Col, Div } from "atomize";
import InputField from "../../Components/UserSystem/InputField";
import SignUpButtons from "../../Components/UserSystem/SignUpButtons";
import SuccessNotification from "../../Components/Notifications/SuccessNotification";
import WarningNotification from "../../Components/Notifications/WarningNotification";

const SignInInfo = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector((store) => store.users.isLoading);

  const handleSubmit = () => {
    if (!username || !password) {
      dispatch(setErrorMessage("請填入帳號及密碼"));
      dispatch(setShowWarningNotification(true));
      return;
    }
    dispatch(setErrorMessage(null));
    dispatch(login(username, password)).then((user) => {
      if (user && user.id) {
        history.push("/");
      }
    });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
    return () => {
      dispatch(setErrorMessage(null));
    };
  }, [dispatch]);

  return (
    <Div w="100%">
      <form style={{ width: "100%" }} onSubmit={handleSubmit}>
        <InputField
          name="帳號"
          type="text"
          value={username}
          handleEvent={(e) => setUsername(e.target.value)}
          placeholder="請輸入帳號"
          required={true}
        />
        <InputField
          name="密碼"
          type="password"
          value={password}
          handleEvent={(e) => setPassword(e.target.value)}
          placeholder="請輸入密碼"
          required={true}
        />
        <SignUpButtons
          handleEvent={() => history.goBack()}
          isLoading={isLoading}
        />
      </form>
    </Div>
  );
};

const SignIn = () => {
  return (
    <Div>
      <Row w={{ xs: "100%", md: "70%" }} h="30rem" m="3rem auto" p="1rem">
        <Col size={{ xs: "8", md: "6" }} d="flex" align="center" p="0">
          <SignInInfo></SignInInfo>
        </Col>
        <Col size={{ xs: "4", md: "6" }} p="0">
          <Div
            bgImg="https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1464&q=80"
            bgSize="cover"
            bgPos="left"
            rounded="xl"
            h="100%"
            w="100%"
          />
        </Col>
      </Row>
      <SuccessNotification />
      <WarningNotification />
    </Div>
  );
};

export default SignIn;
