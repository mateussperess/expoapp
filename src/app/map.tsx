import * as Location from "expo-location";
import { LocationObjectCoords } from "expo-location";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";

function Map() {

  const [location, setLocation] = useState<LocationObjectCoords | null>(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErro('Permissao negada, nao rolou');
        return;
      }

      // const loc = await Location.getCurrentPositionAsync({
      //   accuracy: Location.Accuracy.High,
      // });

      const subscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 3 }, 
        (loc) => setLocation(loc.coords)
      );

      // setLocation(loc.coords);
      return () => subscription.remove();
    })();
  }, []);

  if (erro) return <Text>{erro}</Text>;
  if (!location) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  const region = {
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapa}
        provider={PROVIDER_DEFAULT}
        initialRegion={region}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        <Marker coordinate={region} title="Você está aqui" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: 400, width: '100%' },
  mapa: { flex: 1 },
});

export default Map;