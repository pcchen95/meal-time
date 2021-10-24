import React from "react";
import PropTypes from "prop-types";
import { Div, Button } from "atomize";
import { useDispatch } from "react-redux";
import { setStatus } from "../../redux/reducers/orderReducer";

const orderFilter = [
  { name: "全部", action: setStatus(null) },
  { name: "待取貨", action: setStatus("uncompleted") },
  { name: "已完成", action: setStatus("completed") },
  { name: "已取消", action: setStatus("canceled") },
];

const FilterButton = ({ setPage }) => {
  const dispatch = useDispatch();

  return (
    <Div pos="fixed" left="0" top="20%">
      {orderFilter.map((item) => (
        <Button
          key={item.name}
          h="5rem"
          p={{ x: "1.25rem", y: { xs: "2.5rem", lg: "1.25rem" } }}
          w="4rem"
          textSize="body"
          textColor="info700"
          bg="white"
          hoverBg="warning300"
          border="1px solid"
          borderColor="info700"
          hoverBorderColor="info900"
          onClick={() => {
            dispatch(item.action);
            setPage(1);
          }}
        >
          {item.name}
        </Button>
      ))}
    </Div>
  );
};

FilterButton.propTypes = {
  setPage: PropTypes.number,
};

export default FilterButton;
