import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductCard() {
  // Ottieni l'ID del prodotto dalla URL
  const { id } = useParams();
  // Stato per memorizzare i dettagli del prodotto
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  // Effettua una richiesta per ottenere i dettagli del prodotto specifico
  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data.product));
  }, [id]);

  // Se il prodotto non è ancora caricato, mostra un messaggio di caricamento
  if (!product) return <div>Caricamento...</div>;

  return (
    <div className="product-card" style={{ position: "relative" }}>
      <button
        className="back-button"
        onClick={() => navigate("/products")}
      >
        Torna alla lista
      </button>
      <h2>{product.title}</h2>
      <p><strong>Categoria:</strong> {product.category}</p>
      <p><strong>Prezzo:</strong> €{product.price}</p>
      <p><strong>Brand:</strong> {product.brand}</p>
      <p><strong>Storage:</strong> {product.storage}</p>
      <p><strong>Descrizione:</strong> {product.description}</p>
    </div>
  );
}