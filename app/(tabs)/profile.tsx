import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type User = {
  address: {
    geolocation: {
      lat: string;
      long: string;
    };
    city: string;
    street: string;
    number: number;
    zipcode: string;
  };
  id: number;
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  phone: string;
};

const profile = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const logOut = () => {
    router.replace("/(auth)");
    AsyncStorage.removeItem("user");
  };
  const loadUser = async () => {
    const userId = await AsyncStorage.getItem("user");
    const id = Number(userId) % 10;
    try {
      const res = await fetch(`https://fakestoreapi.com/users/${id}`);
      const resp = await res.json();
      return setUser(resp);
    } catch (error) {
      console.error("Error", error);
    }
  };
  useEffect(() => {
    loadUser();
  }, []);
  return (
    <View>
      <Image
        source={require("../../assets/images/profile.png")}
        style={styles.profileImage}
      />
      <TouchableOpacity onPress={logOut}>
        <Text>Log out</Text>
        <Text>{user?.email}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({
  profileImage: {
    width: 150,
    height: 150,
    alignSelf: "center",
  },
});
