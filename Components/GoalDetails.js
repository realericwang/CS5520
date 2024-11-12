import { StyleSheet, Text, View, Button, Image } from "react-native";
import React, { useState, useEffect } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import PressableButton from "./PressableButton";
import { updateWarningInDB } from "../Firebase/firestoreHelper";
import { doc, onSnapshot } from "firebase/firestore";
import { database, storage } from "../Firebase/firebaseSetup";
import { getDownloadURL, ref } from "firebase/storage";
import GoalUsers from "./GoalUsers";

export default function GoalDetails({ navigation, route }) {
  const [isWarning, setIsWarning] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [goalData, setGoalData] = useState(route.params?.goalData);

  // Sync with route params
  useEffect(() => {
    if (route.params?.goalData) {
      setGoalData(route.params.goalData);
    }
  }, [route.params]);

  // Listen to Firestore updates
  useEffect(() => {
    if (!goalData?.id) return;

    const unsubscribe = onSnapshot(
      doc(database, "goals", goalData.id),
      (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setIsWarning(data.warning || false);
          setGoalData((prevData) => ({
            ...prevData,
            ...data,
          }));
        }
      },
    );

    return () => unsubscribe();
  }, [goalData?.id]);

  // Set up warning toggle in header
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
  }, [isWarning, navigation]);

  // Fetch image if available
  useEffect(() => {
    const fetchImage = async () => {
      if (goalData?.imageUri) {
        try {
          const reference = ref(storage, goalData.imageUri);
          const url = await getDownloadURL(reference);
          setImageUrl(url);
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      }
    };

    fetchImage();
  }, [goalData?.imageUri]);

  const moreDetailsHandler = () => {
    navigation.push("Details");
  };

  const toggleWarning = async () => {
    const newWarningState = !isWarning;
    setIsWarning(newWarningState);
    await updateWarningInDB("goals", goalData.id, newWarningState);
  };

  if (!goalData) {
    return (
      <View style={styles.container}>
        <Text>No goal data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.text, isWarning && styles.warningText]}>
        {`This is details of a goal with text ${goalData.text} and id ${goalData.id}`}
      </Text>
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="contain"
        />
      ) : goalData.imageUri ? (
        <Text>Loading image...</Text>
      ) : null}
      <Text style={styles.warningStatus}>
        Warning Status: {isWarning ? "Active" : "Inactive"}
      </Text>
      <Button title="More Details" onPress={moreDetailsHandler} />
      <GoalUsers goalId={goalData.id} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
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
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
});
