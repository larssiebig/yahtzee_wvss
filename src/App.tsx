import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Button } from "react-bootstrap"
import Game from './Game';
import diceImage from './assets/two_red_dice.svg'

function App() {
  const numPlayers: number = 2;
  const [startGame, setStartGame] = useState<boolean>(false)

  return (
    <>
        { !startGame ? (
          <div className="bg-container">
            <Container className="selection-container text-center">
              <h1 className="text-center">Play Yahtzee</h1>
              <img className="loader-image" src={diceImage} alt="Dice" />
              
              <Button variant="primary" size="lg" className="start-button"
                onClick={() => setStartGame(true)}>
                Start Game
              </Button>
            </Container>
          </div>
        ) : (
          <Game numPlayers={numPlayers}/>
        )}
    </>
  )
}

export default App
