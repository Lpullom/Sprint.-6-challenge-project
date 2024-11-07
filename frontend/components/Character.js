import React, {useState} from 'react'

function Character({name, homeworld}) { // ❗ Add the props
  const [showHomeworld, setShowHomeworld] = useState(false)
  // ❗ Create a state to hold whether the homeworld is rendering or not

  // ❗ Create a "toggle" click handler to show or remove the homeworld
  const toggleHomeworld = () => {
    setShowHomeworld(!showHomeworld)
  }
  return (
    <div>
      <h2>{name}</h2>
      <button onClick={toggleHomeworld}>
        {showHomeworld ? 'Hide Homeworld' : 'Show Homeworld'}
      </button>
      {showHomeworld && <p> Homeworld: {homeworld}</p>}
    </div>
  )
}

export default Character
