import { useState } from "react";

const AlfabeticFilter = ({ productList, setProductList }) => {
  const [order, setOrder] = useState("asc"); // asc = A-Z, desc = Z-A
  // Funzione per gestire l'ordinamento
  const handleSort = (direction) => {
    setOrder(direction);
    // Crea una copia della lista dei prodotti e ordina in base al titolo
    // Utilizza il metodo sort per ordinare i prodotti
    const sortedList = [...productList].sort((a, b) => {
      // Confronta i titoli dei prodotti
      if (a.title < b.title) return direction === "asc" ? -1 : 1;
      if (a.title > b.title) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setProductList(sortedList);
  };

  return (
    <div className="alfabetic-filter">
      <button className="a-z" onClick={() => handleSort("asc")}>Ordina A-Z</button>
      <button className="a-z" onClick={() => handleSort("desc")}>Ordina Z-A</button>
    </div>
  );
};

export default AlfabeticFilter;