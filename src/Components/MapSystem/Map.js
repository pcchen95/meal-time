import React from "react";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DistanceMatrixService,
} from "@react-google-maps/api";
import PropTypes from "prop-types";
import Geocode from "react-geocode";
import { Div } from "atomize";
import googleMapToken from "../../constants/googleMapToken";

export function Map({ vendorOfMap, handleEvent, setDistance }) {
  const [clicked, setClicked] = useState(null);
  const [showVendors, setShowVendors] = useState(null);
  const currentPosition = useSelector((store) => store.users.position);
  const vendors = useSelector((store) => store.vendors.vendors);
  const searchedVendors = useSelector((store) => store.vendors.searchedVendors);
  const defaultParams = useRef({
    center: {
      lat: 23.893598219621072,
      lng: 121.07164536476822,
    },
    zoom: 8,
  });

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
    if (vendors) setShowVendors(vendors);
    if (searchedVendors && searchedVendors.length > 0)
      setShowVendors(searchedVendors);
  }, [vendors, searchedVendors]);

  return (
    isLoaded && (
      <Div
        w={{ xs: "100%", lg: "calc(100% - 18rem)" }}
        h={{ xs: "20rem", lg: "40rem" }}
      >
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={currentPosition || defaultParams.current.center}
          zoom={currentPosition ? 15 : defaultParams.current.zoom}
        >
          <Marker
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 6,
            }}
            position={currentPosition}
          />
          {showVendors &&
            showVendors.map((vendor) => {
              return (
                <Marker
                  key={vendor.id}
                  data-id={vendor.id}
                  position={{
                    lat: vendor.position.coordinates[0],
                    lng: vendor.position.coordinates[1],
                  }}
                  icon={{
                    url: "placeholder.png",
                    fillOpacity: 0.3,
                    scaledSize:
                      clicked === vendor.id
                        ? new window.google.maps.Size(35, 35)
                        : new window.google.maps.Size(30, 30),
                  }}
                  onClick={() => {
                    handleEvent(vendor.id);
                    setClicked(vendor.id);
                  }}
                />
              );
            })}
          {vendorOfMap && (
            <DistanceMatrixService
              options={{
                destinations: [
                  {
                    lat: vendorOfMap.position.coordinates[0],
                    lng: vendorOfMap.position.coordinates[1],
                  },
                ],
                origins: [
                  {
                    lat: currentPosition.lat,
                    lng: currentPosition.lng,
                  },
                ],
                travelMode: "DRIVING",
              }}
              callback={(res) => {
                setDistance(res.rows[0].elements[0].distance.text);
              }}
            />
          )}
        </GoogleMap>
      </Div>
    )
  );
}

Map.propTypes = {
  vendorOfMap: PropTypes.object,
  handleEvent: PropTypes.func,
  setDistance: PropTypes.func,
};

export default Map;
