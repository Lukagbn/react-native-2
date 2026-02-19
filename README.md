<img width="524" height="951" alt="image" src="https://github.com/user-attachments/assets/df0872cf-c9f7-4a96-95b5-abe1d409e217" /># 🛍️ Mobile Store App

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

<img width="531" height="935" alt="login" src="https://github.com/user-attachments/assets/abce1750-598d-46cd-b542-1f430b530477" />
<img width="521" height="930" alt="register" src="https://github.com/user-attachments/assets/be16210c-686b-492d-87c2-4674d1c90ec5" />


---

### 🛍️ Products Screen

- Fetches products dynamically from FakeStoreAPI
- Pull-to-refresh support
- Loading state with ActivityIndicator
- Add to cart directly from product list
- Navigate to product details page

<img width="524" height="951" alt="products" src="https://github.com/user-attachments/assets/ff9d76a6-3cbb-4767-a8fa-40cdfeb68304" />


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

<img width="535" height="947" alt="details" src="https://github.com/user-attachments/assets/c775c917-2209-4370-9a8f-ff05c6c766ac" />

---

### 🛒 Shopping Cart

- Cart data stored in AsyncStorage
- Add products
- Increase quantity
- Decrease quantity
- Remove item when quantity reaches 0
- Pull-to-refresh support
- Real-time total price calculation

<img width="512" height="934" alt="cart" src="https://github.com/user-attachments/assets/0523a5ec-f1e7-478c-9ee3-d24d2c100b2d" />

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

<img width="522" height="943" alt="profile" src="https://github.com/user-attachments/assets/9cd025e9-327b-4cb3-9944-0961901a9c7c" />

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
