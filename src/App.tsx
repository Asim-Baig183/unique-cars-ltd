import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from "./components/cta/ScrollToTop";

import Header from './components/header/Topbar';
import Navbar from "./components/header/Navbar";
import Footer from './components/footer/Footer';
import CopyrightBar from './components/footer/CopyrightBar';
import Home from './pages/Home';
import InventoryPage from './pages/Inventory';
import CarFinderPage from "./pages/CarFinderPage";
import AppraiseTrade from "./pages/AppraiseTrade";
import FinanceCalculator from "./pages/FinanceCalculatorPage";
import CreditApplication from "./pages/CreditApplicationPage";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUsPage";
import Directions from "./pages/Directions";
import TextUs from "./pages/TextUsPage";
import GlobalChatWidget from './components/Chat/GlobalChatWidget'; 
import CarDetails from "./pages/CarsDetails";

// 1. Admin Component Import (agar default export hai to import AdminInventory, aksar named export hota hai)
import { AddCarForm } from "./components/Admin/inventory";; // Adjust name according to export in inventory.tsx
import  VinDecoderTool  from './components/VinDecoderTool';
function App() {
  return (
    <Router>
      <ScrollToTop />

      <div className="relative min-h-screen bg-black text-white">
        <Header />
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/CarFinderPage" element={<CarFinderPage />} />
          <Route path="/AppraiseTrade" element={<AppraiseTrade />} />
          <Route path="/FinanceCalculator" element={<FinanceCalculator />} />
          <Route path="/CreditApplication" element={<CreditApplication />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/Directions" element={<Directions />} />
          <Route path="/TextUs" element={<TextUs />} />
          <Route path="/VDT" element={< VinDecoderTool/>} />

          {/* Dynamic Car Details Route */}
          <Route path="/CarDetails" element={<CarDetails />} />
          <Route path="/CarDetails/:id" element={<CarDetails />} />

          {/* 2. Admin Inventory Portal Route */}
          <Route path="/admin/inventory" element={<AddCarForm />} />
        </Routes>
        
        <Footer />
        <CopyrightBar />
        
        <GlobalChatWidget />
      </div>
    </Router>
  );
}

export default App;