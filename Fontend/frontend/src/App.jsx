import { useContext, useEffect, useState } from "react";
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import MenuDetails from "./pages/MenuDetails.jsx";
import Checkout from "./pages/Checkout.jsx";
import BookTable from "./pages/BookTable.jsx";
import MyBooking from "./pages/MyBooking.jsx";
import MyOrder from "./pages/MyOrder.jsx";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard.jsx";
import NavBar from "./components/NavBar.jsx";
import Footer from "./pages/Footer.jsx";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { AppContext } from "./context/AppContext.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import AddCategory from "./pages/admin/AddCategory.jsx";
import AddMenu from "./pages/admin/AddMenu.jsx";
import Categories from "./pages/admin/Categories.jsx";
import Menus from "./pages/admin/Menus.jsx";
import EditCategories from "./pages/admin/EditCategories.jsx";
import EditMenu from "./pages/admin/EditMenu.jsx";
import AllOrders from "./pages/admin/Orders.jsx";
import Booking from "./pages/admin/Booking.jsx";
import Cart from "./pages/Cart.jsx";

function App() {
  const adminPath = useLocation().pathname.includes("admin");
  const loginPath = useLocation().pathname.includes("login");
  const signupPath = useLocation().pathname.includes("signup");
  const { admin, setAdmin } = useContext(AppContext);
  const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      })
    }, [pathname]);
    return null;
  }
  return (
    <>
   
      <ScrollToTop></ScrollToTop>
      <section>
        {!adminPath && <NavBar></NavBar>}
        <Cart></Cart>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/menu" element={<Menu></Menu>}></Route>
          <Route
            path="/menu-details/:id"
            element={<MenuDetails></MenuDetails>}
          ></Route>
          <Route path="/contact" element={<Contact></Contact>}></Route>
     
          <Route path="/checkout" element={<Checkout></Checkout>}></Route>
          <Route path="/book-table" element={<BookTable></BookTable>}></Route>
          <Route path="/my-bookings" element={<MyBooking></MyBooking>}></Route>
          <Route path="/my-orders" element={<MyOrder></MyOrder>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              admin ? (
                <>
                  <AdminLayout></AdminLayout>
                </>
              ) : (
                <AdminLogin></AdminLogin>
              )
            }
          >
            <Route
              index
              element={
                admin ? <Dashboard></Dashboard> : <AdminLogin></AdminLogin>
              }
            />
            <Route
              path="add-category"
              element={
                admin ? <AddCategory></AddCategory> : <AdminLogin></AdminLogin>
              }
            ></Route>
            <Route
              path="edit-category/:id"
              element={
                admin ? (
                  <EditCategories></EditCategories>
                ) : (
                  <AdminLogin></AdminLogin>
                )
              }
            ></Route>
            <Route
              path="add-menu"
              element={admin ? <AddMenu></AddMenu> : <AdminLogin></AdminLogin>}
            ></Route>
            <Route
              path="categories"
              element={
                admin ? <Categories></Categories> : <AdminLogin></AdminLogin>
              }
            ></Route>
            <Route
              path="menus"
              element={admin ? <Menus></Menus> : <AdminLogin></AdminLogin>}
            ></Route>
           
            <Route
              path="edit-menu/:id"
              element={
                admin ? <EditMenu></EditMenu> : <AdminLogin></AdminLogin>
              }
            ></Route>
            <Route
              path="bookings"
              element={
                admin ? <Booking></Booking> : <AdminLogin></AdminLogin>
              }
            ></Route>
            <Route
              path="orders"
              element={admin ? <AllOrders></AllOrders> : <AdminLogin></AdminLogin>}
            ></Route>
          </Route>
        </Routes>
        {!loginPath && !signupPath && !adminPath ? (
          <>
            <Footer></Footer>
          </>
        ) : (
          ""
        )}
      </section>
    </>
  );
}

export default App;
