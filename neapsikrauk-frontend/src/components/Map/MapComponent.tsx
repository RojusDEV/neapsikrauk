import { Map, MapControls, type MapRef } from "@/components/ui/map";
import { Card } from "@/components/ui/card";
import { useEffect, useRef} from "react";

export function MapComponent() {
  const mapRef = useRef<MapRef>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        mapRef.current?.flyTo({
          center: [position.coords.longitude, position.coords.latitude],
        });
      },
      (error) => {
        console.log("Location access denied, using default (Vilnius)");
      },
    );
  }, []);
  return (
    <Card className="h-[320px] p-0 overflow-hidden">
      <Map ref={mapRef} center={[25.2798, 54.6872]} zoom={11} theme="light">
        <MapControls />
      </Map>
    </Card>
  );
}
