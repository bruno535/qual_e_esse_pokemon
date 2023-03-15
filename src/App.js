import React, { useState, useEffect } from 'react';
import './App.css'

const App = () => {
  // Define the state for the Pokemon name and image
  const [pokemon, setPokemon] = useState({
    name: '',
    image: '',
  });

  // Define the state for the random Pokemon ID
  const [randomPokemonId, setRandomPokemonId] = useState(
    Math.floor(Math.random() * 150) + 1
  );

  // Use the useEffect hook to fetch the Pokemon data from the API
  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`
      );
      const data = await response.json();
      const pokemonName =
        data.name.charAt(0).toUpperCase() + data.name.slice(1);
      setPokemon({
        name: pokemonName,
        image: data.sprites.other.dream_world.front_default,
      });
      console.log();
    };
    fetchPokemon();
  }, [randomPokemonId]);

  // Define the state for the input value
  const [inputValue, setInputValue] = useState('');

  // Define the handleChange function to update the input value
  const handleChange = (event) => {
    const name =
      event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1);
    setInputValue(name);
  };

  // Define the state for showing the answer
  const [showAnswer, setShowAnswer] = useState(false);

  // Define the Answer component to display the answer status
  const Answer = () => {
    if (inputValue === pokemon.name) {
      return (
        <p className="fontResp" style={{ color: 'green' }}>
          Resposta Correta
        </p>
      );
    } else if (inputValue !== pokemon.name && inputValue !== '') {
      return (
        <p className="fontResp" style={{ color: 'red' }}>
          Resposta Incorreta
        </p>
      );
    } else {
      setShowAnswer(false);
    }
    return null;
  };

  // Define the ShowAnswer component to display the Pokemon name and answer status
  const ShowAnswer = () => (
    <div className="mostrarNome">
      <p className="fontNome">{pokemon.name}</p>
      <Answer />
    </div>
  );

  // Define the reset function to reset the game
  const reset = () => {
    setRandomPokemonId(Math.floor(Math.random() * 150) + 1);
    setShowAnswer(false);
    setInputValue('');
  };

  return (
    <>
      <div className="imgPk">
        <img
          className="img1"
          src="https://i.imgur.com/thVplcN.png"
          border="0"
        />
        <img
          className="img2"
          style={{
            filter: `${!showAnswer ? 'brightness(0)' : 'drop-shadow(2px 3px 6px black)'
              }`,
          }}
          src={pokemon.image}
          alt={pokemon.name}
        />
      </div>
      <main>
        <input
          className="inputName"
          type="text"
          value={inputValue}
          placeholder="Nome do Pokemon"
          onChange={handleChange}
        />
        <button className="button" onClick={() => setShowAnswer(true)}>
          Mostrar Resposta
        </button>
        {showAnswer && (
          <>
            <ShowAnswer />
            <button className="button" onClick={reset}>
              Resetar
            </button>
          </>
        )}
      </main>
    </>
  );
};

export default App;
