import React from "react";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import ProfileScreen from "../screens/ProfileScreen";
import TicketScreen from "../screens/TicketScreen";
import PaymentScreen from "../screens/PaymentScreen";
import MyInfoScreen from "../screens/MyInfoScreen";
import EditInfoScreen from "../screens/EditInfoScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";

const Tab = createMaterialBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      activeColor="#0090fe"
      shifting={true}
      barStyle={{ backgroundColor: "#fff" }}
    >
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          )
        }}
      />
      <Tab.Screen
        name="Ticket"
        component={TicketScreen}
        options={{
          tabBarLabel: "Ticket",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="ticket" color={color} size={26} />
          )
        }}
      />
      <Tab.Screen
        name="Payment"
        component={PaymentScreen}
        options={{
          tabBarLabel: "Payment",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="wallet" color={color} size={26} />
          )
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

export default function RootStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: null,
        headerTintColor: "#fff",
        headerTransparent: true
      }}
    >
      <Stack.Screen name="Tab" component={BottomTabNavigator} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Ticket" component={TicketScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="MyInfo" component={MyInfoScreen} />
      <Stack.Screen name="EditInfo" component={EditInfoScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
    </Stack.Navigator>
  );
}