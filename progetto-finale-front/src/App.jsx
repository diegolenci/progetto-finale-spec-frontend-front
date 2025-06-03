import ProductCard from "./assets/ProductCard";
import ProductList from "./assets/ProductList"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductCard />} />
      </Routes>
    </Router>
  )
}

export default App
