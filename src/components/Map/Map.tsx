import * as Location from "expo-location";
import { LocationObjectCoords } from "expo-location";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Platform, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"; // ✅ PROVIDER_GOOGLE
import { styleMap } from "./styles";

const ACCURACY_THRESHOLD_METERS = 50;

export function Map() {
  const [location, setLocation] = useState<LocationObjectCoords | null>(null);
  const [erro, setErro] = useState("");
  const [aguardandoGPS, setAguardandoGPS] = useState(true);
  const [mapaCarregado, setMapaCarregado] = useState(false);
  const bestAccuracy = useRef<number>(Infinity);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErro("Permissão de localização negada");
        return;
      }

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 1,
          timeInterval: 1000,
          ...(Platform.OS === "android" && {
            mayShowUserSettingsDialog: true,
          }),
        },
        (loc) => {
          const { accuracy } = loc.coords;
          setLocation(loc.coords);

          if (accuracy) {
            // 1. Lógica de Destravar o GPS (Independente do bestAccuracy)
            if (accuracy <= ACCURACY_THRESHOLD_METERS) {
              setAguardandoGPS(false);
            }

            // 2. Lógica de Animar o Mapa (Evita que o mapa fique "tremendo" com atualizações ruins)
            if (accuracy < bestAccuracy.current) {
              bestAccuracy.current = accuracy;

              // Só move a câmera se a precisão for aceitável
              if (accuracy <= ACCURACY_THRESHOLD_METERS || !aguardandoGPS) {
                mapRef.current?.animateToRegion(
                  {
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                  },
                  500,
                );
              }
            }
          }
        },
      );
    })();

    return () => {
      subscription?.remove();
    };
  }, []);

  if (erro) return <Text style={{ padding: 20 }}>{erro}</Text>;
  if (!location) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  const coordinate = {
    latitude: location.latitude,
    longitude: location.longitude,
  };

  return (
    <View style={styleMap.mapContainer}>
      {/* Debug */}
      <View
        style={{
          position: "absolute",
          top: 50,
          left: 10,
          right: 10,
          backgroundColor: aguardandoGPS
            ? "rgba(180,80,0,0.8)"
            : "rgba(0,0,0,0.6)",
          borderRadius: 8,
          padding: 8,
          zIndex: 999,
        }}
      >
        <Text style={{ color: "#fff", fontFamily: "monospace", fontSize: 12 }}>
          {aguardandoGPS ? "⏳ Aguardando GPS travar...\n" : "✅ GPS travado\n"}
          Lat: {location.latitude.toFixed(7)}
          {"\n"}
          Lon: {location.longitude.toFixed(7)}
          {"\n"}
          Precisão: {location.accuracy?.toFixed(1)}m{"\n"}
          {new Date().toLocaleTimeString()}
          {"\n"}
          Mapa: {mapaCarregado ? "✅ carregado" : "⏳ carregando..."}
        </Text>
      </View>

      <MapView
        ref={mapRef}
        style={styleMap.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          ...coordinate,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        showsUserLocation={false}
        followsUserLocation={false}
        onMapReady={() => setMapaCarregado(true)}
      >
        <Marker coordinate={coordinate} title="Você está aqui" />
      </MapView>
    </View>
  );
}
