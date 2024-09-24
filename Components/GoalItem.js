import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default function GoalItem({ item, onDelete }) {
  const handleDelete = () => {
    onDelete(item.id);
  };

  return (
    <View style={styles.goalItem}>
      <Text style={styles.goalText}>{item.text}</Text>
      <Button title="X" onPress={handleDelete} />
    </View>
  );
}

const styles = StyleSheet.create({
  goalItem: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  goalText: {
    fontSize: 18,
    color: "black",
  },
});
