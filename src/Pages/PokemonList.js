import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Card from ".././Component/Card";

import "./stylePages/PokemonList.css";

const PokemonList = () => {
  // console.log(searchQuery);
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // if (query_pokemon_name === "") {
  const fetchPokemons = useCallback(async (url) => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      setPokemons((prevPokemons) => [
        ...prevPokemons,
        ...response.data.results.map((pokemon) => ({
          name: pokemon.name,
          url: pokemon.url,
          type: [], // Initial empty array for types
          height: null, // Initial null value for height
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonIdFromUrl(
            pokemon.url
          )}.png`,
        })),
      ]);
      setNextUrl(response.data.next);

      await Promise.all(
        response.data.results.map(async (pokemon, index) => {
          const res = await axios.get(pokemon.url);
          setPokemons((prevPokemons) =>
            prevPokemons.map((poke, i) =>
              i === index
                ? {
                    ...poke,
                    type: res.data.types.map((type) => type.type.name), // Extract types
                    height: res.data.height, // Extract height
                  }
                : poke
            )
          );
        })
      );
    } catch (error) {
      console.error("Error fetching pokemons:", error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const fetchPokemonData = async () => {
      await fetchPokemons("https://pokeapi.co/api/v2/pokemon");
    };

    fetchPokemonData();
  }, [fetchPokemons]);
  // https://pokeapi.co/api/v2/pokemon/ditto

  const loadMore = () => {
    if (nextUrl && !loading) {
      fetchPokemons(nextUrl);
    }
  };

  const getPokemonIdFromUrl = (url) => {
    if (!url) return null; // Vérifiez d'abord si l'URL est définie
    const segments = url.split("/");
    return segments[segments.length - 2];
  };

  return (
    <div className="pokemon-list">
      <h2 className="title">POKEDEX</h2>
      <div className="list">
        <div className="pokemon-list-container">
          <div className="pokemon-list-column">
            {pokemons.map((pokemon, index) => (
              <Card key={index} pokemon={pokemon} className="card" /> // Utilisez le composant Card pour afficher chaque Pokemon
            ))}
          </div>
        </div>
      </div>

      <button onClick={loadMore} disabled={loading} className="btn btn-primary">
        Charger plus
      </button>
    </div>
  );
};

export default PokemonList;
