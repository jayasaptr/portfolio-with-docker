import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import DetailPortfolio from "./pages/DetailPortfolio";
import Experiance from "./pages/Experiance";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail-portfolio/:id" element={<DetailPortfolio />} />
        <Route path="/experiance" element={<Experiance />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
