import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AddExpenseTab from "./src/tabs/add-expense-tab/add-expense-tab";
import HomeTab from "./src/tabs/home-tab/home-tab";

type RootTabParamList = {
  Despesas: undefined;
  Adicionar: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: "#2980B9",
            tabBarInactiveTintColor: "#95A5A6",
            tabBarStyle: {
              backgroundColor: "#FFFFFF",
              borderTopColor: "#E8E8E8",
              elevation: 8,
              shadowOpacity: 0.1,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: "600",
            },
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: React.ComponentProps<typeof Ionicons>["name"];

              if (route.name === "Despesas") {
                iconName = focused ? "list" : "list-outline";
              } else {
                iconName = focused ? "add-circle" : "add-circle-outline";
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen
            name="Despesas"
            component={HomeTab}
            options={{ title: "Despesas" }}
          />
          <Tab.Screen
            name="Adicionar"
            component={AddExpenseTab}
            options={{ title: "Adicionar" }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
