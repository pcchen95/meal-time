import React from "react";
import { Div, Button } from "atomize";
import PropTypes from "prop-types";

export default function MemberList({ member, handleChangeAuth }) {
  return (
    <Div
      m={{ t: "2rem" }}
      border={{ b: "1px solid" }}
      p="0.25rem"
      d="flex"
      justify="flex-start"
      hoverBg="info900"
      hoverTextColor="white"
      cursor="pointer"
    >
      {/*member.avatarURL && (
        <Image src={member.avatarURL} maxW="3rem" maxH="3rem"></Image>
      )*/}
      <Div>
        <Button
          h="2.5rem"
          p={{ x: "0.75rem" }}
          textSize="body"
          bg="white"
          hoverBg="danger800"
          hoverTextColor="white"
          rounded="xl"
          m={{ r: "1rem", b: "0.25rem" }}
          fontFamily="code"
          textColor="danger800"
          border="1px solid"
          borderColor="danger800"
          textWeight="400"
          id={member.id}
          onClick={() => {
            handleChangeAuth(member.id);
          }}
        >
          {member.role === "member" && "使停權"}
          {member.role === "vendor" && "使停權"}
          {member.role === "suspended" && "使復權"}
          {member.role === "admin" && "管理員"}
        </Button>
      </Div>
      <Div transform="translateY(20%)" m={{ r: "1rem" }}>
        編號：{member.id} |
      </Div>
      <Div transform="translateY(20%)" m={{ r: "1rem" }}>
        暱稱：{member.nickname} |
      </Div>
      <Div transform="translateY(20%)">權限：{member.role}</Div>
    </Div>
  );
}

MemberList.propTypes = {
  member: PropTypes.object,
  id: PropTypes.number,
  nickname: PropTypes.string,
  role: PropTypes.string,
  handleChangeAuth: PropTypes.func,
};
