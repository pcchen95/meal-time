import React from "react";
import { Div, Text } from "atomize";

const openingHour = ({ vendorById }) => {
  return (
    <>
      <Text textSize="heading" textColor="gray900" m="1rem">
        營業時間
      </Text>
      <Div textSize="title" textColor="gray800" m="1rem">
        <Div d="flex" justify="center">
          <Div>
            <Text>禮拜一</Text>
            <Text>禮拜二</Text>
            <Text>禮拜三</Text>
            <Text>禮拜四</Text>
            <Text>禮拜五</Text>
            <Text>禮拜六</Text>
            <Text>禮拜天</Text>
          </Div>
          <Div>
            {vendorById &&
              Object.values(JSON.parse(vendorById.openingHour)).map((item) => (
                <Div m={{ l: "1rem" }} key={item.index}>
                  {item.isOpen ? (
                    <Text>
                      {item.start}~{item.end}
                    </Text>
                  ) : (
                    <Text textColor="danger600">－</Text>
                  )}
                </Div>
              ))}
          </Div>
        </Div>
      </Div>
    </>
  );
};

export default openingHour;
