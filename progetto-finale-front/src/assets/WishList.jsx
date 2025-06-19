import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WishList = () => {
  // Stato per i prodotti
  const [products, setProducts] = useState([]);
  // Stato per gli ID dei preferiti
  const [favoriteIds, setFavoriteIds] = useState(() => {
    // Inizializza gli ID dei preferiti dal localStorage
    const stored = localStorage.getItem("favoriteIds");
    return stored ? JSON.parse(stored).map(Number) : [];
    });
  // Stato per il prodotto selezionato
  const [selectedId, setSelectedId] = useState("");

  const navigate = useNavigate();

  // Carica dal backend
  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
      console.log("Prodotti caricati:", data);
      });
  }, []);


  // Salva i preferiti nel localStorage ogni volta che cambiano
  useEffect(() => {
    localStorage.setItem("favoriteIds", JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  
  // Aggiungi prodotto selezionato alla wishlist
  const addToWishList = () => {
    if (selectedId && !favoriteIds.includes(Number(selectedId))) {
      setFavoriteIds([...favoriteIds, Number(selectedId)]);
    }
  };

  // Rimuovi prodotto dalla wishlist
  const removeFromWishList = (productId) => {
    setFavoriteIds(favoriteIds.filter((id) => id !== Number(productId)));
  };

  // Ricostruisci la lista dei prodotti preferiti
  const favorites = products.filter(p => favoriteIds.includes(Number(p.id)));

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
            .filter(p => !favoriteIds.includes(Number(p.id)))
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