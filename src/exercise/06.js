// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react';
import { PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView } from '../pokemon';
import { ErrorBoundary } from 'react-error-boundary'

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({ status: 'idle', pokemon: null, error: null})

  const { status, pokemon, error } = state;
  React.useEffect(() => {
    if(pokemonName) {
      setState({status: 'pending'})
      fetchPokemon(pokemonName)
      .then(pokemon => {
        setState({status: 'resolved', pokemon})
      })
      .catch(error => {
        setState({status: 'rejected', error})
      })
    }
    return () => {
      setState({status: 'idle', pokemon: null, error: null})
    }
  }, [pokemonName])

  switch(status) {
    case 'idle':
      return 'Submit a pokemon';
    case 'pending':
      return <PokemonInfoFallback name={pokemonName} />
    case 'resolved':
      return <PokemonDataView pokemon={pokemon} />;
    case 'rejected':
      throw error;
    default:
      return 'Submit a pokemon';
  }
}

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary FallbackComponent={ ErrorFallback } resetKeys={[pokemonName]} onReset={() => setPokemonName('')}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}



export default App
