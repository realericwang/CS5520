import { View, Button, StyleSheet, Alert, Image } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export default function ImageManager({ onImageTaken }) {
  const [response, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageUri, setImageUri] = useState(null);

  async function verifyPermission() {
    try {
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
    } catch (err) {
      console.log("Error verifying permission:", err);
      return false;
    }
  }

  const takeImageHandler = async () => {
    try {
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
        const uri = result.assets[0].uri;
        console.log("Image captured:", uri);
        setImageUri(uri);
        onImageTaken(uri);
      }
    } catch (err) {
      console.log("Error taking picture:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Take Picture" onPress={takeImageHandler} />
      {imageUri && (
        <View style={styles.imagePreview}>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    alignItems: "center",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    overflow: "hidden",
  },
  image: {
    width: 100,
    height: 100,
  },
});
