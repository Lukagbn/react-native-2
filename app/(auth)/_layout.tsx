import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="register" />
    </Stack>
  );
};

export default layout;

const styles = StyleSheet.create({});
