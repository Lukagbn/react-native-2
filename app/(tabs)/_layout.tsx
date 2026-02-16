import AntDesign from "@expo/vector-icons/AntDesign";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tabs.Screen
        name="products"
        options={{
          headerTitle: "products",
          tabBarLabel: "products",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="shop" size={focused ? 25 : 23} color={color} />
          ),
        }}
      />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({});
