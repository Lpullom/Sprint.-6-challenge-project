import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Character from './Character';

const urlPlanets = 'http://localhost:9009/api/planets';
const urlPeople = 'http://localhost:9009/api/people';

function App() {
  const [characterData, setCharacterData] = useState([]);

  useEffect(() => {
    async function getCharacters() {
      try {
        const [planetsResponse, peopleResponse] = await Promise.all([
          axios.get(urlPlanets),
          axios.get(urlPeople)
        ]);

        const planets = planetsResponse.data;
        const people = peopleResponse.data;

        const characters = people.map((person) => {
          const homeworld = planets.find((planet) => planet.id === person.homeworld);
          return {
            ...person,
            homeworld: homeworld ? homeworld.name : 'Unknown'
          };
        });

        setCharacterData(characters);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    }

    getCharacters();
  }, []);

  return (
    <div>
      <h2>Star Wars Characters</h2>
      <p>See the README of the project for instructions on completing this challenge</p>
      {characterData.map((character) => (
        <Character
          key={character.id}
          name={character.name}
          homeworld={character.homeworld}
        />
      ))}
    </div>
  );
}

export default App;

// ❗ DO NOT CHANGE THE CODE BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = App;
