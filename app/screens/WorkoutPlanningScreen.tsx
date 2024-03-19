import React, { useState } from "react";
import { View, StyleSheet, Text, Button, Modal, Alert } from "react-native";
import ExercisesScreen from "./ExercisesScreen";

interface WorkoutPlanningScreenProps {
  navigation: any;
}

function WorkoutPlanningScreen({
  navigation,
}: WorkoutPlanningScreenProps): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Text>Plan Workout</Text>
      <Button
        title="Add Exercises"
        onPress={() => navigation.navigate("Exercises")}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <Button title="Close" onPress={() => setModalVisible(!modalVisible)} />
        <ExercisesScreen />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default WorkoutPlanningScreen;
