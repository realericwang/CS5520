import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";

export default function Map({ route }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { latitude, longitude } = route.params || {
    latitude: 42.3398,
    longitude: -71.0892,
  };

  return (
    <View style={styles.container}>
      <MapView
        onPress={(e) => {
          setSelectedLocation({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          });
        }}
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {selectedLocation && (
          <Marker
            coordinate={selectedLocation}
            title="Selected Location"
            description="The selected location"
          />
        )}
      </MapView>
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
