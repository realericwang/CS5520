import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function GoalItem({ text }) {
  return (
    <View style={styles.goalItem}>
      <Text style={styles.goalText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  goalItem: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  goalText: {
    fontSize: 18,
    color: "black",
  },
});
