import { StyleSheet } from "react-native";

export const styleLeague = StyleSheet.create({
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
    fontWeight: "500",
  },
  leagueCcode: {
    color: "#989898",
    fontStyle: "italic",
  },
});
