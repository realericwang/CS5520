import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PressableButton from "./PressableButton";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function GoalItem({ item, onDelete }) {
  const navigation = useNavigation();

  const handleDelete = () => {
    onDelete(item.id);
  };

  function handlePress() {
    navigation.navigate("Details", { goalData: item });
  }

  return (
    <View style={styles.textContainer}>
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [
          styles.pressable,
          pressed && styles.pressedItem,
        ]}
        android_ripple={{ color: "#dddddd" }}
      >
        <Text style={styles.text}>{item.text}</Text>
      </Pressable>
      <PressableButton
        componentStyle={styles.deleteButton}
        pressedHandler={handleDelete}
        pressedStyle={styles.pressedDelete}
      >
        <MaterialCommunityIcons name="delete-outline" size={24} color="black" />
      </PressableButton>
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
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  pressable: {
    padding: 10,
  },
  pressedItem: {
    opacity: 0.5,
  },
  deleteButton: {
    backgroundColor: "grey",
    borderRadius: 5,
    padding: 5,
    marginLeft: 10,
  },
  pressedDelete: {
    opacity: 0.6,
  },
});
