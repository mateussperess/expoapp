import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { getPopularLeagues } from "./api/request";
import League, { LeagueProps } from "./components/League";

export default function Index() {
  const [leagues, setLeagues] = useState<LeagueProps[]>([]);

  useEffect(() => {
    fetchLeagues();
  }, []);

  const fetchLeagues = async () => {
    const data = await getPopularLeagues();
    setLeagues(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ligas de Futebol </Text>
      <Text style={styles.subtitle}>
        {" "}
        Veja as ligas mais populares do futebol mundial!
      </Text>

      <FlatList
        style={styles.list}
        numColumns={2}
        data={leagues}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <League data={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#333",
  },
  title: {
    fontSize: 26,
    marginTop: 50,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 16,
    color: "#939393",
  },
  list: {
    backgroundColor: "#f2f2f2",
    borderRadius: 15,
  },
});
