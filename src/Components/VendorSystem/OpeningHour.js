import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Div, Text, Input } from "atomize";
import CustomRaios from "./Radiobox";

const TimeInput = ({ name, value, isDisabled, required, handleOnChange }) => {
  return (
    <Div
      d="flex"
      flexDir={{ xs: "column", lg: "row" }}
      m={{ l: { xs: "1rem", md: "3rem" }, t: { xs: "1rem", md: "0" } }}
      align={{ xs: "flex-start", lg: "center" }}
    >
      <Text textColor={isDisabled && "gray600"} transition>
        {name}
      </Text>
      <Input
        m={{ l: { lg: "1rem" } }}
        type="time"
        value={value}
        onChange={handleOnChange}
        textColor={isDisabled && "gray600"}
        disabled={isDisabled}
        required={required}
      />
    </Div>
  );
};

TimeInput.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  isDisabled: PropTypes.bool,
  handleOnChange: PropTypes.func,
  required: PropTypes.number,
};

const EachDay = ({ name, value, dayENG, newValues, setValues }) => {
  const { start, end, isOpen } = value;
  const isVendor = useSelector((store) => store.vendors.vendor || false);
  const isSuspended = useSelector(
    (store) => store.vendors.vendor && store.vendors.vendor.isSuspended
  );
  const isStoreOpen = useSelector(
    (store) => store.vendors.vendor && store.vendors.vendor.isOpen
  );
  const isDisabled = !isOpen || (isVendor && (!isStoreOpen || isSuspended));
  // available: 當天 isOpen &&  (還不是賣家 || 賣家 isStoreOpen && 賣家沒有被 isSuspended）
  // diable: !當天 isOpen || !(還不是賣家 || (賣家 isStoreOpen && 賣家沒有被 isSuspended))
  //      => !當天 isOpen || (是賣家 && (!賣家 isStoreOpen || 賣家被 isSuspended))

  const handleEvent = (e) => {
    const targetValue = Number(e.target.value);
    if (targetValue === 0) {
      newValues[dayENG].isOpen = 0;
      newValues[dayENG].start = "";
      newValues[dayENG].end = "";
    }
    if (targetValue === 1) {
      newValues[dayENG].isOpen = Number(e.target.value);
    }
    setValues(newValues);
  };

  return (
    <Div
      d={{ xs: "block", md: "flex" }}
      p="1rem"
      align="center"
      m={{ y: "1rem" }}
    >
      <Text textSize="title">{name}</Text>
      <Div m={{ l: { xs: "1rem", md: "2rem" }, t: { xs: "1rem", md: "0" } }}>
        <CustomRaios isOpen={isOpen} handleEvent={handleEvent} />
      </Div>
      <TimeInput
        name="Start time"
        value={start}
        isDisabled={isDisabled}
        required={isOpen}
        handleOnChange={(e) => {
          newValues[dayENG].start = e.target.value;
          setValues(newValues);
        }}
      />
      <TimeInput
        name="Closed time"
        value={end}
        isDisabled={isDisabled}
        required={isOpen}
        handleOnChange={(e) => {
          newValues[dayENG].start = e.target.value;
          setValues(newValues);
        }}
      />
    </Div>
  );
};

EachDay.propTypes = {
  name: PropTypes.string,
  value: PropTypes.object,
  dayENG: PropTypes.string,
  newValues: PropTypes.object,
  setValues: PropTypes.func,
};

const OpeningHour = ({ daysCH, values, setValues }) => {
  const newValues = { ...values };
  const timeOfDay = Object.entries(newValues);
  // [['Monday', {start: 0900, end: 1900}], ['Tuesday', {start: 0900, end: 1900}], ....]
  return (
    <Div m={{ y: "1rem" }}>
      <Text textSize="title" textWeight="500" m={{ l: "1rem" }}>
        設定營業時間
      </Text>
      <Div
        bg="gray200"
        border="1px solid"
        shadow="4"
        borderColor="gray200"
        rounded="sm"
      >
        {timeOfDay.map((day, index) => {
          return (
            <EachDay
              key={index}
              name={daysCH[index]}
              newValues={newValues}
              dayENG={day[0]}
              value={day[1]}
              setValues={setValues}
            />
          );
        })}
      </Div>
    </Div>
  );
};

OpeningHour.propTypes = {
  values: PropTypes.object,
  daysCH: PropTypes.array,
  setValues: PropTypes.func,
};

export default OpeningHour;
