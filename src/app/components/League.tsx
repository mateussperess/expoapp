import { Image, StyleSheet, Text, View } from "react-native";

export type LeagueProps = {
  id: number;
  name: string;
  localizedName: string;
  ccode: string;
  logo: string;
};

function League({ data }: { data: LeagueProps }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: data.logo }} style={{ width: 100, height: 100 }} />
      <Text style={styles.leagueName}>{data.name}</Text>
      <Text style={styles.leagueCcode}>{data.ccode}</Text>
    </View>
  );
}

export default League;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "blue",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 15,
    margin: 5,
  },
  leagueName: {
    color: "white",
    fontWeight: 500,
  },
  leagueCcode: {
    color: "#989898",
    fontStyle: "italic",
  },
});
