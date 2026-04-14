import * as Location from "expo-location";
import { LocationObjectCoords } from "expo-location";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { styleMap } from "./styles";

export function Map() {
  const [location, setLocation] = useState<LocationObjectCoords | null>(null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErro("Permissão negada");
        return;
      }

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation, //* máxima precisão
          distanceInterval: 1, //* atualiza a cada 1m
          timeInterval: 1000, //* atualiza a cada 1s
        },
        (loc) => setLocation(loc.coords),
      );
    })();

    return () => subscription?.remove();
  }, []);

  if (erro) return <Text>{erro}</Text>;
  if (!location) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  const coordinate = {
    latitude: location.latitude,
    longitude: location.longitude,
  };

  const region = {
    ...coordinate,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  return (
    <View style={styleMap.mapContainer}>
      {/* debug - coordenadas na tela */}
      <View
        style={{
          position: "absolute",
          top: 50,
          left: 10,
          right: 10,
          backgroundColor: "rgba(0,0,0,0.6)",
          borderRadius: 8,
          padding: 8,
          zIndex: 999,
        }}
      >
        <Text style={{ color: "#fff", fontFamily: "monospace", fontSize: 12 }}>
          Lat: {location.latitude.toFixed(7)}
          {"\n"}
          Lon: {location.longitude.toFixed(7)}
          {"\n"}
          Precisão: {location.accuracy?.toFixed(1)}m{"\n"}
          {new Date().toLocaleTimeString()}
        </Text>
      </View>

      <MapView
        style={styleMap.map}
        provider={PROVIDER_DEFAULT}
        initialRegion={region}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        {/* Marker separado para o título — usando coordinate limpo */}
        <Marker coordinate={coordinate} title="Você está aqui" />
      </MapView>
    </View>
  );
}
