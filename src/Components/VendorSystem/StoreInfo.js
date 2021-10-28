import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Div } from "atomize";
import StoreOpenHour from "./StoreOpenHour";
import Map from "./Map";

const AboutStore = ({ title, description }) => {
  return (
    <Div w="100%" h="auto">
      <Div
        w="100%"
        textColor="black400"
        textAlign={{ xs: "center", sm: "left" }}
        bg="success200"
        p="0.3rem"
      >
        {title}
      </Div>
      <Div
        w="100%"
        h={{ xs: "10rem", lg: "7rem" }}
        textSize="14px"
        textAlign={{ xs: "center", sm: "left" }}
        p="0.5rem"
      >
        {description}
      </Div>
    </Div>
  );
};

AboutStore.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

const StoreTime = ({ title }) => {
  return (
    <Div w="100%" h="auto">
      <Div
        w="100%"
        textColor="black400"
        textAlign={{ xs: "center", sm: "left" }}
        bg="success200"
        p="0.3rem"
      >
        {title}
      </Div>
      <StoreOpenHour />
    </Div>
  );
};

StoreTime.propTypes = {
  title: PropTypes.string,
};

const InfoArea = ({ description }) => {
  return (
    <Div
      w={{ xs: "100%", sm: "50%" }}
      p={{ x: "1rem" }}
      h="auto"
      d="flex"
      flexDir="column"
      align={{ xs: "center", sm: "flex-start" }}
    >
      <AboutStore title="關於賣場" description={description} />
      <StoreTime title="營業時間" />
    </Div>
  );
};

InfoArea.propTypes = {
  description: PropTypes.string,
};

const MapArea = ({ latlng }) => {
  return (
    <Div
      w={{ xs: "100%", sm: "60%" }}
      maxW={{ sm: "400px" }}
      h={{ xs: "18rem", sm: "100%" }}
      border={{ t: { xs: "4px solid", sm: "" } }}
      borderColor="gray400"
      m={{ t: { xs: "2rem", sm: "0" } }}
      p={{ y: { xs: "2rem", sm: "0" } }}
      d="flex"
      align="center"
    >
      <Map latlng={latlng} />
    </Div>
  );
};

MapArea.propTypes = {
  latlng: PropTypes.object,
};
const StoreInfo = () => {
  const vendor = useSelector((store) => store.vendors.vendorById);
  const [description, setDescription] = useState("");
  const [latlng, setLatLng] = useState(null);

  useEffect(() => {
    if (vendor) {
      setDescription(vendor.description);
      setLatLng(() => {
        return {
          lat: vendor.position.coordinates[0],
          lng: vendor.position.coordinates[1],
        };
      });
    }
  }, [vendor]);

  return (
    <Div
      d={{ xs: "", sm: "flex" }}
      align="flex-start"
      h={{ xs: "auto", sm: "465px", lg: "417px" }}
      border={{ b: "4px solid" }}
      borderColor="gray400"
      p="1rem 0"
    >
      <InfoArea description={description} />
      <MapArea latlng={latlng} />
    </Div>
  );
};

export default StoreInfo;
