import { View, Button, StyleSheet, Alert } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";

export default function ImageManager() {
  const [response, requestPermission] = ImagePicker.useCameraPermissions();
  async function verifyPermission() {
    //check if permission is granted. if not, request permission
    if (!response || !response.granted) {
      const permissionResponse = await requestPermission();
      if (!permissionResponse.granted) {
        Alert.alert(
          "Permission Required",
          "You need to grant camera permissions to use this feature.",
        );
        return false;
      }
    }
    return true;
  }

  const takeImageHandler = async () => {
    try {
      // only take image if permission is granted
      const hasPermission = await verifyPermission();
      console.log("hasPermission", hasPermission);
      if (!hasPermission) {
        Alert.alert(
          "Permission Denied",
          "You need to grant camera permissions to use this feature.",
        );
        return;
      }
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
      });

      if (!result.canceled) {
        console.log("Image captured:", result.assets[0]);
      }
    } catch (err) {
      console.log("Error taking picture:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Take Picture" onPress={takeImageHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    alignItems: "center",
  },
});
