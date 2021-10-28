import React from "react";
import { Div } from "atomize";
import PropTypes from "prop-types";
import ChangeMemberAuthButton from "../../Components/AdminSystem/ChangeMemberAuthButton";

export default function MemberList({ user, handleChangeAuth }) {
  return (
    <Div
      border="1px solid"
      m={{ t: "2rem" }}
      p="1rem"
      rounded="sm"
      d="flex"
      justify="space-between"
    >
      {" "}
      <Div d="flex">
        <Div transform="translateY(25%)">編號：{user.id}</Div>
        <Div transform="translateY(25%)" m={{ l: "1rem" }}>
          暱稱：{user.nickname}
          {user.role}
        </Div>
      </Div>
      <ChangeMemberAuthButton
        id={user.id}
        handleChangeAuth={handleChangeAuth}
      />
    </Div>
  );
}

MemberList.propTypes = {
  user: PropTypes.object,
  id: PropTypes.number,
  nickname: PropTypes.string,
  role: PropTypes.string,
  handleChangeAuth: PropTypes.func,
};
