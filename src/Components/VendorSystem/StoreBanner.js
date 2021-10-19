import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { GoogleMap, DistanceMatrixService } from "@react-google-maps/api";
import { Link } from "react-router-dom";
import { Icon, Div } from "atomize";

const Banner = ({ banner }) => {
  return (
    <Div
      bgImg={banner || "defaultBanner.jpg"}
      bgSize="cover"
      bgPos="center"
      w="100%"
      h="18rem"
    ></Div>
  );
};

Banner.propTypes = {
  banner: PropTypes.string,
};

const Avatar = ({ avatar }) => {
  return (
    <Div
      bgImg={avatar || "defaultAvatar.png"}
      bgSize="cover"
      bgPos="center"
      w="12rem"
      h="12rem"
      rounded="circle"
      border="2px solid"
      borderColor="black300"
      pos="absolute"
      top="0"
      left={{ xs: "50%", md: "15%" }}
      transform="translate(-50%, -30%)"
    ></Div>
  );
};

Avatar.propTypes = {
  avatar: PropTypes.string,
};

const Name = () => {
  const vendor = useSelector((store) => store.vendors.vendorById);
  return (
    <Div
      w="100%"
      textSize="2rem"
      textColor="black500"
      textAlign={{ xs: "center", md: "left" }}
    >
      {vendor && vendor.vendorName}
    </Div>
  );
};

const Category = () => {
  const vendor = useSelector((store) => store.vendors.vendorById);
  return (
    <Div textSize="12px" m={{ t: "1rem" }} d="flex" textColor="gray800">
      分類・
      <Link to="/" style={{ textDecoration: "none" }}>
        <Div textColor="info700">{vendor && vendor.VendorCategory.name}</Div>
      </Link>
    </Div>
  );
};

const Address = () => {
  const vendor = useSelector((store) => store.vendors.vendorById);
  const currentPosition = useSelector((store) => store.users.position);
  const [latlng, setLatLng] = useState(null);
  const [distance, setDistance] = useState("");

  useEffect(() => {
    if (vendor)
      setLatLng(() => {
        return {
          lat: vendor.position.coordinates[0],
          lng: vendor.position.coordinates[1],
        };
      });
  }, [vendor]);

  return (
    <Div
      textSize="14px"
      m={{ t: "0.5rem" }}
      d="flex"
      align="flex-end"
      justify="center"
    >
      <Icon name="Location" size="14px" m={{ r: "0.4rem" }} />
      {currentPosition && latlng && (
        <GoogleMap>
          <DistanceMatrixService
            options={{
              destinations: [latlng],
              origins: [currentPosition],
              travelMode: "DRIVING",
            }}
            callback={(response) => {
              setDistance(response.rows[0].elements[0].distance.text);
            }}
          />
        </GoogleMap>
      )}
      <Div>{vendor && vendor.address}</Div>
      {distance && (
        <Div textSize="12px" textColor="gray600">
          ．距離 {distance}
        </Div>
      )}
    </Div>
  );
};

const Phone = () => {
  const vendor = useSelector((store) => store.vendors.vendorById);
  return (
    <Div
      textSize="14px"
      m={{ t: "0.5rem", l: { xs: "0", md: "20px" } }}
      d="flex"
    >
      {vendor && vendor.phone}
    </Div>
  );
};

const InfoMain = ({ name, category, address, phone }) => {
  return (
    <Div
      w={{ xs: "80%", md: "100%" }}
      d="flex"
      flexDir="column"
      align={{ xs: "center", md: "flex-start" }}
    >
      <Name name={name} />
      <Category category={category} />
      <Address address={address} />
      <Phone phone={phone} />
    </Div>
  );
};

InfoMain.propTypes = {
  name: PropTypes.string,
  category: PropTypes.string,
  address: PropTypes.string,
  phone: PropTypes.string,
};

const Info = ({ name, address, phone, category }) => {
  return (
    <Div
      d="flex"
      flexDir="column"
      align={{ xs: "center", md: "flex-start" }}
      p={{
        l: { xs: "1rem", md: "calc(15% + 8rem)" },
        r: "1rem",
        t: { xs: "10rem", md: "1.5rem" },
        b: "1.5rem",
      }}
      minH="152px"
    >
      <InfoMain
        name={name}
        address={address}
        phone={phone}
        category={category}
      />
    </Div>
  );
};

Info.propTypes = {
  name: PropTypes.string,
  address: PropTypes.string,
  phone: PropTypes.string,
  category: PropTypes.string,
};

const StoreBanner = () => {
  const vendor = useSelector((store) => store.vendors.vendorById);
  return (
    <Div>
      <Div w="100%" h="18rem">
        <Banner banner={vendor && vendor.bannerUrl} />
      </Div>
      <Div
        pos="relative"
        w={{ xs: "100%", md: "90%" }}
        maxW="1100px"
        m="0 auto"
      >
        <Avatar avatar={vendor && vendor.avatarUrl} />
        <Info
          name={vendor && vendor.vendorName}
          address={vendor && vendor.address}
          phone={vendor && vendor.phone}
          category={vendor && vendor.VendorCategory.name}
        />
      </Div>
    </Div>
  );
};

export default StoreBanner;
