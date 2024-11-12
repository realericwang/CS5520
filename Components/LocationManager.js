import { View, Button, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import * as Location from "expo-location";

export default function LocationManager() {
  const [isLocating, setIsLocating] = useState(false);
  const [response, requestPermission] = Location.useForegroundPermissions();

  async function verifyPermission() {
    try {
      if (!response || !response.granted) {
        const permissionResponse = await requestPermission();
        if (!permissionResponse.granted) {
          Alert.alert(
            "Permission Required",
            "You need to grant location permissions to use this feature."
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

  const locateUserHandler = async () => {
    try {
      setIsLocating(true);
      const hasPermission = await verifyPermission();
      
      if (!hasPermission) {
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      
      Alert.alert(
        "Location Found",
        `Latitude: ${location.coords.latitude}\nLongitude: ${location.coords.longitude}`
      );
    } catch (err) {
      console.error("Error getting location:", err);
      Alert.alert(
        "Error",
        "Failed to get location. Please check your settings and try again."
      );
    } finally {
      setIsLocating(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button 
        title={isLocating ? "Getting Location..." : "Get Current Location"} 
        onPress={locateUserHandler}
        disabled={isLocating}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
  },
});
