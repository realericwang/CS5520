import { StyleSheet, View } from "react-native";
import React from "react";
import MapView from "react-native-maps";

export default function Map({ route }) {
  const { latitude, longitude } = route.params || {
    latitude: 42.3398,
    longitude: -71.0892,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
