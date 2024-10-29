import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { auth } from '../Firebase/firebaseSetup';
import { AntDesign } from "@expo/vector-icons";
import PressableButton from "./PressableButton";
import { logout } from '../Firebase/authHelper';

export default function Profile({ navigation }) {
  const currentUser = auth.currentUser;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableButton
          pressedHandler={async () => {
            const { error } = await logout();
            if (error) {
              console.error("Error signing out:", error);
            }
          }}
          componentStyle={styles.logoutButton}
        >
          <AntDesign name="logout" size={24} color="white" />
        </PressableButton>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{currentUser?.email}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>User ID:</Text>
        <Text style={styles.value}>{currentUser?.uid}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  infoContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    fontWeight: "500",
  },
  logoutButton: {
    marginRight: 10,
    backgroundColor: 'transparent',
  }
});
