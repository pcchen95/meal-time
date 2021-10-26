import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Div } from "atomize";

const daysCH = [
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
  "星期日",
];

const StoreOpenHour = () => {
  const vendor = useSelector((store) => store.vendors.vendorById);
  const [openingHour, setOpeningHour] = useState(null);

  useEffect(() => {
    if (vendor)
      setOpeningHour(() => {
        return Object.entries(JSON.parse(vendor.openingHour));
      });
  }, [vendor]);

  return (
    <Div
      d="flex"
      flexDir="column"
      align={{ xs: "center", sm: "flex-start" }}
      p={{ l: { sm: "0.5rem", lg: "2rem" } }}
      w="100%"
      textSize="14px"
    >
      {openingHour &&
        openingHour.map((day, index) => {
          return (
            <Div key={index} d="flex" m={{ y: "0.5rem" }}>
              <Div w="3rem">{daysCH[index]}</Div>
              <Div
                w="10rem"
                textAlign="center"
                m={{ l: { xs: "1rem", md: "3rem" } }}
              >
                {!day[1].isOpen ? "休息中" : `${day[1].start}～${day[1].end}`}
              </Div>
            </Div>
          );
        })}
    </Div>
  );
};

export default StoreOpenHour;
