import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import DetailPortfolio from "../pages/DetailPortfolio";
import Experiance from "../pages/Experiance";
import HomePage from "../pages/HomePage";
import NotFound from "../pages/NotFound";
import LoginPage from "../pages/LoginPage";
import LayoutDashboard from "../pages/Dashboard/LayoutDashboard";
import { Routes, Route } from "react-router-dom";

export default function AppRoutes() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <HomePage />
            <Footer />
          </>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<LayoutDashboard />} />
      <Route
        path="/detail-portfolio/:id"
        element={
          <>
            <Navbar />
            <DetailPortfolio />
            <Footer />
          </>
        }
      />
      <Route
        path="/experiance"
        element={
          <>
            <Navbar />
            <Experiance />
            <Footer />
          </>
        }
      />
      <Route
        path="*"
        element={
          <>
            <Navbar />
            <NotFound />
            <Footer />
          </>
        }
      />
    </Routes>
  );
}
