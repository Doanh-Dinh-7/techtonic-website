"use client";

import { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Circle,
  Marker,
  useMap,
  Polygon,
} from "react-leaflet";
import L, { LatLngExpression, LatLngLiteral } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RefreshCw, MapPin } from "lucide-react";

// Fix Leaflet icon issue in Next.js
const DefaultIcon = L.icon({
  iconUrl: "/placeholder.svg?height=25&width=25",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const CenterUpdater = ({ center }: { center: LatLngExpression }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center]);
  return null;
};

// Hàm định dạng thời gian từ giây -> mm:ss
const formatTime = (seconds: number): string =>
  `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;

const calculateDistance = (p1: LatLngLiteral, p2: LatLngLiteral) => {
  const R = 6371e3;
  const φ1 = (p1.lat * Math.PI) / 180;
  const φ2 = (p2.lat * Math.PI) / 180;
  const Δφ = ((p2.lat - p1.lat) * Math.PI) / 180;
  const Δλ = ((p2.lng - p1.lng) * Math.PI) / 180;
  const a =
    Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const getRandomPoint = (
  center: LatLngLiteral,
  maxDistance: number
): LatLngLiteral => {
  const angle = Math.random() * 2 * Math.PI;
  const distance = Math.random() * maxDistance;
  const latOffset = distance / 111111;
  const lngOffset =
    distance / (111111 * Math.cos((center.lat * Math.PI) / 180));

  return {
    lat: center.lat + latOffset * Math.sin(angle),
    lng: center.lng + lngOffset * Math.cos(angle),
  };
};

type PolygonType = {
  name: string;
  color: string;
  positions: LatLngExpression[];
};

// Danh sách các vùng Trạm rỗng
const polygons: PolygonType[] = [];

// // Danh sách các vùng Trạm
// const polygons: PolygonType[] = [
//   {
//     name: "Khu vực tập trung",
//     color: "slategray",
//     positions: [
//       [16.037441, 108.226217],
//       [16.037869, 108.226292],
//       [16.037914, 108.226628],
//       [16.037505, 108.226711],
//     ],
//   },
//   {
//     name: "Trạm 1",
//     color: "cornflowerblue",
//     positions: [
//       [16.036646, 108.224574],
//       [16.037145, 108.224513],
//       [16.037178, 108.225055],
//       [16.036747, 108.225119],
//     ],
//   },
//   {
//     name: "Trạm 2",
//     color: "green",
//     positions: [
//       [16.036522, 108.227565],
//       [16.036588, 108.228091],
//       [16.036235, 108.228146],
//       [16.036167, 108.227628],
//     ],
//   },
//   {
//     name: "Trạm 3",
//     color: "indianred",
//     positions: [
//       [16.038056, 108.225206],
//       [16.038138, 108.225795],
//       [16.038403, 108.225762],
//       [16.038332, 108.225207],
//     ],
//   },
//   {
//     name: "Trạm 4",
//     color: "orange",
//     positions: [
//       [16.035845, 108.228266],
//       [16.03588, 108.228577],
//       [16.036234, 108.228518],
//       [16.036199, 108.228223],
//     ],
//   },
//   {
//     name: "Trạm 5",
//     color: "yellow",
//     positions: [
//       [16.034852, 108.234269],
//       [16.034825, 108.234465],
//       [16.03431, 108.234319],
//       [16.034318, 108.234114],
//     ],
//   },

//   // Thêm các vùng khác...
// ];

const MapComponent = () => {
  // Trung tâm trạm 5 16.0344, 108.2341
  const defaultCenter: LatLngLiteral = { lat: 16.0344, lng: 108.2341 };
  // Vị trí kho báu 16.0342, 108.2331
  const defaultPoint: LatLngLiteral = { lat: 16.0342, lng: 108.2331 };
  const initialRadius = 170; // 1000 meters = 1km

  const [center, setCenter] = useState(defaultCenter);
  const [selectedPoint, setSelectedPoint] = useState(defaultPoint);
  const [radius, setRadius] = useState(initialRadius);
  const [initialCountdown, setInitialCountdown] = useState(10 * 60); // 10 minutes in seconds
  const [countdown, setCountdown] = useState(initialCountdown);
  const [shrinkSteps, setShrinkSteps] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const shrinkInterval = Math.floor(initialCountdown / shrinkSteps);

  useEffect(() => {
    if (!isRunning) return;
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsRunning(false);

          // Lưu trạng thái cuối cùng
          localStorage.setItem("circleFinalCenter", JSON.stringify(center));
          localStorage.setItem("circleFinalRadius", radius.toString());

          return 0;
        }

        const shouldShrink = prev % shrinkInterval === 0;
        if (shouldShrink && prev !== initialCountdown) {
          setRadius((r) => Math.max(50, r * 0.8));
          setCenter((currCenter) => {
            const newRadius = Math.max(50, radius * 0.8);
            const dist = calculateDistance(currCenter, selectedPoint);

            if (dist > newRadius * 0.9) {
              const moveDist = dist - newRadius * 0.7;
              const dir = {
                lat: (selectedPoint.lat - currCenter.lat) / dist,
                lng: (selectedPoint.lng - currCenter.lng) / dist,
              };
              return {
                lat: currCenter.lat + dir.lat * moveDist,
                lng: currCenter.lng + dir.lng * moveDist,
              };
            } else {
              const candidate = getRandomPoint(currCenter, newRadius * 0.5);
              return calculateDistance(candidate, selectedPoint) <
                newRadius * 0.9
                ? candidate
                : currCenter;
            }
          });
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [isRunning, shrinkInterval, selectedPoint, radius]);

  // Lấy vị trí hiện tại của người dùng thông qua API
  // useEffect(() => {
  //   navigator.geolocation?.getCurrentPosition(
  //     (pos) =>
  //       setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
  //     (err) => console.error("Geolocation error:", err)
  //   );
  // }, []);

  // khi load trang, khôi phục lại thời gian còn lại
  useEffect(() => {
    const savedEnd = localStorage.getItem("circleCountdownEnd");
    const savedInitial = localStorage.getItem("circleInitialCountdown");
    const savedShrink = localStorage.getItem("circleShrinkSteps");
    const savedCenter = localStorage.getItem("circleCenter");
    const savedRadius = localStorage.getItem("circleRadius");
    const savedFinalCenter = localStorage.getItem("circleFinalCenter");
    const savedFinalRadius = localStorage.getItem("circleFinalRadius");

    if (savedEnd && savedInitial && savedShrink && savedCenter && savedRadius) {
      const endTime = parseInt(savedEnd);
      const remaining = Math.floor((endTime - Date.now()) / 1000);

      if (remaining > 0) {
        setCountdown(remaining);
        setInitialCountdown(parseInt(savedInitial));
        setShrinkSteps(parseInt(savedShrink));
        setCenter(JSON.parse(savedCenter));
        setRadius(parseFloat(savedRadius));
        setIsRunning(true);
        setHasStarted(true);
      } else if (savedFinalCenter && savedFinalRadius) {
        // Nếu countdown đã hết nhưng có dữ liệu cuối thì khôi phục trạng thái
        setCountdown(0);
        setInitialCountdown(parseInt(savedInitial));
        setShrinkSteps(parseInt(savedShrink));
        setCenter(JSON.parse(savedFinalCenter));
        setRadius(parseFloat(savedFinalRadius));
        setIsRunning(false);
        setHasStarted(true);
      }
    }
  }, []);

  const startTimer = () => {
    const now = Date.now(); // miliseconds
    const endTime = now + countdown * 1000;
    localStorage.setItem("circleCountdownEnd", endTime.toString());
    localStorage.setItem("circleInitialCountdown", initialCountdown.toString());
    localStorage.setItem("circleShrinkSteps", shrinkSteps.toString());
    localStorage.setItem("circleCenter", JSON.stringify(center));
    localStorage.setItem("circleRadius", radius.toString());

    setIsRunning(true);
    setHasStarted(true);
  };

  const pauseTimer = () => setIsRunning(false);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    localStorage.clear();

    setCountdown(initialCountdown);
    setRadius(initialRadius);
    setCenter(defaultCenter);
    setIsRunning(false);
    setHasStarted(false);
  };

  // Cập nhật center và radius mỗi lần thay đổi
  useEffect(() => {
    if (hasStarted) {
      localStorage.setItem("circleCenter", JSON.stringify(center));
      localStorage.setItem("circleRadius", radius.toString());
    }
  }, [center, radius]);

  // Khi người dùng thay đổi input thời gian
  const handleCountdownChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      const seconds = value * 60;
      setInitialCountdown(seconds);
      setCountdown(seconds);
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="countdown">Thời gian (phút)</Label>
              <Input
                id="countdown"
                type="number"
                min={1}
                max={60}
                defaultValue={10}
                onChange={handleCountdownChange}
                disabled={hasStarted}
              />
            </div>
            <div>
              <Label>Số lần thu nhỏ vòng tròn {shrinkSteps}</Label>

              {/* Slider cho phép người dùng chọn số lần thu nhỏ (1-10) */}
              <Slider
                defaultValue={[shrinkSteps]}
                min={1}
                max={10}
                step={1}
                onValueChange={(v) => setShrinkSteps(v[0])}
                disabled={hasStarted}
              />
            </div>
          </div>
          <div className="space-y-4 text-center">
            <div className="text-4xl font-bold">{formatTime(countdown)}</div>
            <div className="flex justify-center gap-2">
              {!isRunning ? (
                <Button onClick={startTimer}>
                  <Play className="w-4 h-4 mr-2" />
                  {hasStarted ? "Tiếp tục" : "Bắt đầu"}
                </Button>
              ) : (
                <Button onClick={pauseTimer}>
                  <Pause className="w-4 h-4 mr-2" />
                  Tạm dừng
                </Button>
              )}
              <Button onClick={resetTimer} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Đặt lại
              </Button>
            </div>
          </div>
        </div>

        <div className="h-[500px] w-full rounded-lg overflow-hidden border">
          <MapContainer
            center={center}
            zoom={16}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Circle
              center={center}
              radius={radius}
              pathOptions={{
                color: "hsl(var(--primary))",
                fillColor: "hsl(var(--primary))",
                fillOpacity: 0.2,
              }}
            />
            <CenterUpdater center={center} />

            {/* Danh sách khu vực các trạm */}
            {polygons?.map((polygon, index) => (
              <Polygon
                key={index}
                positions={polygon.positions}
                pathOptions={{
                  color: polygon.color,
                  fillColor: polygon.color,
                  fillOpacity: 0.4,
                }}
              />
            ))}
          </MapContainer>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          <p>Thông tin:</p>
          <ul className="list-disc pl-5">
            <li>Vòng tròn ban đầu: {initialRadius}m</li>
            <li>Vòng tròn hiện tại: {Math.round(radius)}m</li>
            <li>
              Mỗi lần thu nhỏ: sau {Math.floor(shrinkInterval / 60)} phút{" "}
              {shrinkInterval % 60} giây
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

const MapWithShrinkingCircle = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="h-[500px] w-full flex items-center justify-center border rounded-md">
        <p>Đang tải bản đồ...</p>
      </div>
    );
  }

  return <MapComponent />;
};

export default MapWithShrinkingCircle;
