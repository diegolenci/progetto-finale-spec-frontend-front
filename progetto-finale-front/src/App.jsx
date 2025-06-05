// import dei componenti React e React Router
import CompareView from "./assets/CompareView";
import ProductCard from "./assets/ProductCard";
import ProductList from "./assets/ProductList"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WishList from "./assets/WishList";

function App() {
  // gestione delle rotte
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductCard />} />
        <Route path="/compare" element={<CompareView />} />
        <Route path="/wishlist" element={<WishList />} />
      </Routes>
    </Router>
  )
}

export default App
