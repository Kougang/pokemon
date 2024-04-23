import "./App.css";
// import axios from "axios";
import PokemonList from "./Pages/PokemonList";
import PokemonDetail from "./Pages/PokemonDetail";
import SearchBar from "./Component/SearchBar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useState } from "react";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
    // console.log("query:", query);
  };
  // console.log("searchQuery:", searchQuery);
  // searchQuery={searchQuery}
  return (
    <Router>
      <div className="App">
        <SearchBar onClick={handleSearch} />
        <Link to="/" style={{ textDecoration: "none" }} className="MyLink">
          Main_Page
        </Link>
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route
            path="/pokemon/:pokemonName"
            element={<PokemonDetail searchQuery={searchQuery} />}
          />
          {searchQuery && (
            <Route
              path="/pokemon/:pokemonName"
              element={<PokemonDetail searchQuery={searchQuery} />}
            />
          )}
          {/* Ajoutez d'autres routes ici */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
