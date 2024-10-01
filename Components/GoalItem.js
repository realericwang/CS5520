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
      <Text style={styles.text}>{item.text}</Text>
      <Button title="X" color="grey" onPress={handleDelete} />
      <Button title="i" color="grey" onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "purple",
    padding: 5,
    fontSize: 30,
  },
  textContainer: {
    backgroundColor: "#aaa",
    borderRadius: 5,
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
});
