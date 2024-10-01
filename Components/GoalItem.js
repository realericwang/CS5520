import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default function GoalItem({ item, onDelete, pressHandler }) {
  const handleDelete = () => {
    onDelete(item.id);
  };

  function handlePress() {
    // call a callbackfn received from parent
    // pass the goal obj back to Home.js
    pressHandler(item);
  }

  return (
    <View style={styles.textContainer}>
      <Text style={styles.text}>{goalObj.text}</Text>
      <Button title="X" color="grey" onPress={handleDelete} />
      <Button title="i" color="grey" onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  goalItem: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  goalText: {
    fontSize: 18,
    color: "black",
  },
});
