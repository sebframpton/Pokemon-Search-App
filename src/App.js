import logo from "./logo.png";
import "./App.css";
import pokemonData from "./pokemonapi.json";
import React, { useState } from "react";

function App() {
  const [pokemonList, setPokemonList] = useState(pokemonData.results);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.includes(searchTerm)
  );

  const showPokemon = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Error fetching Pokemon: ${response.statusText}`);
      return;
    }

    const data = await response.json();
    setSelectedPokemon(data);
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      alert("Please enter a Pokémon name or ID");
      return;
    }

    try {
      // Try to fetch from PokeAPI directly by name or ID
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
      
      if (!response.ok) {
        alert(`Pokémon "${searchTerm}" not found!`);
        return;
      }

      const data = await response.json();
      setSelectedPokemon(data);
    } catch (error) {
      console.error("Error searching Pokemon:", error);
      alert("Failed to search. Please try again.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="App">
      <header>
        <img alt="pokemon logo" className="logo" src={logo} />
      </header>
      
      <div className="pokedex">
        {/* Left Panel */}
        <div className="left-panel">
          {/* Top lights */}
          <div className="top-lights">
            <div className="main-light" />
            <div className="small-lights">
              <div className="small-light red-light" />
              <div className="small-light yellow-light" />
              <div className="small-light green-light" />
            </div>
          </div>

          {/* Main screen */}
          <div className="main-screen">
            <div className="screen-content">
              {selectedPokemon ? (
                <>
                  <img
                    className="pokemon-image"
                    src={selectedPokemon.sprites.front_default}
                    alt={selectedPokemon.name}
                  />
                  <div className="pokemon-name">{selectedPokemon.name}</div>
                  <div className="pokemon-id">#{selectedPokemon.id}</div>
                </>
              ) : (
                <div className="pokemon-name">Select a Pokémon</div>
              )}
            </div>
          </div>

          {/* Search section */}
          <div className="search-section">
            <input
              className="search-input"
              type="text"
              placeholder="Search Pokémon..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              onKeyPress={handleKeyPress}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
            <button 
              className="search-button" 
              onClick={handleSearch}
              type="button"
            >
              Search Pokémon
            </button>
          </div>

          {/* Controls */}
          <div className="controls">
            <div className="speaker">
              <div className="speaker-line" />
              <div className="speaker-line" />
              <div className="speaker-line" />
              <div className="speaker-line" />
            </div>
            <div className="red-button" />
          </div>

          {/* Green section */}
          <div className="green-section" />

          {/* Bottom controls */}
          <div className="bottom-controls">
            <div className="dpad">
              <div className="dpad-button dpad-up" />
              <div className="dpad-button dpad-down" />
              <div className="dpad-button dpad-left" />
              <div className="dpad-button dpad-right" />
              <div className="dpad-button dpad-center" />
            </div>
            <div className="action-buttons">
              <button className="action-button" />
              <button className="action-button" />
            </div>
          </div>
        </div>

        {/* Hinge */}
        <div className="hinge" />

        {/* Right Panel */}
        <div className="right-panel">
          {/* Right screen with Pokemon data */}
          <div className="right-screen">
            {selectedPokemon ? (
              <div>
                <h3>{selectedPokemon.name}</h3>
                <p>Height: {selectedPokemon.height}</p>
                <p>Weight: {selectedPokemon.weight}</p>
                <p>Type: {selectedPokemon.types.map(t => t.type.name).join(', ')}</p>
                <br />
                <strong>Stats:</strong>
                {selectedPokemon.stats.map((stat, index) => (
                  <div key={index}>
                    <p>
                      {stat.stat.name}: {stat.base_stat}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No Pokémon selected</p>
            )}
          </div>

          {/* Blue grid */}
          <div className="blue-grid">
            <div className="grid-cell" />
            <div className="grid-cell" />
            <div className="grid-cell" />
            <div className="grid-cell" />
            <div className="grid-cell" />
            <div className="grid-cell" />
            <div className="grid-cell" />
            <div className="grid-cell" />
            <div className="grid-cell" />
            <div className="grid-cell" />
          </div>

          {/* Right controls */}
          <div className="right-controls">
            <div className="white-buttons">
              <div className="white-button" />
              <div className="white-button" />
            </div>
            <div className="yellow-button" />
          </div>

          {/* Bottom green buttons */}
          <div className="bottom-green-buttons">
            <div className="green-button" />
            <div className="green-button" />
          </div>

          {/* Pokemon List */}
          <ul className="scroll-list">
            {filteredPokemonList.map((pokemon) => (
              <li key={pokemon.name} className="pokemon-item">
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  showPokemon(pokemon.url);
                }}>
                  {pokemon.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
