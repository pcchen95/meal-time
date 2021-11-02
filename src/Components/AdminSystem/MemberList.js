import React from "react";
import { Div, Button } from "atomize";
import PropTypes from "prop-types";

export default function MemberList({ user, handleChangeAuth }) {
  return (
    <Div
      m={{ t: "2rem" }}
      border={{ b: "1px solid" }}
      p="0.25rem"
      d="flex"
      justify="space-between"
    >
      <Div transform="translateY(25%)">編號：{user.id}</Div>
      <Div transform="translateY(25%)" m={{ l: "1rem" }}>
        暱稱：{user.nickname}
      </Div>
      <Div transform="translateY(25%)" m={{ l: "1rem" }}>
        權限：{user.role}
      </Div>
      <Div>
        <Button
          h="2.5rem"
          p={{ x: "0.75rem" }}
          textSize="body"
          bg="white"
          hoverBg="warning300"
          rounded="xl"
          m={{ r: "1rem" }}
          fontFamily="code"
          textColor="danger700"
          border="1px solid"
          borderColor="danger900"
          textWeight="500"
          id={user.id}
          onClick={() => {
            handleChangeAuth(user.id);
          }}
        >
          {user.role === "member" && "使停權"}
          {user.role === "vendor" && "使停權"}
          {user.role === "suspended" && "使復權"}
          {user.role === "admin" && "管理員"}
        </Button>
      </Div>
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
