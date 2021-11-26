import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { GoogleMap, DistanceMatrixService } from "@react-google-maps/api";
import { Icon, Div, Button } from "atomize";
import { setSelectedId } from "../../redux/reducers/messageReducer";

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
      <Div textColor="info700">{vendor && vendor.VendorCategory.name}</Div>
    </Div>
  );
};

const Address = ({ latlng, distance, setDistance }) => {
  const vendor = useSelector((store) => store.vendors.vendorById);
  const currentPosition = useSelector((store) => store.users.position);

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

Address.propTypes = {
  latlng: PropTypes.object,
  distance: PropTypes.string,
  setDistance: PropTypes.func,
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

const InfoMain = ({
  name,
  category,
  address,
  phone,
  latlng,
  distance,
  setDistance,
}) => {
  return (
    <Div
      w={{ xs: "80%", md: "100%" }}
      d="flex"
      flexDir="column"
      align={{ xs: "center", md: "flex-start" }}
    >
      <Name name={name} />
      <Category category={category} />
      <Address
        address={address}
        latlng={latlng}
        distance={distance}
        setDistance={setDistance}
      />
      <Phone phone={phone} />
    </Div>
  );
};

InfoMain.propTypes = {
  name: PropTypes.string,
  category: PropTypes.string,
  address: PropTypes.string,
  phone: PropTypes.string,
  latlng: PropTypes.object,
  distance: PropTypes.string,
  setDistance: PropTypes.func,
};

const MessageBtn = ({ handleEvent }) => {
  return (
    <Button
      suffix={
        <Icon
          name="MessageSolid"
          size="16px"
          color="white"
          m={{ l: "0.5rem" }}
        />
      }
      m={{ t: "0.5rem" }}
      h="2rem"
      bg="info700"
      hoverBg="info800"
      rounded="circle"
      p={{ r: "1rem", l: "1rem" }}
      shadow="2"
      hoverShadow="3"
      textSize="caption"
      onClick={handleEvent}
    >
      傳送訊息
    </Button>
  );
};

MessageBtn.propTypes = {
  handleEvent: PropTypes.func,
};

const Info = ({
  id,
  name,
  address,
  phone,
  category,
  latlng,
  distance,
  setDistance,
  user,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleEvent = () => {
    dispatch(setSelectedId(id));
    history.push("/message");
  };

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
        latlng={latlng}
        distance={distance}
        setDistance={setDistance}
      />
      {user && user != "non-login" && <MessageBtn handleEvent={handleEvent} />}
    </Div>
  );
};

Info.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  address: PropTypes.string,
  phone: PropTypes.string,
  category: PropTypes.string,
  latlng: PropTypes.object,
  distance: PropTypes.string,
  setDistance: PropTypes.func,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

const StoreBanner = ({ latlng, distance, setDistance, user }) => {
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
          id={vendor && vendor.id}
          name={vendor && vendor.vendorName}
          address={vendor && vendor.address}
          phone={vendor && vendor.phone}
          category={vendor && vendor.VendorCategory.name}
          latlng={latlng}
          distance={distance}
          setDistance={setDistance}
          user={user}
        />
      </Div>
    </Div>
  );
};

StoreBanner.propTypes = {
  latlng: PropTypes.object,
  distance: PropTypes.string,
  setDistance: PropTypes.func,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default StoreBanner;
