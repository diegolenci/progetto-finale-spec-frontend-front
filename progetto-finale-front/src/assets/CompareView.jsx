import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CompareView = () => {
  const [prodotti, setProdotti] = useState([]);
  const [primo, setPrimo] = useState(null);
  const [secondo, setSecondo] = useState(null);
  const navigate = useNavigate();

  // Recupera i prodotti dall'API al caricamento del componente
  useEffect(() => {
    fetch(`http://localhost:3001/products`)
      .then((res) => res.json())
      .then((data) => setProdotti(data))
      .catch((err) => console.error("Errore nel fetch dei prodotti:", err));
  }, []);
  console.log(prodotti);

  // Filtra la lista per evitare di selezionare lo stesso prodotto due volte
  const prodottiDisponibili = prodotti.filter(
    (p) => p.id !== (primo ? primo.id : null)
  );

  return (
    <div>
      <h2>Comparatore Prodotti</h2>
      <div style={{ display: "flex", gap: "2rem", marginBottom: "1rem" }}>
        <div>
          <label>Primo prodotto:</label>
          <select
            value={primo ? primo.id : ""}
            onChange={(e) => {
              const prod = prodotti.find((p) => p.id === Number(e.target.value));
              setPrimo(prod);
              if (secondo && secondo.id === prod.id) setSecondo(null);
            }}
          >
            <option value="">Seleziona...</option>
            {prodotti.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Secondo prodotto:</label>
          <select
            value={secondo ? secondo.id : ""}
            onChange={(e) => {
              const prod = prodotti.find((p) => p.id === Number(e.target.value));
              setSecondo(prod);
            }}
            disabled={!primo}
          >
            <option value="">Seleziona...</option>
            {prodottiDisponibili.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div style={{ display: "flex", gap: "2rem" }}>
        {primo && (
          <div style={{ border: "1px solid #ccc", padding: "1rem", flex: 1 }}>
            <h3>{primo.title}</h3>
            <p>{primo.category}</p>
            <p>{primo.price}</p>
          </div>
        )}
        {secondo && (
          <div style={{ border: "1px solid #ccc", padding: "1rem", flex: 1 }}>
            <h3>{secondo.title}</h3>
            <p>{secondo.category}</p>
            <p>{secondo.price}</p>
          </div>
        )}
      </div>
      <button
        className="bottone-azzurro"
        onClick={() => navigate("/products")}>
        Torna alla lista prodotti
      </button>
    </div>
  );
};

export default CompareView;