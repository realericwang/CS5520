import {
  Alert,
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getUserLocation, saveUserLocation } from "../Firebase/firestoreHelper";
import { auth } from "../Firebase/firebaseSetup";

const windowWidth = Dimensions.get("window").width;

export default function LocationManager() {
  const navigation = useNavigation();
  const route = useRoute();
  const [location, setLocation] = useState(null);
  const [response, requestPermission] = Location.useForegroundPermissions();

  useEffect(() => {
    async function fetchLocation() {
      const locationData = await getUserLocation(auth.currentUser.uid);
      if (locationData) {
        setLocation(locationData);
      }
    }
    fetchLocation();
  }, []);

  useEffect(() => {
    if (route.params?.selectedLocation) {
      setLocation(route.params.selectedLocation);
    }
  }, [route]);

  async function saveLocationHandler() {
    try {
      if (!location) {
        Alert.alert("Error", "No location selected");
        return;
      }

      const success = await saveUserLocation(auth.currentUser.uid, location);

      if (success) {
        Alert.alert("Success", "Location saved successfully");
        navigation.navigate("Home");
      } else {
        Alert.alert("Error", "Failed to save location");
      }
    } catch (error) {
      console.error("Error saving location:", error);
      Alert.alert("Error", "An error occurred while saving location");
    }
  }

  async function verifyPermission() {
    try {
      if (response.granted) {
        return true;
      }
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    } catch (err) {
      console.log("verify permission ", err);
      return false;
    }
  }

  async function locateUserHandler() {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        Alert.alert("You need to give location permission");
        return;
      }
      const response = await Location.getCurrentPositionAsync();
      setLocation({
        latitude: response.coords.latitude,
        longitude: response.coords.longitude,
      });
    } catch (err) {
      console.log("locate user ", err);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Locate Me" onPress={locateUserHandler} />
        <Button
          title="Choose on Map"
          onPress={() => navigation.navigate("Map")}
        />
        {location && (
          <Button title="Save Location" onPress={saveLocationHandler} />
        )}
      </View>

      {location && (
        <View style={styles.mapContainer}>
          <Image
            style={styles.mapImage}
            source={{
              uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`,
            }}
          />
          <Text style={styles.coordinatesText}>
            Latitude: {location.latitude.toFixed(4)}
            {"\n"}
            Longitude: {location.longitude.toFixed(4)}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "column",
    gap: 10,
    marginBottom: 20,
  },
  mapContainer: {
    width: windowWidth - 40,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 10,
  },
  mapImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  coordinatesText: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 16,
    color: "#666",
  },
});
