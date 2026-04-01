import { Image, Text, View } from "react-native";
import happyEaster from "../../../assets/images/happyeasterweek.png";
import easterStyle from "../styles/styleEaster";

function Easter() {
  return (
    <View style={easterStyle.container}>
      <Image source={happyEaster} />
      <Text style={easterStyle.text}>
        Isso aqui futuramente será o melhor app em React Native já feito no
        IFSUL
      </Text>
    </View>
  );
}

export default Easter;
