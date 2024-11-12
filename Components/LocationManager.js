import { View, Button, StyleSheet, Alert, Image } from "react-native";
import React, { useState } from "react";
import * as Location from "expo-location";

export default function LocationManager() {
  const [isLocating, setIsLocating] = useState(false);
  const [location, setLocation] = useState(null);
  const [response, requestPermission] = Location.useForegroundPermissions();

  const mapsApiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

  async function verifyPermission() {
    try {
      if (!response || !response.granted) {
        const permissionResponse = await requestPermission();
        if (!permissionResponse.granted) {
          Alert.alert(
            "Permission Required",
            "You need to grant location permissions to use this feature.",
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

      const locationResult = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLocation({
        latitude: locationResult.coords.latitude,
        longitude: locationResult.coords.longitude,
      });

      Alert.alert(
        "Location Found",
        `Latitude: ${locationResult.coords.latitude}\nLongitude: ${locationResult.coords.longitude}`,
      );
    } catch (err) {
      console.error("Error getting location:", err);
      Alert.alert(
        "Error",
        "Failed to get location. Please check your settings and try again.",
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
      {location && (
        <Image
          style={styles.map}
          source={{
            uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${mapsApiKey}`,
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
    width: "100%",
  },
  map: {
    width: "100%",
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
});