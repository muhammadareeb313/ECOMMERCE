import React, { useEffect } from "react";
import "./App.css"
import {BrowserRouter as Router,Route} from "react-router-dom"
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import WebFont from "webfontloader"
import Search from "./component/Product/Search";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products.js";
import LoginSignup from "./component/User/LoginSignUp.js";
function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });


  }, []);
  return (
    
    <Router>
     <Header />
     <Route exact path="/" component={Home}/>
     <Route exact path="/product/:id" component={ProductDetails} />
     <Route exact path="/products" component={Products} />
     <Route path="/products/:keyword" component={Products} />

     <Route exact path="/search" component={Search} />
     <Route exact path="/login" component={LoginSignup} />


{/* <Route exact path="/contact" component={Contact} />

<Route exact path="/about" component={About} />

<ProtectedRoute exact path="/account" component={Profile} />

<ProtectedRoute exact path="/me/update" component={UpdateProfile} /> */}
     <Footer />
    </Router>
  );
}

export default App;
