import { StyleSheet, Text, View, Button } from "react-native";
import React, { useState, useEffect } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import PressableButton from "./PressableButton";
import { updateWarningInDB } from "../Firebase/firestoreHelper";
import { doc, onSnapshot } from "firebase/firestore";
import { database } from "../Firebase/firebaseSetup";

export default function GoalDetails({ navigation, route }) {
  const [isWarning, setIsWarning] = useState(false);
  const { goalData } = route.params;

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(database, "goals", goalData.id),
      (doc) => {
        if (doc.exists()) {
          setIsWarning(doc.data().warning || false);
        }
      },
    );

    return () => unsubscribe();
  }, [goalData.id]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableButton
          pressedHandler={toggleWarning}
          componentStyle={{ marginRight: 10 }}
        >
          <View style={styles.iconContainer}>
            <AntDesign
              name="warning"
              size={24}
              color={isWarning ? "red" : "green"}
            />
          </View>
        </PressableButton>
      ),
    });
  }, [isWarning, navigation, toggleWarning]);

  function moreDetailsHandler() {
    navigation.push("Details");
  }

  async function toggleWarning() {
    const newWarningState = !isWarning;
    setIsWarning(newWarningState);
    await updateWarningInDB("goals", goalData.id, newWarningState);
  }

  return (
    <View>
      <Text style={[styles.text, isWarning && styles.warningText]}>
        {`This is details of a goal with text ${goalData.text} and id ${goalData.id}`}
      </Text>
      <Text style={styles.warningStatus}>
        Warning Status: {isWarning ? "Active" : "Inactive"}
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
  iconContainer: {
    backgroundColor: "transparent",
  },
  warningStatus: {
    fontSize: 14,
    marginBottom: 10,
    fontStyle: "italic",
  },
});
