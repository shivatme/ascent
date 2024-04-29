import React from "react";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import { TouchableOpacity } from "react-native";

function Icon({
  name = "home",
  size = 40,
  backgroundColor = colors.light,
  iconColor = colors.dark,
  onPress,
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MaterialCommunityIcons
          name={name}
          color={iconColor}
          size={size * 0.5}
        />
      </View>
    </TouchableOpacity>
  );
}

export default Icon;
