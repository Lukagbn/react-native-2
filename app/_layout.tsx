import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

export default function RootLayout() {
  const router = useRouter();

  const checkUser = async () => {
    const result = await AsyncStorage.getItem("user");
    if (!result) return;
    const user = JSON.parse(result);
    if (user) {
      router.push("/products");
    }
  };

  useEffect(() => {
    checkUser();
  }, []);
  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)/profile" />
      </Stack>
    </>
  );
}
