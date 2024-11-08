import React, { useState, useEffect } from 'react';
import axios from 'axios';

const urlPlanets = 'http://localhost:9009/api/planets';
const urlPeople = 'http://localhost:9009/api/people';

function App() {
  const [characters, setCharacters] = useState([]);
  const [planets, setPlanets] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [peopleResponse, planetsResponse] = await Promise.all([
          axios.get(urlPeople),
          axios.get(urlPlanets),
        ]);
        setCharacters(peopleResponse.data);
        setPlanets(planetsResponse.data)
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const getHomeworldName = (homeworldIdOrUrl) => {
    const homeworld = planets.find(
      (planet) => planet.id === homeworldIdOrUrl || planet.url === homeworldIdOrUrl
    )
    return homeworld ? homeworld.name : 'Unknown'
  }

  return (
    <div>
      <h2>Star Wars Characters</h2>
      {characters.length > 0 ? (
        characters.map((character) => (
          <CharacterCard 
          key={character.id} 
          character={character}
          getHomeworldName={getHomeworldName} 
          />
        ))
      ) : (
        <p>Loading characters...</p>
      )}
    </div>
  );
}

function CharacterCard({ character, getHomeworldName }) {
  const [showHomeworld, setShowHomeworld] = useState(false);

  const toggleHomeworld = () => {
    setShowHomeworld((prevShow) => !prevShow);
  };

  return (
    <div>
      <h3 className="character-name">{character.name}</h3>
      <button onClick={toggleHomeworld}>
        {showHomeworld ? 'Hide Homeworld' : 'Show Homeworld'}
      </button>
      {showHomeworld  && (
        <p>Homeworld: {getHomeworldName(character.homeworld)}</p>
      )}
    </div>
  );
}

export default App;

// ❗ DO NOT CHANGE THE CODE BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = App;
