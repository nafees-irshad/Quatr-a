import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { CartProvider } from "./context/CartContext";
import "./index.css";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Additional routes like /collection, /atelier, /story can go here */}
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
