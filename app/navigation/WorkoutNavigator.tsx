import { createStackNavigator } from "@react-navigation/stack";
import RoutinesScreen from "../screens/RoutinesScreen";
import RoutineDetailsScreen from "../screens/RoutineDetailsScreen";
import ExercisesScreen from "../screens/ExercisesScreen";
import MuscleGroupsScreen from "../screens/MuscleGroupsScreen";
import ExerciseDetailsScreen from "../screens/ExerciseDetailsScreen";
import EditRoutineScreen from "../screens/EditRoutineScreen";
import CreateRoutine from "../features/CreateRoutine";

const Stack = createStackNavigator();

function WorkoutNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Routines" component={RoutinesScreen} />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="MyModal" component={ExercisesScreen} />
      </Stack.Group>
      <Stack.Screen name="RoutineDetails" component={RoutineDetailsScreen} />
      <Stack.Screen name="EditRoutine" component={EditRoutineScreen} />
      <Stack.Screen name="MuscleGroups" component={MuscleGroupsScreen} />
      <Stack.Screen name="Exercises" component={ExercisesScreen} />
      <Stack.Screen name="ExerciseDetails" component={ExerciseDetailsScreen} />
    </Stack.Navigator>
  );
}

export default WorkoutNavigator;
