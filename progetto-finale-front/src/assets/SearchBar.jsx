import { useState, useEffect } from "react";

export default function SearchBar({ onSearch, notFound }) {
  
  // Stato per gestire la query di ricerca
  const [query, setQuery] = useState("");

  // Debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(query);
    }, 400);
    return () => clearTimeout(handler);
  }, [query, onSearch]);

  // Gestione del cambiamento dell'input 
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Cerca per nome..."
        value={query}
        onChange={handleChange}
        style={{
          padding: "8px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginBottom: "10px",
          marginLeft: "16px",
        }}
      />
      {notFound && (
        <div style={{ color: "black", display: "flex", justifyContent: "center", alignItems: "center", height: "50px", fontSize: "1.5rem", fontWeight:"bold" }}>
          prodotto non trovato...
        </div>
      )}
    </div>
  );
}