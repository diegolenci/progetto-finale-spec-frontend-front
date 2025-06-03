import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';

export default function ProductList() {

const [products, setProducts] = useState([]);
    // Effettua una richiesta per ottenere la lista dei prodotti
    useEffect(() => {
        fetch("http://localhost:3001/products")
          .then(res => res.json())
          .then(data => setProducts(data));
      }, []);

// Stato per la query di ricerca
const [searchQuery, setSearchQuery] = useState("");


const [selectedCategory, setSelectedCategory] = useState("");
const categories = Array.from(new Set(products.map(p => p.category)));

const filteredProducts = products.filter(product =>
  product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
  (selectedCategory === "" || product.category === selectedCategory)
);


  
return (
    <>
      <h2>Lista prodotti</h2>
        <SearchBar onSearch={setSearchQuery} />
        <FilterBar categories={categories} onFilter={setSelectedCategory} />
      <ul>
        {filteredProducts.map(product => (
          <li key={product.id}>
            <strong>
                <Link to={`/products/${product.id}`} className="product-title-link">{product.title}</Link>
            </strong> - {product.brand} ({product.category})
          </li>
        ))}
      </ul>
    </>
  );
}