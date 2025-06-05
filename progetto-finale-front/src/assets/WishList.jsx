import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WishList = () => {
  const [products, setProducts] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [selectedId, setSelectedId] = useState("");

  const navigate = useNavigate();

  // Carica i prodotti reali dal backend
  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);


  // Aggiungi prodotto selezionato alla wishlist
  const addToWishList = () => {
    if (selectedId && !favoriteIds.includes(Number(selectedId))) {
      setFavoriteIds([...favoriteIds, Number(selectedId)]);
    }
  };

  // Rimuovi prodotto dalla wishlist
  const removeFromWishList = (productId) => {
    setFavoriteIds(favoriteIds.filter((id) => id !== productId));
  };

  // Ricostruisci la lista dei prodotti preferiti
  const favorites = products.filter(p => favoriteIds.includes(p.id));

  return (
    <div>
      <h2>Lista dei Preferiti</h2>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
        <select
          value={selectedId}
          onChange={e => setSelectedId(e.target.value)}
          style={{ minWidth: 220 }}
        >
          <option value="">Seleziona un prodotto...</option>
          {products
            .filter(p => !favoriteIds.includes(p.id))
            .map(product => (
              <option key={product.id} value={product.id}>
                {product.title}
              </option>
            ))}
        </select>
        <button
          style={{ marginLeft: 10 }}
          onClick={addToWishList}
          disabled={!selectedId}
        >
          Aggiungi ai preferiti
        </button>
      </div>
      {favorites.length === 0 ? (
        <p>Nessun prodotto nei preferiti.</p>
      ) : (
        <ul>
          {favorites.map((product) => (
            <li key={product.id}>
              <strong>{product.title}</strong> - ({product.category})
              <button style={{ marginLeft: 10 }} onClick={() => removeFromWishList(product.id)}>
                Rimuovi
              </button>
            </li>
          ))}
        </ul>
      )}
      <div>
        <button className="back-button" onClick={() => navigate("/products")}>
          Torna alla lista prodotti
        </button>
      </div>
    </div>
  );
};

export default WishList;