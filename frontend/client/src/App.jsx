import {Routes,Route} from 'react-router-dom'
import HomePage from "./pages/HomePages.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Policy from "./pages/Policy.jsx";
import Register from "./pages/Auth/Register.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/Auth/Login.jsx";
import Dashboard from "./pages/user/Dashboard.jsx";
import PrivateRoute from "./components/Routes/Private.jsx";
import ForgotPassword from "./pages/Auth/ForgotPassword.jsx";
import AdminRoute from "./components/Routes/AdminRoute.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import CreateCategory from "./pages/Admin/CreateCategory.jsx";
import CreateProduct from "./pages/Admin/CreateProduct.jsx";
import User from "./pages/Admin/Users.jsx";
import Orders from "./pages/user/Orders.jsx";
import Profiles from "./pages/user/Profiles.jsx";
import Settings from "./pages/user/Settings.jsx";

function App() {

  return (
    <>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard/user" element={<PrivateRoute />}>
                <Route index element={<Dashboard />} />
                <Route path="profile" element={<Profiles />} />
                <Route path="orders" element={<Orders />} />
                <Route path="settings" element={<Settings />} />
            </Route>


            <Route path="/dashboard/admin" element={<AdminRoute />}>
                <Route index element={<AdminDashboard />} />
                <Route path="/dashboard/admin/create-category" element={<CreateCategory />} />
                <Route path="/dashboard/admin/create-product" element={<CreateProduct />} />
                <Route path="/dashboard/admin/users" element={<User />} />

            </Route>

            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
        <ToastContainer autoClose={3000} />
    </>
  )
}

export default App
