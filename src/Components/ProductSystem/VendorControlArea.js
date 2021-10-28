import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Div, Icon, Button } from "atomize";
import Dropdown from "../../Components/ProductSystem/VendorProductDropdown";

const AvailableFilter = ({
  availableFilter,
  setAvailableFilter,
  isDisabled,
}) => {
  return (
    <Div d="flex" textSize="body">
      <Div
        m={{ x: "0.5rem" }}
        cursor={isDisabled ? "not-allowed" : "pointer"}
        textColor={availableFilter === "all" ? "info800" : "disabled"}
        onClick={() => !isDisabled && setAvailableFilter("all")}
      >
        全部
      </Div>{" "}
      |{" "}
      <Div
        m={{ x: "0.5rem" }}
        cursor={isDisabled ? "not-allowed" : "pointer"}
        textColor={availableFilter === "true" ? "info800" : "disabled"}
        onClick={() => !isDisabled && setAvailableFilter("true")}
      >
        供應中
      </Div>{" "}
      |{" "}
      <Div
        m={{ x: "0.5rem" }}
        cursor={isDisabled ? "not-allowed" : "pointer"}
        textColor={availableFilter === "false" ? "info800" : "disabled"}
        onClick={() => !isDisabled && setAvailableFilter("false")}
      >
        未供應
      </Div>
      |{" "}
      <Div
        m={{ x: "0.5rem" }}
        cursor={isDisabled ? "not-allowed" : "pointer"}
        textColor={availableFilter === "expired" ? "info800" : "disabled"}
        onClick={() => !isDisabled && setAvailableFilter("expired")}
      >
        已過期
      </Div>
      |{" "}
      <Div
        m={{ x: "0.5rem" }}
        cursor={isDisabled ? "not-allowed" : "pointer"}
        textColor={availableFilter === "soldOut" ? "info800" : "disabled"}
        onClick={() => !isDisabled && setAvailableFilter("soldOut")}
      >
        已售完
      </Div>
    </Div>
  );
};

AvailableFilter.propTypes = {
  availableFilter: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  setAvailableFilter: PropTypes.func,
  isDisabled: PropTypes.bool,
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
  availableFilter,
  setAvailableFilter,
  isDisabled,
}) {
  return (
    <>
      <Dropdown
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        isDisabled={isDisabled}
      />

      <AvailableFilter
        availableFilter={availableFilter}
        setAvailableFilter={setAvailableFilter}
        isDisabled={isDisabled}
      />

      <AddButton isDisabled={isDisabled} />
    </>
  );
}

ControlArea.propTypes = {
  categoryId: PropTypes.number,
  setCategoryId: PropTypes.func,
  availableFilter: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  setAvailableFilter: PropTypes.func,
  isDisabled: PropTypes.bool,
};

export default ControlArea;
