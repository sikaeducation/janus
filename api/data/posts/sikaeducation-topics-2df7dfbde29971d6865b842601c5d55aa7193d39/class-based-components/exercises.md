Convert the following functional components to class components:

```js
const FormInput = () => {
  const [inputValue, setInputValue] = useState("")
  const updateValue = event => setInputValue(event.target.value)

  return (
    <fieldset className="FormInput">
      <label htmlFor="form-input">Username</label>
      <input id="form-input" type="text" value={inputValue} onChange={updateValue} />
    </fieldset>
  )
}
```

---

```js
const LoginForm = ({login}) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const updateUsername = event => setUsername(event.target.value)
  const updatePassword = event => setPassword(event.target.value)
  const handleSubmit = event => {
    event.preventDefault()
    login(username, password)
  }

  return (
    <form className="LoginForm" onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input type="text" id="username" required value={username} onChange={updateUsername} />

      <label htmlFor="password">Password</label>
      <input type="password" id="password" required value={password} onChange={updatePassword} />

      <input type="submit" value="Login" />
    </form>
  )
}
```

---

```js
import { useState, useEffect } from "react"

const PokemonCard = ({ name }) => {
  const [pokemon, setPokemon] = useState({})
  const [error, setError] = useState(false)

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`
    fetch(url)
      .then(response => response.json())
      .then(pokemon => {
        setError(false)
        setPokemon(pokemon)
      }).catch(error => setError(true))
  }, [name])

  return (
    <div className="PokemonCard">
      {
        pokemon.name
          ? (
            <h2>{pokemon.name}</h2>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          )
          : <span>Loading...</span>
      }
      {
        error
          ? <span>There was a problem loading this Pokemon.</span>
          : null
      }
    </div>
  )
}
```
