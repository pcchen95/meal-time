import React from "react";
import { useState, useEffect, createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { register } from "../../redux/reducers/userReducer";
import {
  setErrorMessage,
  setShowWarningNotification,
} from "../../redux/reducers/notificationReducer";
import { Div, Text } from "atomize";
import { remindText, inputRule } from "../../constants/inputText";
import PreviewAvatar from "../../Components/UserSystem/PreviewAvatar";
import InputField from "../../Components/UserSystem/InputField";
import UploadAvatar from "../../Components/UserSystem/UploadAvatar";
import SignUpButtons from "../../Components/UserSystem/SignUpButtons";
import SuccessNotification from "../../Components/Notifications/SuccessNotification";
import WarningNotification from "../../Components/Notifications/WarningNotification";

const SignUpInfo = () => {
  const [nickname, setNickname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fileInfo, setFileInfo] = useState(null);
  const [img, setImg] = useState(null);
  const fileInput = createRef();
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector((store) => store.users.isLoading);
  const user = useSelector((store) => store.users.user);

  const handleSubmit = () => {
    if (
      !nickname ||
      !username ||
      !password ||
      !confirmPassword ||
      !email ||
      !phone
    ) {
      dispatch(setErrorMessage("請填入所有必填欄位"));
      dispatch(setShowWarningNotification(true));
      return;
    }

    if (password !== confirmPassword) {
      dispatch(setErrorMessage("兩次輸入密碼不同"));
      dispatch(setShowWarningNotification(true));
      return;
    }

    if (!fileInfo || fileInfo.size <= 1048576) {
      dispatch(setErrorMessage(null));
      dispatch(
        register({
          avatar: fileInfo,
          nickname,
          username,
          password,
          email,
          phone,
        })
      ).then((user) => {
        if (user && user.id) {
          history.push("/");
        }
      });
    }
  };

  const handleImg = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1048576) {
        dispatch(setErrorMessage("檔案過大"));
        dispatch(setShowWarningNotification(true));
        return;
      }
      setFileInfo(file);
      reader.onload = function (e) {
        dispatch(setErrorMessage(null));
        setImg(e.target.result);
      };
      reader.onloadend = function () {
        fileInput.current.value = "";
      };
      reader.readAsDataURL(file);
    } else {
      setImg(null);
      dispatch(setErrorMessage(null));
    }
  };

  useEffect(() => {
    if (user && user.id) {
      return history.push("/");
    }
  }, []);

  useEffect(() => {
    return () => {
      setImg(null);
      dispatch(setErrorMessage(null));
    };
  }, [dispatch]);

  return (
    <Div w="100%" p="3rem 1rem">
      <Text textSize="heading" textColor="gray900" m={{ b: "3rem" }}>
        註冊 Sign Up
      </Text>
      <form w="100%" onSubmit={handleSubmit}>
        <Div d="flex" w="100%">
          <PreviewAvatar
            img={img}
            defaultImg={"defaultAvatar.png"}
            handleEvent={() => {
              setFileInfo(null);
              setImg(null);
            }}
          />
        </Div>
        <Div>
          <div className="mb-3">
            <UploadAvatar
              name="個人頭像"
              avatarInput={fileInput}
              handleAvatar={handleImg}
            />
          </div>
          <InputField
            name="帳號"
            type="text"
            value={username}
            handleEvent={(e) => setUsername(e.target.value)}
            remind={remindText.username}
            placeholder="請輸入帳號"
            rule={inputRule.username}
            required={true}
          />
          <InputField
            name="暱稱"
            type="text"
            value={nickname}
            handleEvent={(e) => setNickname(e.target.value)}
            remind={remindText.nickname}
            placeholder="請輸入暱稱"
            rule={inputRule.nickname}
            required={true}
          />
          <InputField
            name="電子信箱"
            type="email"
            value={email}
            handleEvent={(e) => setEmail(e.target.value)}
            remind={remindText.email}
            placeholder="請輸入電子信箱"
            rule={inputRule.email}
            required={true}
          />
          <InputField
            name="手機號碼"
            type="tel"
            value={phone}
            handleEvent={(e) => setPhone(e.target.value)}
            remind={remindText.phone}
            placeholder="請輸入手機號碼"
            rule={inputRule.phone}
            required={true}
          />
          <InputField
            name="密碼"
            type="password"
            value={password}
            handleEvent={(e) => setPassword(e.target.value)}
            remind={remindText.password}
            placeholder="請輸入密碼"
            rule={inputRule.password}
            required={true}
          />
          <InputField
            name="再次輸入密碼"
            type="password"
            value={confirmPassword}
            handleEvent={(e) => setConfirmPassword(e.target.value)}
            remind={remindText.password}
            placeholder="請再次輸入密碼"
            rule={inputRule.password}
            required={true}
          />
          <SignUpButtons
            handleEvent={() => history.goBack()}
            isLoading={isLoading}
          />
        </Div>
      </form>
    </Div>
  );
};

const SignUp = () => {
  return (
    <Div w="100%">
      <Div
        d="flex"
        flexDir={{ xs: "column", sm: "row" }}
        minH="30rem"
        m="3rem auto"
        p="1rem"
        w={{ xs: "100%", md: "80%" }}
        maxW={{ md: "1200px" }}
        h="auto"
      >
        <Div
          w={{ xs: "100%", md: "30%" }}
          bgImg="https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1464&q=80"
          bgSize="cover"
          bgPos="left"
          rounded="xl"
          h={{ xs: "10rem", sm: "100%" }}
        />
        <Div w={{ xs: "100%", md: "70%" }} m={{ l: { sm: "1.5rem" } }}>
          <SignUpInfo></SignUpInfo>
        </Div>
      </Div>
      <SuccessNotification />
      <WarningNotification />
    </Div>
  );
};

export default SignUp;
