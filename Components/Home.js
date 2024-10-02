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
import { useState } from "react";
import GoalItem from "./GoalItem";

export default function Home({ navigation }) {
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

  function handleGoalPress(pressedGoal) {
    //receive the goal obj
    console.log(pressedGoal);
    // navigate to GoalDetails and pass goal obj as params
    navigation.navigate("Details", { goalData: pressedGoal });
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
        <FlatList
          contentContainerStyle={styles.scrollViewContainer}
          data={goals}
          renderItem={({ item }) => (
            <GoalItem item={item} onDelete={handleDelete} />
          )}
          ItemSeparatorComponent={ItemSeparator}
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

const ItemSeparator = () => (
  <View style={styles.separatorContainer}>
    <View style={styles.separator} />
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
    backgroundColor: "#4a69bd",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
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
});
