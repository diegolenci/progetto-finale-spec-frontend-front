import { useState } from "react";

export default function SearchBar({ onSearch, notFound }) {
  
  const [query, setQuery] = useState("");
  // Funzione per gestire il cambiamento del campo di input
  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
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