import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import React from "react";

const windowWidth = Dimensions.get("window").width;

export default function Header({ title }) {
  const { width, height } = useWindowDimensions();
  const paddingVerticalDynamic = height < 415 ? 0 : 10;

  return (
    <View style={[styles.header, { paddingVertical: paddingVerticalDynamic }]}>
      <Text style={styles.headerText}>Welcome to {title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingHorizontal: windowWidth < 380 ? 10 : 20,
    backgroundColor: "#f0f0f0",
  },
  headerText: {
    fontSize: windowWidth < 380 ? 20 : 26,
    color: "red",
  },
});
