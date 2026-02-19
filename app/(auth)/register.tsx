import { yupResolver } from "@hookform/resolvers/yup";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as yup from "yup";

type FormData = {
  username: string;
  password: string;
  rePassword: string;
};
const schema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
  rePassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});
const register = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const router = useRouter();
  const [securePassword, setSecurePassword] = useState(true);
  const [secureRePassword, setSecureRePassword] = useState(true);
  const handleLogIn = async (data: FormData) => {
    try {
      const res = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        return;
      }
      const resp = await res.json();
      console.log(resp);
      if (resp?.id) {
        router.replace("/(auth)");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <Image
          source={require("../../assets/images/profile.png")}
          style={styles.profileImage}
        />
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Username"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.username && (
            <Text style={{ color: "red" }}>{errors.username.message}</Text>
          )}
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry={securePassword}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                <Pressable
                  style={styles.visible}
                  onPress={() => setSecurePassword(!securePassword)}
                >
                  <Text>show</Text>
                </Pressable>
              </View>
            )}
          />
          {errors.password && (
            <Text style={{ color: "red" }}>{errors.password.message}</Text>
          )}
          <Controller
            control={control}
            name="rePassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Password again"
                  secureTextEntry={secureRePassword}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                <Pressable
                  style={styles.visible}
                  onPress={() => setSecureRePassword(!secureRePassword)}
                >
                  <Text>show</Text>
                </Pressable>
              </View>
            )}
          />
          {errors.rePassword && (
            <Text style={{ color: "red" }}>{errors.rePassword.message}</Text>
          )}
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={handleSubmit(handleLogIn)}
            style={styles.btn}
          >
            <Text style={styles.signInBtn}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Link href={"/(auth)"} style={styles.registerBtn} replace={true}>
              Sign In
            </Link>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 30,
    gap: 40,
  },
  input: {
    height: 70,
    backgroundColor: "#cccc",
    borderRadius: 35,
    paddingLeft: 20,
    fontSize: 18,
  },
  inputContainer: {
    gap: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    alignSelf: "center",
  },
  btnContainer: {
    alignItems: "center",
    gap: 30,
  },
  signInBtn: {
    fontWeight: "700",
    fontSize: 19,
    color: "#ffff",
  },
  registerBtn: {
    fontWeight: "700",
    fontSize: 19,
    color: "#00c3ffcc",
  },
  btn: {
    backgroundColor: "#00c3ffcc",
    paddingVertical: 20,
    paddingHorizontal: 70,
    borderRadius: 35,
  },
  inputWrapper: {
    position: "relative",
  },
  visible: {
    position: "absolute",
    right: 30,
    top: "50%",
    transform: [{ translateY: "-50%" }],
  },
});
