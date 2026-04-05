import { LeagueProps } from "@/types/League.types";
import { useEffect, useState } from "react";
import { Button, FlatList, ScrollView, Text, View } from "react-native";
import { getPopularLeagues } from "./api/request";
import League from "./components/League";

import { useRouter } from "expo-router";
import Map from "./map";
import { styleIndex } from "./styles/styleContainer";

export default function Index() {
  const router = useRouter();
  const [leagues, setLeagues] = useState<LeagueProps[]>([]);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    fetchLeagues();
  }, []);

  const fetchLeagues = async () => {
    const data = await getPopularLeagues();
    setLeagues(data);
  };

  return (
    <ScrollView>
      <View style={styleIndex.container}>
        <Text style={styleIndex.title}>Ligas de Futebol </Text>
        <Text style={styleIndex.subtitle}>
          Veja as ligas mais populares do futebol mundial!
        </Text>

        <FlatList
          style={styleIndex.list}
          numColumns={2}
          data={leagues}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <League data={item} />}
          scrollEnabled={false}
        />

        <Button
          title={showMap ? "Ocultar mapa" : "VER MAPA"}
          onPress={() => setShowMap((prev) => !prev)}
          color="#f32c21"
        />

        {showMap && (
          <Map />
        )}

        <Button
          title="🐣"
          onPress={() => router.push("/easter")}
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    </ScrollView>
  );
}