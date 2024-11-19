import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import {
  Home,
  Product,
  ProductsPage,
  AboutPage,
  ContactPage,
  Cart,
  Login,
  Register,
  Checkout,
  PageNotFound,
  Logout,
  OrderHistory
} from "./pages";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";

function App() {

  return (
    <BrowserRouter>
    <ScrollToTop>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order_history" element={<OrderHistory />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/products/*" element={<PageNotFound />} />
        </Routes>
      </Provider>
    </ScrollToTop>
    <Toaster />
  </BrowserRouter>
  )
}

export default App
