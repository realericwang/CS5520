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
import { useState, useEffect } from "react";
import GoalItem from "./GoalItem";
import PressableButton from "./PressableButton";
import { addToDB } from "../Firebase/firestoreHelper";
import { collection, onSnapshot } from "firebase/firestore";
import { database } from "../Firebase/firebaseSetup";
export default function Home({ navigation }) {
  const [goals, setGoals] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const appName = "React Native NEU 5520";

  // fetch goals from firestore
  useEffect(() => {
    onSnapshot(collection(database, "goals"), (querySnapshot) => {
      querySnapshot.forEach((docSnapshot) => {
        console.log(docSnapshot.data());
      });
    });
  }, []);

  const handleInputData = async (inputText) => {
    const newGoal = { text: inputText };
    try {
      await addToDB("goals", newGoal);
      setGoals((currentGoals) => [
        ...currentGoals,
        { id: Math.random(), text: inputText },
      ]);
      setIsModalVisible(false);
      console.log("Goal added to database:", inputText);
    } catch (error) {
      console.error("Error adding goal to database:", error);
      Alert.alert("Error", "Failed to add goal. Please try again.");
    }
  };

  const handleModalDismiss = () => {
    setIsModalVisible(false);
  };

  function handleDelete(id) {
    setGoals((currentGoals) => currentGoals.filter((goal) => goal.id !== id));
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
            setGoals([]);
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
});
