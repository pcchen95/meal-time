import React from "react";
import { useState, useEffect, createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateProfile } from "../../redux/reducers/userReducer";
import {
  setErrorMessage,
  setShowWarningNotification,
} from "../../redux/reducers/notificationReducer";
import { Div } from "atomize";
import UploadButton from "../../Components/UserSystem/UploadButton";
import PreviewAvatar from "../../Components/UserSystem/PreviewAvatar";
import InputField from "../../Components/UserSystem/InputField";
import ButtonGroup from "../../Components/UserSystem/ButtonGroup";
import SuccessNotification from "../../Components/Notifications/SuccessNotification";
import WarningNotification from "../../Components/Notifications/WarningNotification";
import LoadingPage from "../LoadingPage/LoadingPage";
import { remindText, inputRule } from "../../constants/inputText";

const MemberEdit = () => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [img, setImg] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const [isDeleteAvatar, setIsDeleteAvatar] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const fileInput = createRef();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((store) => store.users.user);
  const isLoading = useSelector((store) => store.users.isLoading);

  const handleSubmit = () => {
    if (!nickname || !email || !phone) {
      dispatch(setErrorMessage("請填入所有必填欄位"));
      dispatch(setShowWarningNotification(true));
      return;
    }

    if (!fileInfo || fileInfo.size <= 1048576) {
      dispatch(setErrorMessage(null));
      dispatch(
        updateProfile({
          avatar: fileInfo,
          nickname,
          email,
          phone,
          isDeleteAvatar,
        })
      );
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
        setImg(e.target.result);
        dispatch(setErrorMessage(null));
        setIsEdited(true);
      };
      reader.readAsDataURL(file);
    } else {
      setImg(null);
      dispatch(setErrorMessage(null));
    }
  };

  useEffect(() => {
    if (user === "non-login") {
      return history.push("/");
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
    return () => {
      setImg(null);
      dispatch(setErrorMessage(null));
    };
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setNickname(user.nickname);
      setEmail(user.email);
      setPhone(user.phone);
      setImg(user.avatarURL);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      nickname !== user.nickname || email !== user.email || phone !== user.phone
        ? setIsEdited(true)
        : setIsEdited(false);
    }
  }, [user, nickname, email, phone]);

  return (
    <>
      {isLoading && <LoadingPage />}
      {user && user !== "non-login" && (
        <Div
          w={{ xs: "100%", md: "70%" }}
          maxW={{ md: "37rem" }}
          m="0 auto"
          p={{ xs: "1.5rem", md: "0" }}
          d="flex"
          flexDir="column"
          align="center"
          justify="center"
        >
          <Div w="100%" tag="h2" m={{ b: "1.5rem" }}>
            基本資料
          </Div>
          <form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <Div
              d="flex"
              flexDir="column"
              align="center"
              justify="center"
              w="100%"
            >
              <Div textSize="subheader" textAlign="left" w="100%">
                個人頭像
              </Div>
              <Div
                d="flex"
                align="center"
                justify="center"
                flexDir={{ xs: "column", md: "row" }}
              >
                <PreviewAvatar
                  img={img}
                  defaultImg={"defaultAvatar.png"}
                  handleEvent={() => {
                    setFileInfo(null);
                    setImg(null);
                    if (user.avatarURL) {
                      setIsDeleteAvatar(true);
                      setIsEdited(true);
                    }
                    if (!user.avatarURL) {
                      setIsEdited(false);
                    }
                  }}
                />
                <UploadButton fileInput={fileInput} handleEvent={handleImg} />
              </Div>
            </Div>
            <Div w="100%" h="auto">
              <InputField
                name={"暱稱"}
                type="text"
                value={nickname}
                handleEvent={(e) => setNickname(e.target.value)}
                remind={remindText.nickname}
                rule={inputRule.nickname}
                required={true}
              />
              <InputField
                name={"電子信箱"}
                type="email"
                value={email}
                handleEvent={(e) => setEmail(e.target.value)}
                remind={remindText.email}
                rule={inputRule.email}
                required={true}
              />
              <InputField
                name={"手機號碼"}
                type="tel"
                value={phone}
                handleEvent={(e) => setPhone(e.target.value)}
                remind={remindText.phone}
                rule={inputRule.phone}
                required={true}
              />
            </Div>
            <ButtonGroup
              handleEvent={() => history.push("/")}
              isLoading={isLoading}
              isDisabled={!isEdited || isLoading}
              nextPath="/member_password"
            />
          </form>
          <SuccessNotification />
          <WarningNotification />
        </Div>
      )}
    </>
  );
};

export default MemberEdit;
