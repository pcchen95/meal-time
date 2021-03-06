import React from "react";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { GoogleMap, Marker } from "@react-google-maps/api";
import Geocode from "react-geocode";
import { Div } from "atomize";
import { AddressToLatLng } from "../../utils";
import {
  setErrMessage,
  setShowWarningNotification,
} from "../../redux/reducers/notificationReducer";
import googleMapToken from "../../constants/googleMapToken";

export function Map({ completeAddress, latlng, setLatLng }) {
  const dispatch = useDispatch();
  const defaultParams = useRef({
    center: {
      lat: 23.893598219621072,
      lng: 121.07164536476822,
    },
    zoom: 7,
  });

  const [zoom, setZoom] = useState(null);

  useEffect(() => {
    Geocode.setApiKey(googleMapToken);
    Geocode.setLanguage("zh");
    Geocode.setLocationType("ROOFTOP");
  }, []);

  useEffect(() => {
    if (latlng) setZoom(15);
  }, [latlng]);

  useEffect(() => {
    completeAddress &&
      setLatLng &&
      AddressToLatLng(completeAddress).then((res) => {
        const { lat, lng } = res;
        if (lat && lng) {
          return setLatLng({ lat, lng });
        }
        console.log(res);
        dispatch(setErrMessage("找不到地址"));
        dispatch(setShowWarningNotification(true));
      });
  }, [completeAddress]);

  return (
    <Div w="100%" h="100%">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={latlng || defaultParams.current.center}
        zoom={zoom || defaultParams.current.zoom}
      >
        {latlng && <Marker position={latlng} />}
      </GoogleMap>
    </Div>
  );
}

Map.propTypes = {
  completeAddress: PropTypes.string,
  latlng: PropTypes.object,
  setLatLng: PropTypes.func,
};

export default Map;
