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
import { Navigate } from "react-router-dom";

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
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />
        }
      />
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <LayoutDashboard />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/skills/create"
        element={
          isAuthenticated ? (
            <LayoutDashboard />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/skills/edit/:id"
        element={
          isAuthenticated ? (
            <LayoutDashboard />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="/experience/create"
        element={
          isAuthenticated ? (
            <LayoutDashboard />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="/experience/edit/:id"
        element={
          isAuthenticated ? (
            <LayoutDashboard />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="/portfolio/edit/:id"
        element={
          isAuthenticated ? (
            <LayoutDashboard />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="/portfolio/create"
        element={
          isAuthenticated ? (
            <LayoutDashboard />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

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
