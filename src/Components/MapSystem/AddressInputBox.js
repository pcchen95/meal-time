import React from "react";
import PropTypes from "prop-types";
import { Button, Input, Icon, Div } from "atomize";

export default function AddressInputBox({
  address,
  handleOnChange,
  handleEnter,
  handleClear,
}) {
  return (
    <Div w={{ xs: "100%", lg: "calc(100% - 18rem)" }} m={{ t: "1rem" }}>
      <Input
        placeholder="輸入您的所在地地址"
        m={{ t: { xs: "1rem", sm: "0" } }}
        w="100%"
        value={address}
        onChange={handleOnChange}
        suffix={
          <>
            {address && (
              <Icon
                name="Cross"
                size="20px"
                cursor="pointer"
                onClick={handleClear}
                pos="absolute"
                top="50%"
                color="gray600"
                right="3.5rem"
                transform="translateY(-50%)"
              />
            )}
            <Button
              pos="absolute"
              onClick={handleEnter}
              bg="info700"
              hoverBg="info800"
              w="3rem"
              top="0"
              right="0"
              rounded={{ r: "md" }}
            >
              <Icon name="Edit" size="20px" color="white" cursor="pointer" />
            </Button>
          </>
        }
      />
    </Div>
  );
}

AddressInputBox.propTypes = {
  address: PropTypes.string,
  handleOnChange: PropTypes.func,
  handleEnter: PropTypes.func,
  handleClear: PropTypes.func,
};
