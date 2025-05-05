import { Button, Container, Navbar, Row, Col } from 'react-bootstrap'
import { useState } from 'react'
import { yahtzeeCategories } from './Categories'
import DiceContainer from './components/DiceContainer'
import ScoreBoard from './components/Scoreboard'


interface GameProps {
  numPlayers: number;
}

interface Scoreboard {
  player: number;
  scores: Record<string, number | null>;
  upperSectionScore: number;
  totalScore: number
}

function Game({ numPlayers }: GameProps) {
  const [currentPlayer, setCurrentPlayer] = useState<number>(0);
  const [rolledDice, setRolledDice] = useState<number[]>(Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1));
  const [selectedDice, setSelectedDice] = useState<boolean[]>([false, false, false, false, false]);
  const [rollCount, setRollCount] = useState<number>(0);
  const maxRollCount = 2;
  const categoriesJSON = yahtzeeCategories;
  const [isRolling, setIsRolling] = useState(true);
  const bonusCategories = ["ones", "twos", "threes", "fours", "fives", "sixes"];
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const [scores, setScores] = useState<Scoreboard[]>(Array.from({ length: numPlayers }, (_, i) => ({
    player: i + 1,
    scores: Object.fromEntries(categoriesJSON.map(({ id }) => [id, null])),
    upperSectionScore: -63,
    totalScore: 0
  })));

  const rollDice = () => {
    if (rollCount < maxRollCount && selectedDice.some(v => v)) {
      setIsRolling(true);
      setRolledDice(prev =>
        prev.map((value, index) => (selectedDice[index] ? Math.floor(Math.random() * 6) + 1 : value))
      );
      setRollCount(prev => prev + 1);
      setSelectedDice([false, false, false, false, false]);
      setIsRolling(false);
    }
  };

  const toggleSelect = (index: number) => {
    setSelectedDice(prev => {
      const newSelection = [...prev];
      newSelection[index] = !newSelection[index];
      return newSelection;
    });
  };

  const enterScore = (playerId: number, category: string) => {
    if (playerId - 1 !== currentPlayer) return;

    setScores((prevScores) => {
      return prevScores.map((player) => {
        if (player.player !== playerId) return player;

        const scoreValue: number = calculateScore(category, rolledDice);
        if (player.scores[category] !== null) return player; // Prevent overwriting

        const isBonusCategory: boolean = bonusCategories.includes(category);

        // Update upper section score
        let newUpperSectionScore = player.upperSectionScore;
        if (isBonusCategory) {
          newUpperSectionScore += scoreValue;
        }

        // Apply +35 bonus if upper section reaches 0 or more
        if (player.upperSectionScore < 0 && newUpperSectionScore >= 0) {
          newUpperSectionScore += 35;
        }

        return {
          ...player,
          scores: { ...player.scores, [category]: scoreValue },
          totalScore: newUpperSectionScore > 0 ? player.totalScore + scoreValue + newUpperSectionScore : player.totalScore + scoreValue,
          upperSectionScore: newUpperSectionScore,
        };
      });
    });

    // Use useEffect to check game over state AFTER state updates
    setTimeout(() => {
      setScores((updatedScores) => {
        const gameOver = updatedScores.every((p) =>
          Object.values(p.scores).every((score) => score !== null)
        );

        setIsGameOver(gameOver);
        // console.log("Game Over:", gameOver);
        return updatedScores;
      });
    }, 100);

    // Move to next player
    setCurrentPlayer((prev) => (prev + 1) % numPlayers);
    resetCurrentRound();
  };



  const resetCurrentRound = () => {
    setRollCount(0);
    setSelectedDice([false, false, false, false, false]);
    setRolledDice(Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1));
  }

  const calculateScore = (category: string, dice: number[]): number => {
    const counts = dice.reduce((acc, face) => { acc[face] = (acc[face] || 0) + 1; return acc; }, {} as Record<number, number>);
    const sum = dice.reduce((a, b) => a + b, 0);

    switch (category) {
      case "ones":
        return dice.filter(d => d === 1).length * 1;
      case "twos":
        return dice.filter(d => d === 2).length * 2;
      case "threes":
        return dice.filter(d => d === 3).length * 3;
      case "fours":
        return dice.filter(d => d === 4).length * 4;
      case "fives":
        return dice.filter(d => d === 5).length * 5;
      case "sixes":
        return dice.filter(d => d === 6).length * 6;
      case "three-of-a-kind": return Object.values(counts).some(c => c >= 3) ? sum : 0;
      case "four-of-a-kind": return Object.values(counts).some(c => c >= 4) ? sum : 0;
      case "full-house": return Object.values(counts).includes(3) && Object.values(counts).includes(2) ? 25 : 0;
      case "small-straight": return ([1, 2, 3, 4].every(n => counts[n]) || [2, 3, 4, 5].every(n => counts[n]) || [3, 4, 5, 6].every(n => counts[n])) ? 30 : 0;
      case "large-straight": return ([1, 2, 3, 4, 5].every(n => counts[n]) || [2, 3, 4, 5, 6].every(n => counts[n])) ? 40 : 0;
      case "yahtzee": return Object.values(counts).includes(5) ? 50 : 0;
      case "chance": return sum;
      default: return 0;
    }
  };

  return (
    <>
      <Navbar sticky="top" className="bg-body-tertiary topbar">
        <Container>
          <Navbar.Brand>Yahtzee</Navbar.Brand>
        </Container>
      </Navbar>

      <Container fluid="lg">
        <Row>
          <Col xs={12} md={9}>
            <Navbar className="bg-body-tertiary topbar">
              <Container>
                <Navbar.Brand style={{ width: "100%", textAlign: "center", display: isGameOver ? "none" : "block" }}>
                  <b style={{ color: "blue" }}>Player {currentPlayer + 1}</b> may roll dice
                </Navbar.Brand>
              </Container>
            </Navbar>

            <DiceContainer
              rolledDice={rolledDice}
              rollCount={rollCount}
              maxRollCount={maxRollCount}
              selectedDice={selectedDice}
              isRolling={isRolling}
              toggleSelect={toggleSelect}
            />

            <div className="button-container m-4 text-center">
              <Button variant="primary" onClick={rollDice} disabled={rollCount >= maxRollCount || !selectedDice.some(v => v) || isGameOver}>
                Roll Dice ({rollCount}/{maxRollCount})
              </Button>
            </div>

            <ScoreBoard scores={scores} currentPlayer={currentPlayer} enterScore={enterScore} />
          </Col>

          <Col xs={12} md={3}>
            <div className="player-boards">
              {scores.map(player =>
                <div
                  key={`${player.player}-board`}
                  className="player-board"
                  style={{ padding: "0.5rem", fontWeight: "500" }}>
                  Player {player.player} : {player.totalScore}
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Game