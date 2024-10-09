import React from "react";
import { Pressable, View, StyleSheet } from "react-native";

export default function PressableButton({
  children,
  componentStyle,
  pressedHandler,
  pressedStyle,
}) {
  return (
    <Pressable
      onPress={pressedHandler}
      style={({ pressed }) => [
        styles.defaultStyle,
        componentStyle,
        pressed && pressedStyle,
      ]}
    >
      <View>{children}</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  defaultStyle: {
    backgroundColor: "beige",
  },
});
