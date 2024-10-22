import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import {
  addToSubcollection,
  getSubcollectionDocs,
} from "../Firebase/firestoreHelper";

const GoalUsers = ({ goalId }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Check if users data exists in the subcollection
        const existingUsers = await getSubcollectionDocs(
          "goals",
          goalId,
          "users",
        );

        if (existingUsers.length > 0) {
          setUsers(existingUsers);
        } else {
          // If no data in subcollection, fetch from API
          const response = await fetch(
            "https://jsonplaceholder.typicode.com/users",
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();

          // Add fetched data to the subcollection
          for (const user of data) {
            await addToSubcollection("goals", goalId, "users", user);
          }

          setUsers(data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users. Please try again later.");
      }
    };

    fetchUsers();
  }, [goalId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Users Associated with this Goal:</Text>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text style={styles.userItem}>{item.name}</Text>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  userItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});

export default GoalUsers;
