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
import LocationMarker from "./location-marker";

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TProps = { form: UseFormReturn<any> };

const MapCoordinatesForm: FC<TProps> = ({ form }) => {
  const [position, setPosition] = useState<LatLngTuple>([36.550985, 53.045827]);
  const { setValue } = form;

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

  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
                    url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png?api_key=0f64042a-8004-45bc-8a59-b6bb6861c1ba"
                    // attribution={`پیکسل سازان`}
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
                  مکان فعلی
                </Button>
                <Button
                  onClick={() => {
                    setValue("lat", position[0]);
                    setValue("lng", position[1]);

                    form.clearErrors("lat");
                    form.clearErrors("lng");

                    setOpen(false);
                  }}
                  type="submit"
                  variant={"submit"}
                  className="w-full"
                >
                  ثبت
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
