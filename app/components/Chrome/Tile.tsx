import React from "react";
import { StyleSheet, View } from "react-native";
import { MARGIN, SIZE } from "./Config";

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE / 3,
    padding: MARGIN * 2,
  },
  web: {
    flex: 1,
    backgroundColor: "#f0f4f5",
    borderRadius: MARGIN * 2,
    borderWidth: 1,
    borderColor: "black",
  },
});
interface TileProps {
  id: string;
  uri: string;
  onLongPress: () => void;
}

const Tile = ({ uri }: TileProps) => {
  return (
    <View style={styles.container} pointerEvents="none">
      <View style={styles.web} />
    </View>
  );
};

export default Tile;
