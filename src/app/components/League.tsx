import { LeagueProps } from "@/types/League.types";

import { Image, Text, View } from "react-native";
import { styleLeague } from "../styles/styleLeague";

function League({ data }: { data: LeagueProps }) {
  return (
    <View style={styleLeague.container}>
      <Image source={{ uri: data.logo }} style={{ width: 100, height: 100 }} />
      <Text style={styleLeague.leagueName}>{data.name}</Text>
      <Text style={styleLeague.leagueCcode}>{data.ccode}</Text>
    </View>
  );
}

export default League;
