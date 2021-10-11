import './App.css'
import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import SingleProductPage from './pages/SingleProductPage'
import OrderDetailsPage from './pages/OrderDetailsPage'
import OrdersPage from './pages/OrdersPage'
import StorePage from './pages/StorePage'
import UpdateStorePage from './pages/UpdateStorePage'
import MapPage from './pages/MapPage'
import CartPage from './pages/CartPage'
import Navbar from './Components/NavBar'
import Footer from './Components/Footer'
import AdminMemberPage from './pages/AdminMemberPage'
import AdminOrderPage from './pages/AdminOrderPage'
import AdminProductTypePage from './pages/AdminProductTypePage'
import AdminStoreTypePage from './pages/AdminStoreTypePage'
import Entrance from './pages/Entrance'
import FAQPage from './pages/FAQPage'
import MemberEdit from './pages/MemberEdit'
import RulesPage from './pages/RulesPage'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

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
          <Route path="/product/:id">
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
  )
}

export default App
