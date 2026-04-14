import { Button, ScrollView, Text, View } from "react-native";

import { useRouter } from "expo-router";

import { Map } from "@/components/Map/Map";
import { styleIndex } from "./styles/styleContainer";

function Index() {
  const router = useRouter();

  return (
    <ScrollView>
      <View style={styleIndex.container}>
        <Text style={styleIndex.title}> ROTACRIC </Text>
        <Text style={styleIndex.subtitle}>
          Explore a Rota Cicloturística da Região Imperial Carbonífera!
        </Text>

        <Map />

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

export default Index;
