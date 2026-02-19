import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
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
            <AntDesign name="shop" size={focused ? 27 : 25} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: "profile",
          tabBarLabel: "profile",
          tabBarIcon: ({ color, focused }) => (
            <Feather name="user" size={focused ? 27 : 25} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          headerTitle: "cart",
          tabBarLabel: "cart",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign
              name="shopping-cart"
              size={focused ? 27 : 25}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({});
