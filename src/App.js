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

  return (
    <div className="App">
      <header>
        <img alt="pokemon logo" className="logo" src={logo} />
      </header>
      <>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Pokédex Interface</title>
        <style
         
        />
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
              <main>
                {selectedPokemon && (
                  <div className="pokedex">
                    <h2>{selectedPokemon.name}</h2>
                    <img
                      src={selectedPokemon.sprites.front_default}
                      alt={selectedPokemon.name}
                    />

                    {selectedPokemon.stats.map((stat, index) => (
                      <div key={index}>
                        <p></p>
                      </div>
                    ))}
                  </div>
                )}
              </main>
            </div>
            {/* Search section */}
            <div className="search-section">
              <div className="pokedex">
                <input
                  className="search-box"
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>

              <button className="search-button" onclick="searchPokemon()">
                Search Pokémon
              </button>
            </div>
            {/* Controls */}
            <div className="controls">
              <div className="red-button" onclick="randomPokemon()" />
              <div className="speaker">
                <div className="speaker-line" />
                <div className="speaker-line" />
                <div className="speaker-line" />
                <div className="speaker-line" />
              </div>
            </div>

            {/* Green section */}
            <div className="green-section" />
            {/* Bottom controls */}
            <div className="bottom-controls">
              <div className="dpad">
                <div
                  className="dpad-button dpad-up"
                  onclick="previousPokemon()"
                />
                <div
                  className="dpad-button dpad-down"
                  onclick="nextPokemon()"
                />
                <div
                  className="dpad-button dpad-left"
                  onclick="previousPokemon()"
                />
                <div
                  className="dpad-button dpad-right"
                  onclick="nextPokemon()"
                />
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
            <div className="right-screen" id="rightScreen">
              <main>
                {selectedPokemon && (
                  <div className="pokedex">
                    <h2>{selectedPokemon.name}</h2>
                    <img
                      src={selectedPokemon.sprites.front_default}
                      alt={selectedPokemon.name}
                    />
                    <p>Height: {selectedPokemon.height}</p>
                    <p>Weight: {selectedPokemon.weight}</p>

                    {selectedPokemon.stats.map((stat, index) => (
                      <div key={index}>
                        <p>
                          {stat.stat.name}: {stat.base_stat}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </main>
            
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
          </div>
          <ul style={{ overflow: "scroll", width: "200px" }}>
            {filteredPokemonList.map((pokemon) => (
              <li key={pokemon.id} className="pokemon-item">
                <a href="#" onClick={() => showPokemon(pokemon.url)}>
                  {pokemon.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </>
    </div>
  );
}

export default App;
