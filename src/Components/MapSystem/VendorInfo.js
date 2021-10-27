import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Div, Text } from "atomize";

const Avatar = ({ image }) => {
  return (
    <Div
      bgImg={image || "defaultAvatar.png"}
      bgSize="cover"
      bgPos="center"
      w="8rem"
      h="8rem"
      rounded="circle"
    />
  );
};

Avatar.propTypes = {
  image: PropTypes.string,
};

const VendorName = ({ name, id }) => {
  return (
    <Link to={`/store/${id}`} style={{ textDecoration: "none" }}>
      <Div
        textSize="16px"
        w="100%"
        textColor="black800"
        hoverTextColor="info900"
      >
        {name}
      </Div>
    </Link>
  );
};

VendorName.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number,
};

const Category = ({ name, distance }) => {
  return (
    <Div textSize="12px" m={{ t: "8px" }} textColor="info600" d="flex">
      {name}
      {distance && <Text textColor="gray800">．{distance}</Text>}
    </Div>
  );
};

Category.propTypes = {
  name: PropTypes.string,
  distance: PropTypes.string,
};

const Address = ({ address }) => {
  return (
    <Div textSize="12px" m={{ t: "8px" }} textColor="black600">
      {address}
    </Div>
  );
};

Address.propTypes = {
  address: PropTypes.string,
};

const Phone = ({ phone }) => {
  return (
    <Div textSize="12px" m={{ t: "8px" }} textColor="black600">
      {phone}
    </Div>
  );
};

Phone.propTypes = {
  phone: PropTypes.string,
};

export default function VendorInfo({ vendorOfMap, distance }) {
  return (
    <Div
      w="100%"
      d="flex"
      flexDir="column"
      align="center"
      border={{ b: { xs: "2px solid", sm: "", lg: "2px solid" } }}
      p={{ b: "1rem" }}
      borderColor="gray400"
    >
      <Avatar image={vendorOfMap.avatarUrl} />

      <Div
        m={{ t: "1rem" }}
        w="100%"
        d="flex"
        flexDir="column"
        align={{ xs: "center", lg: "flex-start" }}
      >
        <VendorName name={vendorOfMap.vendorName} id={vendorOfMap.id} />
        <Category name={vendorOfMap.VendorCategory.name} distance={distance} />
        <Address address={vendorOfMap.address} />
        <Phone phone={vendorOfMap.phone} />
      </Div>
    </Div>
  );
}

VendorInfo.propTypes = {
  vendorOfMap: PropTypes.object,
  distance: PropTypes.string,
};
