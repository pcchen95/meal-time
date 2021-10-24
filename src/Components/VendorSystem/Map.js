import React from "react";
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import Geocode from "react-geocode";
import { Div } from "atomize";
import googleMapToken from "../../constants/googleMapToken";

export function Map({ completeAddress, latlng, setLatLng }) {
  const defaultParams = useRef({
    center: {
      lat: 23.893598219621072,
      lng: 121.07164536476822,
    },
    zoom: 7,
  });

  const [zoom, setZoom] = useState(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: googleMapToken,
  });

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
      Geocode.fromAddress(completeAddress).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          setLatLng({ lat, lng });
        },
        (error) => {
          console.error(error);
        }
      );
  }, [completeAddress]);

  return (
    isLoaded && (
      <Div w="100%" h="100%">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={latlng || defaultParams.current.center}
          zoom={zoom || defaultParams.current.zoom}
        >
          {latlng && <Marker position={latlng} />}
        </GoogleMap>
      </Div>
    )
  );
}

Map.propTypes = {
  completeAddress: PropTypes.string,
  latlng: PropTypes.object,
  setLatLng: PropTypes.func,
};

export default Map;
