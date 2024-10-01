import React from "react";
import Home from "./Components/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GoalDetails from "./Components/GoalDetails";
import { Button } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerStyle: { backgroundColor: "purple" },
            headerTintColor: "white",
            title: "My Goals",
          }}
        />
        <Stack.Screen
          name="Details"
          component={GoalDetails}
          options={({ route }) => {
            return {
              title: route.params ? route.params.goalData.text : "More Details",
              headerRight: () => {
                return (
                  <Button
                    title="Warning"
                    onPress={() => {
                      console.log("warning");
                    }}
                  />
                );
              },
            };
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
