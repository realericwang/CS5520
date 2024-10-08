import React from "react";
import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function GoalItem({ item, onDelete }) {
  const navigation = useNavigation();

  const handleDelete = () => {
    onDelete(item.id);
  };

  function handlePress() {
    navigation.navigate("Details", { goalData: item });
  }

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{item.text}</Text>
        <Button title="X" color="grey" onPress={handleDelete} />
      </View>
    </Pressable>
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
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
});
