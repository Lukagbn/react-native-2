import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
  if (!user) {
    return (
      <SafeAreaView style={styles.loadingCotainer}>
        <View style={styles.loading}>
          <Text style={styles.loadingText}>Loading</Text>
          <ActivityIndicator size={"large"} color={"#00c3ffcc"} />
        </View>
      </SafeAreaView>
    );
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        Welcome {user?.name.firstname} {user?.name.lastname}!
      </Text>
      <Image
        source={require("../../assets/images/profile.png")}
        style={styles.profileImage}
      />
      <Text style={styles.detailsTitle}>Details:</Text>
      <View style={styles.detailsContainer}>
        <View style={styles.detailsWrapper}>
          <Text style={styles.detailsWrapperTitle}>Email: </Text>
          <Text style={styles.detailsWrapperTxt}>{user.email}</Text>
        </View>
        <View style={styles.detailsWrapper}>
          <Text style={styles.detailsWrapperTitle}>City: </Text>
          <Text style={styles.detailsWrapperTxt}>{user.address.city}</Text>
        </View>
        <View style={styles.detailsWrapper}>
          <Text style={styles.detailsWrapperTitle}>Street: </Text>
          <Text style={styles.detailsWrapperTxt}>{user.address.street}</Text>
        </View>
        <View style={styles.detailsWrapper}>
          <Text style={styles.detailsWrapperTitle}>Zipcode:</Text>
          <Text style={styles.detailsWrapperTxt}>{user.address.zipcode}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.logOutBtn} onPress={logOut}>
        <Text style={styles.logOutBtnTxt}>Log out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default profile;

const styles = StyleSheet.create({
  loadingCotainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    gap: 10,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 500,
  },
  container: {
    paddingBottom: 50,
    paddingTop: 50,
    alignItems: "center",
    gap: 15,
  },
  title: {
    fontWeight: 700,
    fontSize: 26,
  },
  detailsContainer: {
    backgroundColor: "#faf8f8e9",
    borderRadius: 25,
    padding: 25,
    width: "65%",
    gap: 15,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  detailsTitle: {
    fontWeight: 500,
    fontSize: 23,
  },
  profileImage: {
    width: 150,
    height: 150,
    alignSelf: "center",
  },
  logOutBtn: {
    backgroundColor: "#00c3ffcc",
    paddingVertical: 20,
    paddingHorizontal: 70,
    borderRadius: 35,
  },
  logOutBtnTxt: {
    fontWeight: "700",
    fontSize: 19,
    color: "#ffff",
  },
  detailsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailsWrapperTitle: {
    fontWeight: 700,
    fontSize: 18,
  },
  detailsWrapperTxt: {
    fontSize: 18,
  },
});
