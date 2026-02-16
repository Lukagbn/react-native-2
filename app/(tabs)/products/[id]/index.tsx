import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ProductType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: "men's clothing" | "jewelery" | "electronics" | "women's clothing";
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

const index = () => {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<ProductType | null>(null);
  const fetchProduct = async () => {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const result = await res.json();
    return setProduct(result);
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  if (!product) {
    return (
      <View>
        <Text>loading</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.screen}>
      <Image style={styles.img} source={product?.image} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.description}>{product.description}</Text>
      </ScrollView>
      <SafeAreaView edges={["bottom"]} style={styles.btnContainer}>
        <TouchableOpacity style={styles.buy}>
          <Text style={{ color: "#ffff" }}>But Now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cart}>
          <Text style={{ color: "#ffff" }}>cart</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#ffff",
    flex: 1,
  },
  img: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 450,
    zIndex: -1,
  },
  container: {
    marginTop: 400,
    padding: 30,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "#ffffff",
    gap: 15,
    justifyContent: "space-between",
  },
  price: {
    fontSize: 20,
  },
  title: {
    fontWeight: 500,
    fontSize: 30,
  },
  category: {
    fontWeight: 500,
    fontSize: 20,
  },
  description: {
    fontSize: 20,
  },
  btnContainer: {
    position: "fixed",
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#cccc",
  },
  buy: {
    backgroundColor: "rgb(25, 88, 247)c",
    borderRadius: 10,
    padding: 15,
    maxWidth: 450,
    width: "100%",
    alignItems: "center",
  },
  cart: {
    maxWidth: 70,
    padding: 15,
    width: "100%",
    backgroundColor: "#ccc",
    alignItems: "center",
    borderRadius: 10,
  },
});
