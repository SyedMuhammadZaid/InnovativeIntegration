"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Fix Leaflet marker icons
const icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
})

export default function LeafletMap({ lat = 33.6844, lng = 73.0479 }) {
    const position: [number, number] = [lat, lng]

    return (
        <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={true}
            maxZoom={20}
            className="w-full h-full"
            style={{ minHeight: "400px" }}
        >
            <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
                attribution="Tiles © Esri"
            />
            <Marker position={position} icon={icon}>
                <Popup>
                    <div className="text-center">
                        <strong className="block mb-2">Innovative Integration</strong>
                        <a
                            href="https://maps.app.goo.gl/5wJxigHyQvTK4X6c7"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline"
                        >
                            View on Google Maps
                        </a>
                    </div>
                </Popup>
            </Marker>
        </MapContainer>
    )
}
