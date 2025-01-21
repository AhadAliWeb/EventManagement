import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Events from "./pages/Events";
import RegisteredEvents from "./pages/RegisteredEvents";
import FeedBack from "./pages/FeedBack";
import FeedbackList from "./pages/FeedBackList";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Events"
          component={Events}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisteredEvents"
          component={RegisteredEvents}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FeedBack"
          component={FeedBack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FeedbackList"
          component={FeedbackList}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
