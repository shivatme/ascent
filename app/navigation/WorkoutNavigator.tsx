import { createStackNavigator } from "@react-navigation/stack";
import RoutinesScreen from "../screens/RoutinesScreen";
import RoutineDetailsScreen from "../screens/RoutineDetailsScreen";
import ExercisesScreen from "../screens/ExercisesScreen";
import MuscleGroupsScreen from "../screens/MuscleGroupsScreen";
import ExerciseDetailsScreen from "../screens/ExerciseDetailsScreen";

const Stack = createStackNavigator();

function WorkoutNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Routines" component={RoutinesScreen} />
      <Stack.Screen name="RoutineDetails" component={RoutineDetailsScreen} />
      <Stack.Screen name="MuscleGroups" component={MuscleGroupsScreen} />
      <Stack.Screen name="Exercises" component={ExercisesScreen} />
      <Stack.Screen name="ExerciseDetails" component={ExerciseDetailsScreen} />
    </Stack.Navigator>
  );
}

export default WorkoutNavigator;
