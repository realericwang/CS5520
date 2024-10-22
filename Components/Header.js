import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";

const { width } = Dimensions.get('window');

export default function Header({ title }) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Welcome to {title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingVertical: '5%',
    paddingHorizontal: '3%',
    backgroundColor: '#f0f0f0',
  },
  headerText: {
    fontSize: width * 0.05,
    color: "red",
  },
});
