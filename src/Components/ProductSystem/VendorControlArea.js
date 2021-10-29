import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Div, Icon, Button } from "atomize";
import Dropdown from "../../Components/ProductSystem/VendorProductDropdown";

const FilterBar = ({ filter, setFilter, isDisabled }) => {
  return (
    <Div
      d="flex"
      textSize={{ xs: "tiny", sm: "body" }}
      pos={{ md: "absolute" }}
      left={{ md: "50%" }}
      top={{ md: "50%" }}
      transform={{ md: "translate(-50%, -50%)" }}
      w={{ xs: "100%", sm: "auto" }}
      justify="center"
      m={{ t: { xs: "1rem", md: "0" } }}
      flexWrap="wrap"
    >
      <Div
        m={{ x: "0.5rem" }}
        cursor={isDisabled ? "not-allowed" : "pointer"}
        textColor={filter === "all" ? "info800" : "disabled"}
        onClick={() => !isDisabled && setFilter("all")}
      >
        全部
      </Div>{" "}
      |{" "}
      <Div
        m={{ x: "0.5rem" }}
        cursor={isDisabled ? "not-allowed" : "pointer"}
        textColor={filter === "available" ? "info800" : "disabled"}
        onClick={() => !isDisabled && setFilter("available")}
      >
        供應中
      </Div>{" "}
      |{" "}
      <Div
        m={{ x: "0.5rem" }}
        cursor={isDisabled ? "not-allowed" : "pointer"}
        textColor={filter === "unavailable" ? "info800" : "disabled"}
        onClick={() => !isDisabled && setFilter("unavailable")}
      >
        未供應
      </Div>
      |{" "}
      <Div
        m={{ x: "0.5rem" }}
        cursor={isDisabled ? "not-allowed" : "pointer"}
        textColor={filter === "expiry" ? "info800" : "disabled"}
        onClick={() => !isDisabled && setFilter("expiry")}
      >
        已過期
      </Div>
      |{" "}
      <Div
        m={{ x: "0.5rem" }}
        cursor={isDisabled ? "not-allowed" : "pointer"}
        textColor={filter === "soldOut" ? "info800" : "disabled"}
        onClick={() => !isDisabled && setFilter("soldOut")}
      >
        已售完
      </Div>
    </Div>
  );
};

FilterBar.propTypes = {
  filter: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  setFilter: PropTypes.func,
  isDisabled: PropTypes.bool,
};

const SortButton = ({ handleSortById, handleSortByDate }) => {
  const [active, setActive] = useState("new");
  return (
    <Div
      d="flex"
      align="center"
      m={{ y: { xs: "0.5rem", lg: "0rem" } }}
      w={{ xs: "100%", sm: "auto" }}
    >
      <Button
        h="2rem"
        p={{ x: "0.75rem" }}
        textSize={{ xs: "tiny", sm: "caption" }}
        textColor={active === "new" ? "white" : "info700"}
        hoverTextColor={active === "new" ? "white" : "info900"}
        bg={active === "new" ? "info700" : "white"}
        hoverBg={active === "new" ? "info900" : "info200"}
        border="1px solid"
        borderColor="info700"
        hoverBorderColor="info900"
        w={{ xs: "50%", sm: "auto" }}
        m={{ r: { xs: "0", sm: "0.5rem" } }}
        rounded={{ xs: "0", sm: "md" }}
        onClick={() => {
          handleSortById();
          setActive("new");
        }}
      >
        最新上架
      </Button>
      <Button
        h="2rem"
        p={{ x: "0.75rem" }}
        textSize="caption"
        textColor={active === "expiry" ? "white" : "info700"}
        hoverTextColor={active === "expiry" ? "white" : "info900"}
        bg={active === "expiry" ? "info700" : "white"}
        hoverBg={active === "expiry" ? "info900" : "info200"}
        border="1px solid"
        borderColor="info700"
        hoverBorderColor="info900"
        w={{ xs: "50%", sm: "auto" }}
        rounded={{ xs: "0", sm: "md" }}
        onClick={() => {
          handleSortByDate();
          setActive("expiry");
        }}
      >
        即期優先
      </Button>
    </Div>
  );
};

SortButton.propTypes = {
  handleSortById: PropTypes.func,
  handleSortByDate: PropTypes.func,
};

const AddButton = ({ isDisabled }) => {
  return (
    <Link to="/product_edit/new" style={{ textDecoration: "none" }}>
      <Button
        prefix={
          <Icon name="Add" size="16px" color="white" m={{ r: "0.5rem" }} />
        }
        h="2rem"
        bg="warning700"
        hoverBg={!isDisabled && "warning800"}
        rounded="md"
        p={{ r: "1rem", l: "1rem" }}
        shadow="2"
        hoverShadow={!isDisabled && "3"}
        disabled={isDisabled}
      >
        新增商品
      </Button>
    </Link>
  );
};

AddButton.propTypes = {
  isDisabled: PropTypes.bool,
};
export function ControlArea({
  categoryId,
  setCategoryId,
  filter,
  setFilter,
  isDisabled,
  handleSortById,
  handleSortByDate,
}) {
  return (
    <Div w="100%">
      <Div w="100%" d="flex" justify="flex-end" m={{ y: "1rem" }}>
        <AddButton isDisabled={isDisabled} />
      </Div>
      <Div w="100%" pos="relative" d="flex" flexDir="column">
        <Div
          d="flex"
          flexDir={{ xs: "column-reverse", sm: "row" }}
          w="100%"
          justify={{ xs: "center", sm: "space-between" }}
          align={{ xs: "flex-start", sm: "flex-end" }}
        >
          <Dropdown
            categoryId={categoryId}
            setCategoryId={setCategoryId}
            isDisabled={isDisabled}
          />

          <SortButton
            handleSortById={handleSortById}
            handleSortByDate={handleSortByDate}
          />
        </Div>
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          isDisabled={isDisabled}
        />
      </Div>
    </Div>
  );
}

ControlArea.propTypes = {
  categoryId: PropTypes.number,
  setCategoryId: PropTypes.func,
  filter: PropTypes.string,
  setFilter: PropTypes.func,
  isDisabled: PropTypes.bool,
  handleSortById: PropTypes.func,
  handleSortByDate: PropTypes.func,
};

export default ControlArea;
