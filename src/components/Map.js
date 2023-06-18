"use client"
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const icon = L.icon({ iconUrl: "/marker/marker-icon.png" });
const Map = () => {
  return (
    <MapContainer center={[30.869664589653954, 74.04015361010072]} zoom={15} style={{ height: '400px', width: '50%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker icon={icon} position={[30.869664589653954, 74.04015361010072]} />
    </MapContainer>
  );
};

export default Map;