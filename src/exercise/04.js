// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import { useLocalStorageState } from '../utils'

function Board() {
  //const [squares, setSquares] = useLocalStorageState('squares', Array(9).fill(null));
  const [history, setHistory] = useLocalStorageState('history', [Array(9).fill(null)]);
  const [currentStep, setCurrentStep] = useLocalStorageState('currentStep', 0)

  const squares = history[currentStep];

  const nextValue = calculateNextValue(squares);
  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares, nextValue);
  const historyMode = currentStep > 0;

  function selectSquare(square) {
    if(winner || squares[square]) return;

    const squaresCopy = [...squares];
    squaresCopy[square] = nextValue;

    const historyCopy = [squaresCopy, ...history];

    setHistory(historyCopy);
  }

  function restart() {
    setHistory([Array(9).fill(null)]);
    setCurrentStep(0)
  }
  console.log(history)
  console.log(squares)
  console.log(currentStep)

  function renderSquare(i) {
    console.log('inRenderSquare')
    return (
      <button className="square" onClick={() => !historyMode && selectSquare(i)}>
        { history[currentStep][i] }
      </button>
    )
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="status">{historyMode ? "History Mode" : "Current Game"}</div>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <button 
        onClick={() => setCurrentStep(currentStep + 1)}
        disabled={currentStep === history.length - 1 || history.length < 2}
        >
          Prev
        </button>
        <button 
        onClick={() => setCurrentStep(currentStep - 1)}
        disabled={currentStep === 0}
        >
          Next
        </button>
      </div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={restart}>
        restart
      </button>
    </div>
  )
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
