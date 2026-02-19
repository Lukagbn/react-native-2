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
  quantity: number;
};

export const handleAddToCart = async (product: productsType) => {
  try {
    const existingCart = await AsyncStorage.getItem("cart");
    let cart: CartItem[] = existingCart ? JSON.parse(existingCart) : [];

    const existingIndex = cart.findIndex((item) => item.id === product.id);

    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        category: product.category,
        image: product.image,
        quantity: 1,
      });
    }

    await AsyncStorage.setItem("cart", JSON.stringify(cart));
    console.log("Updated cart:", cart);
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};
