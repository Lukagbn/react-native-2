import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CartItem } from "../utils/cart";

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[] | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadCart = async () => {
    const storedCart = await AsyncStorage.getItem("cart");
    console.log(storedCart);
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    } else {
      setCartItems(null);
    }
  };
  const onRefresh = () => {
    setRefreshing(true);
    loadCart();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };
  const handleIncrease = async (id: number) => {
    const updatedCart = cartItems?.map((item) =>
      item.id === id ? { ...item, quantity: (item.quantity ?? 1) + 1 } : item,
    );

    setCartItems(updatedCart ?? null);
    await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDecrease = async (id: number) => {
    const updatedCart = cartItems
      ?.map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity ?? 1) - 1 } : item,
      )
      .filter((item) => (item.quantity ?? 1) > 0);

    setCartItems(updatedCart ?? null);
    await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  useEffect(() => {
    loadCart();
  }, []);

  if (cartItems?.length === 0) {
    return (
      <View style={styles.emptyCart}>
        <Text style={styles.emptyCartTitle}>
          Your cart is empty!, try to add products, or
        </Text>
        <TouchableOpacity onPress={onRefresh} style={styles.emptyCartBtn}>
          <Text>refresh the page</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        initialNumToRender={4}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <View style={styles.container}>
            <Link href={`/(tabs)/products/${item.id}`}>
              <Image source={`${item.image}`} style={styles.image} />
            </Link>
            <View style={styles.cartInfoWrapper}>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
                {item.title}
              </Text>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.price}>
                ${(item.price * (item.quantity ?? 1)).toFixed(2)}
              </Text>
              <View
                style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
              >
                <TouchableOpacity
                  hitSlop={10}
                  disabled={item.quantity === 10}
                  style={styles.btnWrapper}
                  onPress={() => handleIncrease(item.id)}
                >
                  <Text style={styles.btn}>+</Text>
                </TouchableOpacity>
                <Text>{item.quantity ?? 1}</Text>
                <TouchableOpacity
                  hitSlop={10}
                  style={styles.btnWrapper}
                  onPress={() => handleDecrease(item.id)}
                >
                  <Text style={styles.btn}>-</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  emptyCart: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  emptyCartTitle: {
    fontWeight: 700,
    fontSize: 19,
  },
  emptyCartBtn: {
    borderRadius: 10,
    backgroundColor: "#ccc",
    padding: 10,
  },
  container: {
    flex: 1,
    height: 150,
    margin: 20,
    borderRadius: 25,
    backgroundColor: "#faf8f872",
    borderWidth: 1,
    borderColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 30,
  },
  title: { fontWeight: 700, width: 200, fontSize: 20 },
  price: { fontWeight: 700, fontSize: 20 },
  category: { fontWeight: 500, fontSize: 18 },
  image: { width: 100, height: 100 },
  cartInfoWrapper: {
    gap: 5,
  },
  btnWrapper: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  btn: {
    fontSize: 20,
    fontWeight: 500,
  },
});
