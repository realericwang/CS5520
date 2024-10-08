import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";

export default function GoalDetails({ navigation, route }) {
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title={isWarning ? "Normal" : "Warning"}
          onPress={toggleWarning}
          color={isWarning ? undefined : "red"}
        />
      ),
    });
  }, [isWarning, navigation]);

  function moreDetailsHandler() {
    navigation.push("Details");
  }

  function toggleWarning() {
    setIsWarning((prev) => !prev);
    navigation.setOptions({
      title: isWarning ? "More Details" : "Warning!",
      headerRight: () => (
        <Button
          title={isWarning ? "Warning" : "Normal"}
          onPress={toggleWarning}
          color={isWarning ? "red" : undefined}
        />
      ),
    });
  }

  return (
    <View>
      <Text style={[styles.text, isWarning && styles.warningText]}>
        {route.params
          ? `This is details of a goal with text ${route.params.goalData.text} and id ${route.params.goalData.id}`
          : "More details"}
      </Text>
      <Button title="More Details" onPress={moreDetailsHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
  warningText: {
    color: "red",
  },
});
