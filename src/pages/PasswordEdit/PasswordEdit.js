import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updatePassword } from "../../redux/reducers/userReducer";
import {
  setErrorMessage,
  setShowWarningNotification,
} from "../../redux/reducers/notificationReducer";
import { Div, Icon, Text, Button } from "atomize";
import InputField from "../../Components/UserSystem/InputField";
import SuccessNotification from "../../Components/Notifications/SuccessNotification";
import WarningNotification from "../../Components/Notifications/WarningNotification";
import { remindText, inputRule } from "../../constants/inputText";

const PasswordInfo = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((store) => store.users.user);

  useEffect(() => {
    if (user && user === "non-login") return history.push("/");
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  const handleSubmit = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      dispatch(setErrorMessage("請填入所有必填欄位"));
      dispatch(setShowWarningNotification(true));
      return;
    }

    if (oldPassword === newPassword) {
      dispatch(setErrorMessage("新密碼與舊密碼相同"));
      dispatch(setShowWarningNotification(true));
      return;
    }

    if (newPassword !== confirmPassword) {
      dispatch(setErrorMessage("兩次密碼輸入不符"));
      dispatch(setShowWarningNotification(true));
      return;
    }

    dispatch(updatePassword(oldPassword, newPassword, confirmPassword)).then(
      (res) => {
        if (res.ok) {
          dispatch(setErrorMessage(null));
          history.goBack();
        }
      }
    );
  };

  return (
    <>
      {user && (
        <Div
          w={{ xs: "100%", md: "60%" }}
          m="0 auto"
          p={{ xs: "1.5rem", md: "0" }}
          d="flex"
          flexDir="column"
          align="center"
          justify="center"
        >
          <Div tag="h2" m={{ b: "1.5rem" }} w="100%">
            修改密碼
          </Div>
          <form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <InputField
              name="輸入原密碼"
              type="password"
              value={oldPassword}
              handleEvent={(e) => setOldPassword(e.target.value)}
              remind={remindText.password}
              rule={inputRule.password}
              required={true}
            />
            <InputField
              name="輸入新密碼"
              type="password"
              value={newPassword}
              handleEvent={(e) => setNewPassword(e.target.value)}
              remind={remindText.password}
              rule={inputRule.password}
              required={true}
            />
            <InputField
              name="再次輸入新密碼"
              type="password"
              value={confirmPassword}
              handleEvent={(e) => setConfirmPassword(e.target.value)}
              remind={remindText.password}
              rule={inputRule.password}
              required={true}
            />
            <Text
              h="20px"
              textColor="red"
              m={{ t: "2rem" }}
              textSize="14px"
            ></Text>
            <Div d="flex">
              <Button
                prefix={
                  <Icon
                    name="LongLeft"
                    size="16px"
                    color="white"
                    m={{ r: "1rem" }}
                  />
                }
                type="button"
                bg="gray700"
                shadow="1"
                hoverShadow="2"
                m={{ t: "1rem", b: "3rem" }}
                onClick={() => history.push("/member_edit")}
              >
                返回
              </Button>
              <Button
                suffix={
                  <Icon
                    name="LongRight"
                    size="16px"
                    color="white"
                    m={{ l: "1rem" }}
                  />
                }
                bg="info700"
                shadow="1"
                hoverShadow="2"
                m={{ t: "1rem", b: "3rem", l: "1rem" }}
              >
                確認修改密碼
              </Button>
            </Div>
          </form>
        </Div>
      )}
    </>
  );
};

const PasswordEdit = () => {
  return (
    <Div w="100%">
      <PasswordInfo />
      <SuccessNotification />
      <WarningNotification />
    </Div>
  );
};

export default PasswordEdit;
