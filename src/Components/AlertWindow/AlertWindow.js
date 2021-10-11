import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsAllowSubmit } from "../../redux/reducers/userReducer";
import { Div, Text, Button, Icon } from "atomize";

export function AlertWindow() {
  const dispatch = useDispatch();
  return (
    <Div pos="fixed" top="0" left="0" bottom="0" right="0" bg="rgba(0,0,0,0.4)">
      <Div
        w="25%"
        h="150px"
        p="2rem"
        border="3px solid"
        borderColor="gray500"
        rounded="xl"
        pos="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        bg="white"
        shadow="2"
        d="flex"
        flexDir="column"
        align="center"
      >
        <Text textSize="1rem">確定要修改嗎？</Text>
        <Div d="flex" m={{ t: "2rem" }}>
          <Button
            suffix={
              <Icon
                name="Checked"
                size="16px"
                color="white"
                m={{ l: "0.5rem" }}
              />
            }
            bg="success700"
            shadow="1"
            hoverShadow="3"
            m={{ r: "1rem" }}
            onClick={() => dispatch(setIsAllowSubmit(true))}
          >
            確定
          </Button>
          <Button
            suffix={
              <Icon
                name="Cross"
                size="16px"
                color="white"
                m={{ l: "0.5rem" }}
              />
            }
            bg="gray700"
            shadow="1"
            hoverShadow="3"
          >
            取消
          </Button>
        </Div>
      </Div>
    </Div>
  );
}
export default AlertWindow;
