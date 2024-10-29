import { StyleSheet, Text, View, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import PressableButton from "./PressableButton";
import { login } from "../Firebase/authHelper";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsLoading(true);
    const { user, error } = await login(email, password);
    setIsLoading(false);

    if (error) {
      Alert.alert("Error", error);
      return;
    }

    // Clear form and navigate to Home
    setEmail("");
    setPassword("");
    navigation.replace("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!isLoading}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!isLoading}
      />
      <View style={styles.buttonContainer}>
        <PressableButton
          pressedHandler={handleLogin}
          componentStyle={[styles.button, isLoading && styles.buttonDisabled]}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Logging in..." : "Login"}
          </Text>
        </PressableButton>
        <Text
          style={styles.linkText}
          onPress={() => navigation.navigate("Signup")}
        >
          Don't have an account? Sign up
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#4a69bd",
    padding: 15,
    borderRadius: 6,
    width: "100%",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkText: {
    color: "#4a69bd",
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "#a5a5a5",
  },
});
