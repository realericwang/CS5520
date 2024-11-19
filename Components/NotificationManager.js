import { View, Button, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";

export default function NotificationManager() {
  const [permissionStatus, setPermissionStatus] = useState(false);

  useEffect(() => {
    checkNotificationPermission();
  }, []);

  const checkNotificationPermission = async () => {
    const settings = await Notifications.getPermissionsAsync();
    setPermissionStatus(settings.granted);

    if (!settings.granted) {
      const request = await Notifications.requestPermissionsAsync();
      setPermissionStatus(request.granted);
    }
  };

  const scheduleNotificationHandler = async () => {
    if (!permissionStatus) {
      Alert.alert(
        "Permission Required",
        "Please enable notifications in your device settings to use this feature.",
        [{ text: "OK" }]
      );
      return;
    }

    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Goal Reminder",
          body: "First goal reminder",
          data: { screen: "Home" },
        },
        trigger: {
          seconds: 3, 
        },
      });
      
      Alert.alert(
        "Success",
        "Reminder set successfully!",
        [{ text: "OK" }]
      );
      
      console.log("Scheduled notification:", notificationId);
    } catch (error) {
      console.error("Error scheduling notification:", error);
      Alert.alert(
        "Error",
        "Failed to set reminder. Please try again.",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Button 
        title={permissionStatus ? "Set Reminder" : "Enable Notifications"} 
        onPress={permissionStatus ? scheduleNotificationHandler : checkNotificationPermission}
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
