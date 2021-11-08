import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Div, Icon } from "atomize";

const UserCard = ({ info, selectedId, handleChange }) => {
  return (
    <Div
      p="1rem 0.5rem"
      w="100%"
      border={{ b: "1px dotted" }}
      borderColor="gray700"
      textAlign="left"
      cursor="pointer"
      d="flex"
      align="center"
      onClick={() => handleChange(info.id)}
      bg={info.id === selectedId && "gray300"}
      hoverBg="gray200"
    >
      <Div
        w="3rem"
        h="3rem"
        rounded="circle"
        bgImg={info.avatarURL || "defaultAvatar.png"}
        bgSize="cover"
        bgPos="center"
        m={{ r: "0.5rem" }}
      />
      <Div w="calc(100% - 3.5rem)">
        <Div w="100%" textColor="black">
          <Div d="flex">
            {info.role === "suspended" ? (
              <Icon name="RemoveSolid" size="18px" color="gray700" />
            ) : (
              <Icon name="Success" size="18px" color="success700" />
            )}
            <Div
              m={{ l: "0.5rem" }}
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {info.nickname}
            </Div>
          </Div>
          <Div
            textSize="body"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            (@{info.username})
          </Div>
        </Div>
      </Div>
    </Div>
  );
};

UserCard.propTypes = {
  id: PropTypes.number,
  info: PropTypes.object,
  selectedId: PropTypes.number,
  content: PropTypes.array,
  handleChange: PropTypes.func,
};

const AdminUserList = ({ selectedId, handleChange }) => {
  const users = useSelector((store) => store.admin.users);
  return (
    <Div
      bg="gray700"
      w={{ xs: "100%", sm: "15rem", lg: "10rem" }}
      m={{ r: { xs: "0", sm: "1rem" } }}
      rounded="md"
    >
      <Div textSize="body" textColor="white">
        使用者列表
      </Div>
      <Div
        w="100%"
        h={{ xs: "8rem", sm: "calc(13.5rem + 2px)", lg: "calc(28.5rem + 4px)" }}
        border="2px groove"
        borderColor="gray500"
        overflow="scroll"
        rounded="md"
        shadow="4"
        bg="white"
      >
        {users.rows &&
          users.rows.map((user, index) => (
            <UserCard
              key={index}
              info={user}
              selectedId={selectedId}
              handleChange={handleChange}
            />
          ))}
      </Div>
    </Div>
  );
};

AdminUserList.propTypes = {
  messages: PropTypes.array,
  selectedId: PropTypes.number,
  handleChange: PropTypes.func,
};

export default AdminUserList;
