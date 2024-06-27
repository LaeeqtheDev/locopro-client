import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import GeoCoderMarker from '../GeoCoderMarker/GeoCoderMarker'

const Map = ({ address, city, country }) => {
  return (
    <MapContainer
      center={[31.5497, 74.3436]}  // Coordinates for Lahore
      zoom={12}  // Set a reasonable zoom level for city view
      scrollWheelZoom={true}
      style={{
        height: "40vh",
        width: "100%",
        marginTop: "20px",
        zIndex: 0,
      }}
    >
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'/>
      <GeoCoderMarker address={`${address} ${city} ${country}`} />
    </MapContainer>
  )
}

export default Map
