import "./App.css";
import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "../../pages/Homepage";
import ProductsPage from "../../pages/ProductsPage";
import SingleProductPage from "../../pages/SingleProductPage";
import OrderDetailsPage from "../../pages/OrderDetailsPage";
import OrdersPage from "../../pages/OrdersPage";
import StorePage from "../../pages/StorePage";
import UpdateStorePage from "../../pages/UpdateStorePage";
import MapPage from "../../pages/MapPage";
import CartPage from "../../pages/CartPage";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/products">
            <ProductsPage />
          </Route>
          <Route path="/product">
            <SingleProductPage />
          </Route>
          <Route path="/order_details">
            <OrderDetailsPage />
          </Route>
          <Route path="/orders">
            <OrdersPage />
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
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
