import React from "react";
import PropTypes from "prop-types";
import { Div, Text } from "atomize";

const openingHour = ({ vendorById }) => {
  return (
    <>
      <Text textSize={{xs: "subheader", lg: "title"}} textColor="gray900" m={{y: "0.5rem"}}>
        營業時間
      </Text>
      <Div textSize={{xs: "paragraph", lg: "subheader"}} textColor="gray800">
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
              Object.values(JSON.parse(vendorById.openingHour)).map(
                (item, index) => (
                  <Div m={{ l: "1rem" }} w="150px" key={index}>
                    {item.isOpen ? (
                      <Text>
                        {item.start}~{item.end}
                      </Text>
                    ) : (
                      <Text textColor="danger600">－</Text>
                    )}
                  </Div>
                )
              )}
          </Div>
        </Div>
      </Div>
    </>
  );
};

openingHour.propTypes = {
  vendorById: PropTypes.object,
};

export default openingHour;
