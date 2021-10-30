import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { Div, Dropdown, Anchor } from "atomize";

function dateValueToString(number) {
  const formedPDate = new Date(number);
  const month = formedPDate.getMonth() + 1;
  const date = formedPDate.getDate();
  let day;
  switch (formedPDate.getDay()) {
    case 1:
      day = "一";
      break;
    case 2:
      day = "二";
      break;
    case 3:
      day = "三";
      break;
    case 4:
      day = "四";
      break;
    case 5:
      day = "五";
      break;
    case 6:
      day = "六";
      break;
    case 7:
      day = "日";
      break;
  }
  return `${month} 月 ${date} 日（${day}）`;
}

const lists = ({
  availPickupDates,
  pickupDate: selectedDay,
  setPickupDate,
  setShowDropdown,
}) => {
  return (
    <Div p={{ x: "1rem", y: "0.5rem" }}>
      {availPickupDates &&
        availPickupDates
          .filter((availPickupDay) => availPickupDay !== selectedDay)
          .map((availPickupDay) => {
            return (
              <Anchor
                key={availPickupDay}
                d="block"
                p={{ y: "0.25rem" }}
                value={availPickupDay}
                onClick={(e) => {
                  setPickupDate(Number(e.target.getAttribute("value")));
                  setShowDropdown(false);
                }}
              >
                {dateValueToString(availPickupDay)}
              </Anchor>
            );
          })}
    </Div>
  );
};

lists.propTypes = {
  pickupDate: PropTypes.number,
  setPickupDate: PropTypes.func,
  availPickupDates: PropTypes.object,
  setShowDropdown: PropTypes.func,
};

export function SmallDropdown({ availPickupDates, pickupDate, setPickupDate }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <Dropdown
      w="12rem"
      isOpen={showDropdown}
      onClick={handleToggleDropdown}
      menu={lists({
        availPickupDates,
        pickupDate,
        setPickupDate,
        setShowDropdown,
      })}
    >
      {pickupDate ? dateValueToString(pickupDate) : "請選擇日期"}
    </Dropdown>
  );
}

SmallDropdown.propTypes = {
  pickupDate: PropTypes.number,
  setPickupDate: PropTypes.func,
  availPickupDates: PropTypes.array,
};

export default SmallDropdown;
