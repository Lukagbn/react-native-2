import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const profile = () => {
  const router = useRouter();
  const logOut = () => {
    router.replace("/(auth)");
  };
  return (
    <View>
      <Text>profile</Text>
      <TouchableOpacity onPress={logOut}>
        <Text>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({});
