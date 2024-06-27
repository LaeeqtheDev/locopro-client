import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';

const UpdateMapView = ({ address, city, country }) => {
  const map = useMap();

  useEffect(() => {
    const geocodeAddress = async () => {
      const fullAddress = `${address}, ${city}, ${country}`;
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(fullAddress)}&format=json`
      );
      const results = await response.json();
      if (results.length > 0) {
        const { lat, lon } = results[0];
        map.setView([lat, lon], 13);
      }
    };

    geocodeAddress();
  }, [address, city, country, map]);

  return null;
};

const Map = ({ address, city, country }) => {
  return (
    <MapContainer
      center={[53.35, 18.8]}
      zoom={1}
      scrollWheelZoom={false}
      style={{
        height: '40vh',
        width: '100%',
        marginTop: '20px',
        zIndex: 0,
      }}
    >
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      <UpdateMapView address={address} city={city} country={country} />
    </MapContainer>
  );
};

export default Map;
