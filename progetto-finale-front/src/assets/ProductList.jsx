import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';
import AlfabeticFilter from './AlfabeticFilter';

export default function ProductList() {
// Stato per la lista dei prodotti
const [products, setProducts] = useState([]);
    // Effettua una richiesta per ottenere la lista dei prodotti
    useEffect(() => {
        fetch("http://localhost:3001/products")
          .then(res => res.json())
          .then(data => setProducts(data));
      }, []);

// Stato per la query di ricerca
const [searchQuery, setSearchQuery] = useState("");
// Stato per la categoria selezionata
const [selectedCategory, setSelectedCategory] = useState("");
const categories = Array.from(new Set(products.map(p => p.category)));
// Metodo filter per ottenere i prodotti che corrispondono alla ricerca e alla categoria
const filteredProducts = products.filter(product =>
  product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
  // Filtra per categoria se è selezionata
  (selectedCategory === "" || product.category === selectedCategory)
);
// Controlla se non ci sono prodotti filtrati e se la query di ricerca non è vuota
const notFound = filteredProducts.length === 0 && searchQuery !== "";

  
return (
    <>
      <h2>Lista prodotti</h2>
          <FilterBar categories={categories} onFilter={setSelectedCategory} />
          <SearchBar onSearch={setSearchQuery} notFound={notFound}/>
          <AlfabeticFilter productList={filteredProducts} setProductList={setProducts} />
          <Link to="/compare">
            <button className='bottone-comparatore'>Vai al comparatore</button>
          </Link>
          <Link to="/wishlist">
            <button className='bottone-preferiti'>Preferiti</button>
          </Link>
      <ul>
        {filteredProducts.map(product => (
          <li key={product.id}>
            <strong>
                <Link to={`/products/${product.id}`} className="product-title-link">{product.title}</Link>
            </strong> - ({product.category})
          </li>
        ))}
      </ul>
    </>
  );
}