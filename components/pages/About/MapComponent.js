import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/images/marker-icon-2x.png",
  iconUrl: "/images/marker-icon.png",
  shadowUrl: "/images/marker-shadow.png",
});

const MapComponent = () => {
  const position = [-36.8491281, 174.7713053];

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "100%", width: "100%", borderRadius: "0.8rem" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>We live here, come over for a coffee</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
