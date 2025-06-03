import { useState } from "react";

export default function FilterBar({ categories, onFilter }) {
  const [selected, setSelected] = useState("");

  const handleChange = (e) => {
    setSelected(e.target.value);
    onFilter(e.target.value);
  };

  return (
    <select value={selected} onChange={handleChange} style={{
      padding: "8px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      marginBottom: "16px",
      marginLeft: "16px",
    }}>
      <option value="">Tutte le categorie</option>
      {categories.map(cat => (
        <option key={cat} value={cat}>{cat}</option>
      ))}
    </select>
  );
}