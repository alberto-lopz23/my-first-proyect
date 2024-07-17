import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { Square } from './conponents/Square.jsx'
import { TURNS, WINNER_COMBOS } from './constant.js'




function App() {
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )

  const [turn, setTurn] = useState(TURNS.X)

  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
       return boardToCheck[a]
    }
    
   }
   return null
  }


  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti({
        particleCount: 100,
        spread: 70
      })
        
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {

      setWinner(false)
    }
  }

  const checkEndGame = (board) => {
    return board.every((square) => square !== null)
  }

  return (
    <main className="board">

      <h1>tic tac toe</h1>
      <button onClick={resetGame}>Reset Game</button>
      <section className="game">
        {
          board.map((_, index) => {
            return (
              <Square

                key={index}
                index={index}
                updateBoard={updateBoard}

              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>

      </section>

      {
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1342569090.
        winner !== null && ( 
          <section className="winner"> 
          <div className='text'>
            <h2>
              { 
              winner === false 
              ? 'Empate' 
              : 'Ganó:'
              }
            </h2>

            <header className="win"> 
            {winner && <Square>{winner}</Square>}
            </header>

            <footer>
              <button onClick={resetGame}>Start again</button>
            </footer>
          </div>
          </section>
        )
      }
    </main>
  )
}

export default App
