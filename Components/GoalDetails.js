import { StyleSheet, Text, View,Button } from "react-native";
import React, { useState, useEffect } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import PressableButton from './PressableButton';

export default function GoalDetails({ navigation, route }) {
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableButton
          pressedHandler={toggleWarning}
          componentStyle={{ marginRight: 10 }}
        >
          {isWarning ? (
            <Text>Normal</Text>
          ) : (
            <AntDesign name="warning" size={24} color="red" />
          )}
        </PressableButton>
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
        <PressableButton
          pressedHandler={toggleWarning}
          componentStyle={{ marginRight: 10 }}
        >
          {isWarning ? (
            <AntDesign name="warning" size={24} color="red" />
          ) : (
            <Text>Normal</Text>
          )}
        </PressableButton>
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
