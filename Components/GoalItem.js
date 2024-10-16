import React from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PressableButton from "./PressableButton";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function GoalItem({ item, onDelete, onPressIn, onPressOut }) {
  const navigation = useNavigation();

  const handleDelete = () => {
    onDelete(item.id);
  };

  function handlePress() {
    navigation.navigate("Details", { goalData: item });
  }

  const handleLongPress = () => {
    Alert.alert(
      "Delete Goal",
      `Are you sure you want to delete the goal "${item.text}"?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: handleDelete, style: "destructive" },
      ],
    );
  };

  return (
    <View style={styles.textContainer}>
      <Pressable
        onPress={handlePress}
        onLongPress={handleLongPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
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
