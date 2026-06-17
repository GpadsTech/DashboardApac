import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useEffect } from 'react'

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

function CorrigirMapa() {
  const map = useMap()

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize()
    }, 100)

    map.on('zoomend', () => {
      map.invalidateSize()
    })
  }, [map])

  return null
}

function Mapa({ onEstacaoClick }) {
  const centroInicial = [-7.9771, -36.4946]

  return (
    <MapContainer
      center={centroInicial}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
    >
      <CorrigirMapa />

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        detectRetina={true}
      />

      <Marker
        position={centroInicial}
        icon={redIcon}
        eventHandlers={{
          click: () => {
            onEstacaoClick("Jatuaba-PE")
          }
        }}
      >
        <Popup>Estações(Último dado)</Popup>
      </Marker>

    </MapContainer>
  )
}

export default Mapa