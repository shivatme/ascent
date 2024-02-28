import React, { ReactNode } from "react";
import { Text, TextStyle } from "react-native";

import defaultStyles from "../config/styles";

interface AppTextProps {
  children: ReactNode;
  style?: TextStyle;
}

function AppText({
  children,
  style,
  ...otherProps
}: AppTextProps): JSX.Element {
  return (
    <Text style={[defaultStyles.text, style]} {...otherProps}>
      {children}
    </Text>
  );
}

export default AppText;
