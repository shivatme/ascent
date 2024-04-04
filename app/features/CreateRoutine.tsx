import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  TextInput,
  Pressable,
  Dimensions,
  Text,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";

interface CreateRoutineProps {
  onClose: Function;
  onSubmit: Function;
}
const screenHeight = Dimensions.get("window").height;
function CreateRoutine({ onClose, onSubmit }: CreateRoutineProps): JSX.Element {
  const [routineName, setRoutineName] = useState("");
  const [day, setday] = useState(0);
  function handleSubmit() {
    if (routineName) {
      onSubmit(routineName, days[day]);
    } else showToast();
  }

  const showToast = () => {
    ToastAndroid.show("Input Error: Name", ToastAndroid.SHORT);
  };

  const renderDays = (item: string, index: number) => {
    const handlePress = () => {
      setday(index);
    };

    return (
      <Pressable
        onPress={handlePress}
        style={[
          styles.dayContainer,
          index == day ? styles.selectedDay : styles.unselectedDay,
        ]}
      >
        <Text
          style={index == day ? styles.selectedText : styles.unselectedText}
        >
          {item}
        </Text>
      </Pressable>
    );
  };

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <View style={styles.modalContainer}>
      <Pressable style={styles.modalContainer1} onPress={() => onClose()} />
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Ionicons
            name="close"
            size={30}
            color="black"
            onPress={() => onClose()}
          />
          <Text>Create Routine</Text>

          <MaterialIcons
            name="done"
            size={30}
            color="black"
            onPress={handleSubmit}
          />
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Name"
          value={routineName}
          onChangeText={setRoutineName}
        />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          //   numColumns={2}
          data={days}
          renderItem={({ item, index }) => renderDays(item, index)}
        />
        {/* <Button title="Submit" onPress={() => onSubmit(routineName)} />
        <Button title="Close" onPress={() => onClose()} /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  textInput: {
    margin: 10,
    marginTop: 20,
    padding: 10,
    paddingHorizontal: 20,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalHeader: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  modalContainer1: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0)", // Semi-transparent background
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: screenHeight / 2, // Half the screen height
  },
  dayContainer: {
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    width: 70,
    borderRadius: 50,
  },
  selectedDay: {
    backgroundColor: "grey",
  },
  unselectedDay: {
    backgroundColor: "#1e1e1e",
  },
  selectedText: {
    color: "white",
  },
  unselectedText: {
    color: "white",
  },
});

export default CreateRoutine;
