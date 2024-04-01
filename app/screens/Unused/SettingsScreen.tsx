// import React, { useState } from "react";
// import { View, StyleSheet, Text, Switch } from "react-native";

// interface SettingsScreenProps {}

// function SettingsScreen(props: SettingsScreenProps): JSX.Element {
//   const [isEnabled, setIsEnabled] = useState(false);

//   return (
//     <View style={styles.container}>
//       <Text>Settings</Text>
//       <View style={{ backgroundColor: isEnabled ? "red" : "white" }}>
//         <View style={styles.reminders}>
//           <Text>Enable Reminders</Text>
//           <Switch
//             value={isEnabled}
//             onValueChange={() => setIsEnabled(!isEnabled)}
//           />
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {},
//   reminders: {
//     flexDirection: "row",
//   },
// });

// export default SettingsScreen;
