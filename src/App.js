import "./App.css";
import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getMe } from "./redux/reducers/userReducer";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductsSearchedPage from "./pages/ProductsSearchedPage";
import ProductsByCategoryPage from "./pages/ProductsByCategoryPage";
import ProductManagePage from "./pages/ProductManagePage";
import ProductEdit from "./pages/ProductEdit";
import SingleProductPage from "./pages/SingleProductPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import StorePage from "./pages/StorePage";
import UpdateStorePage from "./pages/UpdateStorePage";
import MapPage from "./pages/MapPage";
import CartPage from "./pages/CartPage";
import Navbar from "./Components/NavBar";
import Footer from "./Components/Footer";
import AdminMemberPage from "./pages/AdminMemberPage";
import AdminOrderPage from "./pages/AdminOrderPage";
import AdminProductTypePage from "./pages/AdminProductTypePage";
import AdminStoreTypePage from "./pages/AdminStoreTypePage";
import Entrance from "./pages/Entrance";
import FAQPage from "./pages/FAQPage";
import MemberEdit from "./pages/MemberEdit";
import PasswordEdit from "./pages/PasswordEdit";
import RulesPage from "./pages/RulesPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
    dispatch(getMe());
  }, [dispatch]);

  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/products/search/:keyword">
            <ProductsSearchedPage />
          </Route>
          <Route path="/products/category/:id">
            <ProductsByCategoryPage />
          </Route>
          <Route path="/products">
            <ProductsPage />
          </Route>
          <Route path="/product/:id">
            <SingleProductPage />
          </Route>
          <Route path="/product_manage">
            <ProductManagePage />
          </Route>
          <Route path="/product_edit/:id">
            <ProductEdit />
          </Route>
          <Route path="/order_details">
            <OrderDetailsPage />
          </Route>
          <Route path="/store/:id">
            <StorePage />
          </Route>
          <Route path="/update_store">
            <UpdateStorePage />
          </Route>
          <Route path="/map">
            <MapPage />
          </Route>
          <Route path="/cart">
            <CartPage />
          </Route>
          <Route path="/cart">
            <CartPage />
          </Route>
          <Route path="/admin_member">
            <AdminMemberPage />
          </Route>
          <Route path="/admin_order">
            <AdminOrderPage />
          </Route>
          <Route path="/admin_product_type">
            <AdminProductTypePage />
          </Route>
          <Route path="/admin_store_type">
            <AdminStoreTypePage />
          </Route>
          <Route path="/entrance">
            <Entrance />
          </Route>
          <Route path="/faq">
            <FAQPage />
          </Route>
          <Route path="/member_edit">
            <MemberEdit />
          </Route>
          <Route path="/member_password">
            <PasswordEdit />
          </Route>
          <Route path="/rules">
            <RulesPage />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>

  );
}

export default App;
