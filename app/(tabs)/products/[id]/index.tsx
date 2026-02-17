import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
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
    <>
      <ScrollView>
        <Image style={styles.img} source={product?.image} />
        <View style={styles.container}>
          <Text style={styles.price}>${product.price}</Text>
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.buy}>
              <Ionicons name="wallet-outline" size={24} color="white" />
              <Text style={{ color: "#ffff" }}>Buy Now</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cart}>
              <Text style={{ color: "#ffff" }}>
                <AntDesign name="shopping-cart" size={24} color="black" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    backgroundColor: "#f1f1f1",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    marginTop: 400,
    padding: 20,
    gap: 10,
    flex: 1,
    minHeight: "100%",
  },
  img: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 450,
    zIndex: 1,
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  buy: {
    backgroundColor: "rgb(25, 88, 247)c",
    borderRadius: 10,
    padding: 15,
    width: "70%",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
  },
  cart: {
    width: "25%",
    padding: 15,
    backgroundColor: "#e5e5e5",
    alignItems: "center",
    borderRadius: 10,
  },
});
