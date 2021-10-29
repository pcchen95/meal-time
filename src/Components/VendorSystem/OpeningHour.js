import React from "react";
import PropTypes from "prop-types";
import { Div, Text, Input } from "atomize";
import Radiobox from "./Radiobox";

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
        cursor={isDisabled && "not-allowed"}
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

const EachDay = ({
  name,
  value,
  dayENG,
  newValues,
  setValues,
  isDisabled: isStoreDisabled,
}) => {
  const { start, end, isOpen } = value;
  const isDisabled = !isOpen || isStoreDisabled;

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
        <Radiobox
          isOpen={isOpen}
          handleEvent={handleEvent}
          isStoreDisabled={isStoreDisabled}
        />
      </Div>
      <TimeInput
        name="Start time"
        value={start}
        isDisabled={isDisabled}
        required={isOpen}
        cursor={isStoreDisabled && "not-allowed"}
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
        cursor={isStoreDisabled && "not-allowed"}
        handleOnChange={(e) => {
          newValues[dayENG].end = e.target.value;
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
  isDisabled: PropTypes.bool,
};

const OpeningHour = ({ daysCH, values, setValues, isDisabled }) => {
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
              isDisabled={isDisabled}
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
  isDisabled: PropTypes.bool,
};

export default OpeningHour;
