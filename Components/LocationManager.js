import { View, Button, StyleSheet, Alert, Image } from "react-native";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import { auth } from "../Firebase/firebaseSetup";
import { saveUserLocation, getUserLocation } from "../Firebase/firestoreHelper";

export default function LocationManager({ navigation, route }) {
  const [isLocating, setIsLocating] = useState(false);
  const [location, setLocation] = useState(null);
  const [response, requestPermission] = Location.useForegroundPermissions();

  const mapsApiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    async function fetchSavedLocation() {
      if (auth.currentUser) {
        const savedLocation = await getUserLocation(auth.currentUser.uid);
        if (savedLocation) {
          setLocation(savedLocation);
        }
      }
    }

    if (route?.params?.selectedLocation) {
      setLocation(route.params.selectedLocation);
    } else {
      fetchSavedLocation();
    }
  }, [route?.params?.selectedLocation]);

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

  const saveLocationHandler = async () => {
    if (!location) {
      Alert.alert("Error", "Please get your location first");
      return;
    }

    if (!auth.currentUser) {
      Alert.alert("Error", "You must be logged in to save your location");
      return;
    }

    const success = await saveUserLocation(auth.currentUser.uid, location);
    
    if (success) {
      Alert.alert("Success", "Location saved successfully");
    } else {
      Alert.alert("Error", "Failed to save location");
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title={isLocating ? "Getting Location..." : "Get Current Location"}
        onPress={locateUserHandler}
        disabled={isLocating}
      />
      <View style={styles.buttonSpacer} />
      <Button
        title="Let me choose on the map"
        onPress={() => navigation.navigate("Map")}
      />
      {location && (
        <>
          <Image
            style={styles.map}
            source={{
              uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${mapsApiKey}`,
            }}
          />
          <View style={styles.buttonContainer}>
            <Button
              title="Open in Map"
              onPress={() =>
                navigation.navigate("Map", {
                  latitude: location.latitude,
                  longitude: location.longitude,
                })
              }
            />
            <View style={styles.buttonSpacer} />
            <Button 
              title="Save Location" 
              onPress={saveLocationHandler}
            />
          </View>
        </>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
  },
  buttonSpacer: {
    height: 10,
  }
});
