import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ onClick }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onClick(searchTerm);
    navigate(`/pokemon/${searchTerm}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search Pokémon..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;

// import React, { useState } from "react";
// import "./style/SearchBar.css";

// const SearchBar = ({ onClick }) => {
//   const [inputValue, setInputValue] = useState(""); // État local pour stocker la valeur de l'entrée

//   const handleSearch = () => {
//     onClick(inputValue);
//     // console.log(inputValue);
//   };

//   const handleChange = (event) => {
//     setInputValue(event.target.value); // Mettre à jour l'état local avec la nouvelle valeur de l'entrée
//     // console.log(event.target.value);
//   };

//   return (
//     <div className="search-bar">
//       <input
//         type="text"
//         placeholder="Rechercher un Pokémon..."
//         value={inputValue} // Utiliser la valeur de l'état local comme valeur de l'entrée
//         onChange={handleChange} // Appeler la fonction de gestion de changement pour mettre à jour l'état local
//       />
//       <button onClick={handleSearch}>search</button>
//     </div>
//   );
// };

// export default SearchBar;
