import React, { useState, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

const MapWithARoute = ({ origin, destination }) => {
  const [response, setResponse] = useState(null);
  const directionsCallback = useRef();

  directionsCallback.current = (res) => {
    if (
      res !== null &&
      res.status === "OK" &&
      (response === null || response !== res)
    ) {
      setResponse(res);
    }
  };

  console.log("google map");

  return (
    <LoadScript googleMapsApiKey="AIzaSyDT8LSFsT2WDF9AToffbc2id_ncpqWTqPc">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "200px" }}
        center={origin}
        zoom={10}
      >
        {response === null && (
          <DirectionsService
            options={{
              origin: origin,
              destination: destination,
              travelMode: "DRIVING",
            }}
            callback={directionsCallback.current}
          />
        )}
        {response !== null && (
          <DirectionsRenderer
            options={{
              directions: response,
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapWithARoute;
