import React from "react";
import { View, StyleSheet, Text } from "react-native";
import AppText from "./AppText";
import { TouchableOpacity } from "react-native-gesture-handler";

interface ListItem3Props {
  name: string;
  id: string;
  onPress?: Function;
  sets_data: string;
}

function ListItem3({
  name,
  id,
  onPress,
  sets_data,
}: ListItem3Props): JSX.Element {
  const sets = JSON.parse(sets_data);
  console.log(sets);
  return (
    <View style={styles.container}>
      <AppText numberOfLines={1} style={styles.name}>
        {name}
      </AppText>

      {sets &&
        Object.entries(sets).map(([setName, setCount]) => (
          <View key={setName} style={styles.box}>
            <Text>
              {setName}: {setCount}
            </Text>
          </View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // height: 40,
    borderWidth: 1,
    borderColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 3,
    paddingHorizontal: 8,
  },
  box: {
    width: 100,
    height: 50,
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
  },
  name: {
    textTransform: "capitalize",
  },
});

export default ListItem3;
