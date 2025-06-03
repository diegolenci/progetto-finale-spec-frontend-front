import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  // Funzione per gestire il cambiamento del campo di input
  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Cerca per nome..."
      value={query}
      onChange={handleChange}
      style={{
        padding: "8px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        marginBottom: "16px",
        width: "15%"
      }}
    />
  );
}