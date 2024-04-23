import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import "./stylePages/PokemonDetail.css";

const PokemonDetail = ({ searchQuery }) => {
  let { pokemonName } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(searchQuery);

  useEffect(() => {
    if (pokemonName) {
      fetchPokemonDetails(pokemonName);
    } else if (searchQuery) {
      fetchPokemonDetails(searchQuery);
    }
  }, [pokemonName, searchQuery]);

  const fetchPokemonDetails = async (name) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      setPokemon(response.data);
    } catch (error) {
      console.error("Error fetching pokemon details:", error);
    }
    setLoading(false);
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!pokemon) {
    return <div>Pokémon non trouvé</div>;
  }

  const color_s = [
    "#FF6347",
    "#4682B4",
    "#32CD32",
    "#BA55D3",
    "#FFD700",
    "#00FF00",
    "#FF00FF",
    "#800080",
  ];
  const randomColor = color_s[Math.floor(Math.random() * color_s.length)];

  return (
    <div className="pokemon-detail" style={{ backgroundColor: randomColor }}>
      <div className="block1">
        <p className="pokeName">
          <h1>{pokemon.name}</h1>
        </p>

        <p className="pokImage">
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="detailsImage"
          />
        </p>
      </div>

      <div className="block2">
        <p>ID: {pokemon.id}</p>
        <p>Type: {pokemon.types.map((type) => type.type.name).join(", ")}</p>
        <p>Weight: {pokemon.weight}</p>
        <p>Height: {pokemon.height}</p>
      </div>
    </div>
  );
};
export default PokemonDetail;
