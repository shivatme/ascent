// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import HomeScreen from "../screens/RoutinesScreen";
// import AnalyticsScreen from "../screens/Unused/AnalyticsScreen";
// import ExercisesScreen from "../screens/ExercisesScreen";
// import SettingsScreen from "../screens/Unused/SettingsScreen";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import BodyDataScreen from "../screens/Unused/BodyDataScreen";
// import CalendarScreen from "../screens/Unused/CalendarScreen";
// import EditRoutineScreen from "../screens/EditRoutineScreen";
// import MuscleGroupsScreen from "../screens/MuscleGroupsScreen";
// import ExerciseDetailsScreen from "../screens/ExerciseDetailsScreen";
// import RoutineDetailsScreen from "../screens/RoutineDetailsScreen";
// import WorkoutNavigator from "./WorkoutNavigator";

// const Tab = createBottomTabNavigator();

// function AppNavigator(): JSX.Element {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: {
//           backgroundColor: "#212a31",
//           borderWidth: 0,
//           borderColor: "#212a31",
//         },
//         tabBarHideOnKeyboard: true,
//       }}
//     >
//       <Tab.Screen
//         name="Home"
//         component={WorkoutNavigator}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons
//               name="home-variant"
//               size={size}
//               color={color}
//             />
//           ),
//         }}
//       />

//       <Tab.Screen
//         name="Exercises"
//         component={MuscleGroupsScreen}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons name="dumbbell" size={size} color={color} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

// export default AppNavigator;
