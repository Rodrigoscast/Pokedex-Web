import React, { useEffect, useState } from "react";
import "./style.css";

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonName, setPokemonName] = useState("ditto");

  useEffect(() => {
    const loadAPI = async () => {
      try {
        let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
        let response = await fetch(url);
        let json = await response.json();
        setPokemon(json);
      } catch (error) {
        console.error("Erro ao buscar o Pokémon:", error);
      }
    };

    loadAPI();
  }, [pokemonName]); // Agora só depende de pokemonName

  return (
    <div className="container">
      <header>
        <h1>Pokédex</h1>
      </header>

      <div className="search-box">
        <input
          type="text"
          placeholder="Digite o nome do Pokémon..."
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value.toLowerCase())}
        />
      </div>

      {pokemon ? (
        <div className="pokemon-info">
          <h2>{pokemon.name?.toUpperCase()}</h2>
          <p><strong>Nº:</strong> {pokemon.id}</p>
          <p><strong>Peso:</strong> {pokemon.weight} kg</p>
          <p><strong>Altura:</strong> {pokemon.height} m</p>
          <p><strong>Tipo:</strong> {pokemon.types?.map(t => t.type.name).join(", ")}</p>
          <img src={pokemon.sprites?.front_default} alt={pokemon.name} />
        </div>
      ) : (
        <p>Carregando...</p> // Mensagem enquanto os dados não chegam
      )}
    </div>
  );
}

export default App;
