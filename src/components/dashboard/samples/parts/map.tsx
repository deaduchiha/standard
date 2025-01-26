"use client";

import React, { FC, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import "leaflet/dist/leaflet.css";
import L, { LatLngTuple } from "leaflet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import LocationMarker from "./map/location-marker";
import { TCreateSample } from "@/types/validations/samples";

function MapEvents({
  setPosition,
}: {
  setPosition: (latlng: L.LatLng) => void;
}) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });
  return null;
}

const customIcon = L.icon({
  iconUrl: "/map-pin.svg", // Make sure this file exists in your public folder
  iconSize: [38, 38], // size of the icon
  iconAnchor: [19, 38], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -38], // point from which the popup should open relative to the iconAnchor
});

type TProps = { form: UseFormReturn<TCreateSample> };

const MapCoordinatesForm: FC<TProps> = ({}) => {
  const [position, setPosition] = useState<LatLngTuple>([36.550985, 53.045827]);

  const handleMapClick = (latlng: L.LatLng) => {
    setPosition([latlng.lat, latlng.lng]);
  };

  const handleGetCurrentLocation = async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setPosition([latitude, longitude]);
        },
        () => {
          toast.error(
            "مشکلی پیش آمده است لطفا کمی صبر کنید و دوباره تلاش کنید"
          );
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>انتخاب نقشه</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>انتخاب آدرس</DialogTitle>
          <DialogDescription>
            آدرس مورد نظر خود را انتخاب کنید
          </DialogDescription>
        </DialogHeader>

        <div>
          <Card className="w-full max-w-2xl mx-auto">
            <CardContent>
              <div className="mb-4 h-[400px]">
                <MapContainer
                  center={[36.550985, 53.045827]}
                  zoom={18}
                  maxZoom={18}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    minZoom={10}
                    maxZoom={21}
                    url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
                  />
                  <MapEvents setPosition={handleMapClick} />
                  {position && (
                    <LocationMarker
                      position={position}
                      customIcon={customIcon}
                    />
                  )}
                </MapContainer>
              </div>
              <div className="space-y-4">
                <Button
                  type="button"
                  onClick={handleGetCurrentLocation}
                  className="w-full mb-2"
                >
                  Get Current Location
                </Button>
                <Button
                  onClick={() => {
                    console.log(position);
                  }}
                  type="submit"
                  className="w-full"
                >
                  Submit Coordinates
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MapCoordinatesForm;
