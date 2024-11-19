import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  Button,
  SafeAreaView,
  View,
  FlatList,
  Alert,
} from "react-native";
import Header from "./Header";
import Input from "./Input";
import { useState, useEffect, useLayoutEffect } from "react";
import GoalItem from "./GoalItem";
import PressableButton from "./PressableButton";
import {
  addToDB,
  deleteFromDB,
  deleteAllFromDB,
} from "../Firebase/firestoreHelper";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { database } from "../Firebase/firebaseSetup";
import { AntDesign } from "@expo/vector-icons";
import { auth } from "../Firebase/firebaseSetup";
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../Firebase/firebaseSetup";
import * as Notifications from 'expo-notifications';

export default function Home({ navigation }) {
  const [goals, setGoals] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const appName = "React Native NEU 5520";

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableButton
          pressedHandler={() => navigation.navigate("Profile")}
          componentStyle={styles.profileButton}
        >
          <AntDesign name="user" size={24} color="white" />
        </PressableButton>
      ),
    });
  }, [navigation]);

  // fetch goals from firestore
  useEffect(() => {
    try {
      const unsubscribe = onSnapshot(
        query(
          collection(database, "goals"),
          where("owner", "==", auth.currentUser?.uid),
        ),
        (querySnapshot) => {
          let newArray = [];
          querySnapshot.forEach((docSnapshot) => {
            newArray.push({
              text: docSnapshot.data().text,
              id: docSnapshot.id,
            });
          });
          setGoals(newArray);
        },
        (error) => {
          console.error("Firestore subscription error:", error);
          Alert.alert(
            "Error",
            error.code === "permission-denied"
              ? "You don't have permission to view goals. Please make sure you're logged in."
              : "Failed to load goals. Please try again later.",
          );
        },
      );

      return () => unsubscribe();
    } catch (error) {
      console.error("Firestore setup error:", error);
      Alert.alert(
        "Error",
        "Failed to connect to the database. Please check your connection.",
      );
    }
  }, []);

  useEffect(() => {
    const getNotificationToken = async () => {
      try {
        const { status } = await Notifications.getPermissionsAsync();
        if (status !== 'granted') {
          const { status: newStatus } = await Notifications.requestPermissionsAsync();
          if (newStatus !== 'granted') {
            Alert.alert(
              'Permission Required',
              'Push notifications are required for this feature'
            );
            return;
          }
        }

        const tokenData = await Notifications.getExpoPushTokenAsync({
          projectId: process.env.EXPO_PUBLIC_PROJECT_ID
        });
        console.log('Expo Push Token:', tokenData.data);
        
        // Here store the token 
        
      } catch (error) {
        console.error('Error getting push token:', error);
        Alert.alert(
          'Error',
          'Failed to set up push notifications. Please try again later.'
        );
      }
    };

    // getNotificationToken();
  }, []);

  const handleInputData = async (inputData) => {
    if (!auth.currentUser) {
      Alert.alert("Error", "You must be logged in to add goals");
      return;
    }

    let imageUri = null;
    
    // Handle image upload if imageUri exists
    if (inputData.imageUri) {
      try {
        const response = await fetch(inputData.imageUri);
        const blob = await response.blob();
        
        const imageName = inputData.imageUri.substring(inputData.imageUri.lastIndexOf('/') + 1);
        const imageRef = ref(storage, `images/${imageName}`);
        const uploadResult = await uploadBytesResumable(imageRef, blob);
        
        imageUri = uploadResult.metadata.fullPath;
      } catch (error) {
        console.error("Error uploading image:", error);
        Alert.alert("Error", "Failed to upload image. Please try again.");
        return;
      }
    }

    const newGoal = {
      text: inputData.text,
      imageUri: imageUri,
      owner: auth.currentUser.uid,
      createdAt: new Date().toISOString(),
    };

    try {
      await addToDB("goals", newGoal);
      setIsModalVisible(false);
      console.log("Goal added to database:", newGoal);
    } catch (error) {
      console.error("Error adding goal to database:", error);
      Alert.alert(
        "Error",
        error.code === "permission-denied"
          ? "You don't have permission to add goals"
          : "Failed to add goal. Please try again.",
      );
    }
  };

  const handleModalDismiss = () => {
    setIsModalVisible(false);
  };

  function handleDelete(id) {
    // setGoals((currentGoals) => currentGoals.filter((goal) => goal.id !== id));
    deleteFromDB(id, "goals");
    console.log("Goal deleted:", id);
  }

  const handleDeleteAll = () => {
    Alert.alert(
      "Delete All Goals",
      "Are you sure you want to delete all goals?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          onPress: () => {
            deleteAllFromDB("goals");
            console.log("All goals deleted");
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <Header title={appName}>
          <Text style={styles.childText}>Child Component</Text>
        </Header>
        <View style={styles.buttonContainer}>
          <PressableButton
            componentStyle={styles.addGoalButton}
            pressedHandler={() => setIsModalVisible(true)}
            pressedStyle={styles.pressedAddGoalButton}
          >
            <Text style={styles.addGoalButtonText}>Add a goal</Text>
          </PressableButton>
        </View>
      </View>
      <View style={styles.bottomView}>
        <FlatList
          contentContainerStyle={styles.scrollViewContainer}
          data={goals}
          renderItem={({ item, index, separators }) => (
            <GoalItem
              item={item}
              onDelete={handleDelete}
              onPressIn={() => separators.highlight()}
              onPressOut={() => separators.unhighlight()}
            />
          )}
          ItemSeparatorComponent={({ highlighted }) => (
            <ItemSeparator highlighted={highlighted} />
          )}
          ListEmptyComponent={
            <Text style={styles.emptyListText}>No goals to show</Text>
          }
          ListHeaderComponent={
            goals.length > 0 ? (
              <View style={styles.headerContainer}>
                <Text style={styles.headerText}>My Goals</Text>
              </View>
            ) : null
          }
          ListFooterComponent={
            goals.length > 0 ? (
              <View style={styles.footerContainer}>
                <Button
                  title="Delete All"
                  onPress={handleDeleteAll}
                  color="red"
                />
              </View>
            ) : null
          }
        />
      </View>
      <Input
        autoFocus={true}
        inputHandler={handleInputData}
        onDismiss={handleModalDismiss}
        visible={isModalVisible}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const ItemSeparator = ({ highlighted }) => (
  <View style={styles.separatorContainer}>
    <View
      style={[styles.separator, highlighted && styles.highlightedSeparator]}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  bottomView: {
    flex: 4,
    backgroundColor: "#d39248",
    padding: 20,
  },
  buttonContainer: {
    width: "30%",
    marginVertical: 20,
  },
  scrollViewContainer: {
    backgroundColor: "#d39248",
    padding: 20,
    alignItems: "center",
  },
  emptyListText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
    fontStyle: "italic",
  },
  headerContainer: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#4a69bd",
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4a69bd",
    textAlign: "left",
  },
  footerContainer: {
    marginTop: 20,
    width: "100%",
  },
  separatorContainer: {
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  separator: {
    height: 10,
    width: 100,
    backgroundColor: "gray",
  },
  addGoalButton: {
    backgroundColor: "#4a69bd",
    padding: 10,
    borderRadius: 5,
  },
  pressedAddGoalButton: {
    backgroundColor: "#1e3799",
  },
  addGoalButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  highlightedSeparator: {
    backgroundColor: "#4a69bd",
  },
  profileButton: {
    marginRight: 10,
    backgroundColor: "transparent",
  },
});
