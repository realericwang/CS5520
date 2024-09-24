import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  Button,
  SafeAreaView,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import Header from "./Components/Header";
import Input from "./Components/Input";
import { useState } from "react";
import GoalItem from "./Components/GoalItem";

export default function App() {
  const [goals, setGoals] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const appName = "React Native NEU 5520";

  const handleInputData = (inputText) => {
    setGoals((currentGoals) => [
      ...currentGoals,
      { id: Math.random(), text: inputText },
    ]);
    setIsModalVisible(false);
    console.log("Goal added:", inputText);
  };

  const handleModalDismiss = () => {
    setIsModalVisible(false);
  };

  function handleDelete(id) {
    setGoals((currentGoals) => currentGoals.filter((goal) => goal.id !== id));
    console.log("Goal deleted:", id);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <Header title={appName}>
          <Text style={styles.childText}>Child Component</Text>
        </Header>
        <View style={styles.buttonContainer}>
          <Button title="Add a goal" onPress={() => setIsModalVisible(true)} />
        </View>
      </View>
      <View style={styles.bottomView}>
        {/* <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          {goals.map((goal) => (
            <View key={goal.id} style={styles.goalItem}>
              <Text style={styles.goalText}>{goal.text}</Text>
            </View>
          ))}
        </ScrollView> */}
        <FlatList
          contentContainerStyle={styles.scrollViewContainer}
          data={goals}
          renderItem={({ item }) => (
            <GoalItem item={item} onDelete={handleDelete} />
          )}
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
  childText: {
    fontSize: 16,
    marginTop: 10,
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
});
