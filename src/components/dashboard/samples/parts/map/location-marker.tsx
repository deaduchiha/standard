import { Icon, IconOptions, LatLngTuple } from "leaflet";
import { useEffect } from "react";
import { Marker, useMap } from "react-leaflet";

export default function LocationMarker({
  position,
  customIcon,
}: {
  position: LatLngTuple;
  customIcon: Icon<IconOptions>;
}) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(position, map.getZoom());
  }, [map, position]);

  return position ? <Marker position={position} icon={customIcon} /> : null;
}
