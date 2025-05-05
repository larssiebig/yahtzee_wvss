import diceFace1 from '../assets/die_face_1b.svg'
import diceFace2 from '../assets/die_face_2b.svg'
import diceFace3 from '../assets/die_face_3b.svg'
import diceFace4 from '../assets/die_face_4b.svg'
import diceFace5 from '../assets/die_face_5b.svg'
import diceFace6 from '../assets/die_face_6b.svg'

const diceImages: Record<string, string> = {
  "1": diceFace1,
  "2": diceFace2,
  "3": diceFace3,
  "4": diceFace4,
  "5": diceFace5,
  "6": diceFace6
};

interface Props {
  rolledDice: number[],
  rollCount: number,
  maxRollCount: number,
  isRolling: boolean,
  selectedDice: boolean[],
  toggleSelect: (index: number) => void
}


function DiceContainer({ rolledDice, rollCount, maxRollCount, isRolling, selectedDice, toggleSelect }: Props) {
  return (
    <>
      <div className="dice-container">
        {rolledDice.map((value, index) => (
          <img
            key={index}
            className="dice"
            src={diceImages[value]}
            alt={`Die face ${value}`}
            onClick={() => toggleSelect(index)}
            style={{
              border: selectedDice[index] && rollCount < maxRollCount ? "3px solid blue" : "none",
              cursor: "pointer", borderRadius: "20%", transition: isRolling ? "opacity 0.45s" : "none"
            }}
          />
        ))}
      </div>
    </>
  )
}

export default DiceContainer