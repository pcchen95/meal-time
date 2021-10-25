import "./App.css";
import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getMe } from "./redux/reducers/userReducer";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductEdit from "./pages/ProductEdit";
import SingleProductPage from "./pages/SingleProductPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import ClientOrdersPage from "./pages/ClientOrdersPage";
import VendorOrdersPage from "./pages/VendorOrdersPage";
import StorePage from "./pages/StorePage";
import UpdateStorePage from "./pages/UpdateStorePage";
import MapPage from "./pages/MapPage";
import CartPage from "./pages/CartPage";
import Navbar from "./Components/NavBar";
import Footer from "./Components/Footer";
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
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/products">
          <ProductsPage />
        </Route>
        <Route path="/product/:id">
          <SingleProductPage />
        </Route>
        <Route path="/product_edit/:id">
          <ProductEdit />
        </Route>
        <Route path="/order_details/:id">
          <OrderDetailsPage />
        </Route>
        <Route path="/orders">
          <ClientOrdersPage />
        </Route>
        <Route path="/vendor_orders/">
          <VendorOrdersPage />
        </Route>
        <Route path="/store">
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
        <Route path="/login">
          <SignIn />
        </Route>
        <Route path="/register">
          <SignUp />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
