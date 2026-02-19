# 🛍️ Mobile Store App

A modern, fully responsive **React Native e-commerce mobile application** built with **Expo Router** and powered by **FakeStoreAPI**.  
The app features authentication, product browsing, detailed product pages, persistent cart management using AsyncStorage, and a customizable user profile with image upload support.

Designed with clean UI, smooth navigation, and optimized mobile experience.

---

## ✨ Features

### 🔐 Authentication (Login & Register)

- Form validation using React Hook Form + Yup
- Login via FakeStoreAPI authentication endpoint
- “Remember Me” functionality
- Token persistence using AsyncStorage
- Auto-login on app reload

<img src="https://raw.githubusercontent.com/Lukagbn/react-native-2/refs/heads/main/assets/screenshots/login.png" width="300" alt="Login Screen" />

---

### 🛍️ Products Screen

- Fetches products dynamically from FakeStoreAPI
- Pull-to-refresh support
- Loading state with ActivityIndicator
- Add to cart directly from product list
- Navigate to product details page

---

### 🔎 Product Details

- Dynamic route using `[id]`
- Displays:
  - Product image
  - Title
  - Description
  - Category
  - Price
- Add to cart functionality
- Buy Now button (UI)

---

### 🛒 Shopping Cart

- Cart data stored in AsyncStorage
- Add products
- Increase quantity
- Decrease quantity
- Remove item when quantity reaches 0
- Pull-to-refresh support
- Real-time total price calculation

---

### 👤 Profile Page

- Fetches user data from FakeStoreAPI
- Displays:
  - Name
  - Email
  - Address details
- Upload profile image using Expo Image Picker
- Persist selected image in AsyncStorage
- Logout functionality

---

## 🧠 State & Storage Management

This project uses **AsyncStorage** for persistent state instead of Redux.

### 🛒 Cart Storage Logic

```ts
AsyncStorage Key: "cart"

CartItem:
{
  id: number,
  title: string,
  price: number,
  category: string,
  image: string,
  quantity: number
}
```

Cart Behavior:

- If product already exists → increase quantity
- If product does not exist → add with quantity 1
- If quantity becomes 0 → remove from cart

---

### 👤 User Storage

```ts
AsyncStorage Key: "user"
```

- Stores authentication token
- Used for auto-login
- Cleared on logout

---

## 📁 Project Structure

```
app
├── _layout.tsx
├── (auth)
│   ├── _layout.tsx
│   ├── index.tsx        (Login)
│   └── register.tsx
│
├── (tabs)
│   ├── _layout.tsx
│   ├── cart.tsx
│   ├── profile.tsx
│   └── products
│       ├── _layout.tsx
│       ├── index.tsx
│       └── [id]
│           └── index.tsx
│
├── utils
│   ├── cart.ts
│   └── user.ts
│
assets
└── images
```

---

## 🧰 Tech Stack

- React Native
- Expo
- Expo Router
- TypeScript
- React Hook Form
- Yup
- AsyncStorage
- Expo Image Picker
- Expo Image
- FakeStoreAPI

---

## 📦 Dependencies

```json
{
  "expo": "...",
  "expo-router": "...",
  "react-native": "...",
  "@react-native-async-storage/async-storage": "...",
  "react-hook-form": "...",
  "yup": "...",
  "@hookform/resolvers": "...",
  "expo-image-picker": "...",
  "expo-image": "..."
}
```

---

## 🚀 Getting Started

```bash
npm install
npx expo start
```

Then:

- Press `i` → run on iOS simulator
- Press `a` → run on Android emulator
- Or scan the QR code with the Expo Go app

---

## 📝 Notes

- This is a mobile application built with Expo.
- Authentication is simulated using FakeStoreAPI.
- Cart and user session are stored locally using AsyncStorage.
- No backend server required.
- Designed as a portfolio-ready mobile commerce app.
