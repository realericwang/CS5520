import { StyleSheet, View, Button } from "react-native";
import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";

export default function Map({ route, navigation }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { latitude, longitude } = route.params || {
    latitude: 42.3398,
    longitude: -71.0892,
  };

  const handleLocationSelect = () => {
    navigation.navigate("Profile", {
      screen: "Profile",
      params: {
        selectedLocation: selectedLocation
      }
    });
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
      <View style={styles.buttonContainer}>
        <Button
          title="Confirm Location"
          onPress={handleLocationSelect}
          disabled={!selectedLocation}
        />
      </View>
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
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingHorizontal: 20,
  }
});
