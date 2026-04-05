import { View } from "react-native";
import MapView from "react-native-maps";
import { styleMap } from "./styles/styleMap";

function Map() {
  return (
    <View style={styleMap.mapContainer}>
      <MapView
        style={styleMap.map}
        initialRegion={{
          latitude: -29.955,
          longitude: -51.625,
          latitudeDelta: 0.025,
          longitudeDelta: 0.025,
        }}
      />
    </View>
  );
}

export default Map;