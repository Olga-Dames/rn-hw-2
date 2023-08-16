import MapView, { Marker } from "react-native-maps";
import { useEffect } from "react";

import {
  StyleSheet,
  View,
  Dimensions,
} from "react-native";

const MapScreen = ({ route, navigation }) => {
  const { longitude, latitude } = route.params.location
  useEffect(() => {
     navigation.setOptions({ tabBarStyle: { display: 'none' }})
  }, []);


  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        minZoomLevel={15}
      >
        <Marker title="I am here" coordinate={{ latitude, longitude }} />
      </MapView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});