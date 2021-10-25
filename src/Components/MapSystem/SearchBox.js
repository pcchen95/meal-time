import React from "react";
import PropTypes from "prop-types";
import { Button, Input, Icon } from "atomize";

export default function SearchBox({
  input,
  handleOnChange,
  handleSearch,
  handleKeyPressSearch,
  handleClearSearch,
}) {
  return (
    <Input
      placeholder="搜尋商品關鍵字"
      m={{ l: { xs: "0", sm: "2rem" }, t: { xs: "1rem", sm: "0" } }}
      w={{ xs: "100%", sm: "15rem" }}
      value={input}
      onChange={handleOnChange}
      onKeyPress={handleKeyPressSearch}
      suffix={
        <>
          {input && (
            <Icon
              name="Cross"
              size="20px"
              cursor="pointer"
              onClick={handleClearSearch}
              pos="absolute"
              top="50%"
              color="gray600"
              right="3.5rem"
              transform="translateY(-50%)"
            />
          )}
          <Button
            pos="absolute"
            onClick={handleSearch}
            bg="info700"
            hoverBg="info800"
            w="3rem"
            top="0"
            right="0"
            rounded={{ r: "md" }}
          >
            <Icon name="Search" size="20px" color="white" cursor="pointer" />
          </Button>
        </>
      }
    />
  );
}

SearchBox.propTypes = {
  input: PropTypes.string,
  handleOnChange: PropTypes.func,
  handleSearch: PropTypes.func,
  handleKeyPressSearch: PropTypes.func,
  handleClearSearch: PropTypes.func,
};
