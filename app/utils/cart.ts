import AsyncStorage from "@react-native-async-storage/async-storage";

export type productsType = {
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
export type CartItem = {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  quantity?: number;
};
export const handleAddToCart = async (product: productsType) => {
  try {
    const existingCart = await AsyncStorage.getItem("cart");
    let cart = existingCart ? JSON.parse(existingCart) : [];

    const alreadyExists = cart.find(
      (item: productsType) => item.id === product.id,
    );

    if (!alreadyExists) {
      cart.push(product);
      await AsyncStorage.setItem("cart", JSON.stringify(cart));
      console.log("Added to cart:", cart);
    } else {
      console.error("already exists");
    }
  } catch (error) {
    console.error("error:", error);
  }
};
