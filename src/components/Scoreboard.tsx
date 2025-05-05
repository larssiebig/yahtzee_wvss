import { Table } from "react-bootstrap"
import { upperSectionCategories, lowerSectionCategories } from "../Categories";

interface Scoreboard {
  player: number;
  scores: Record<string, number | null>;
  upperSectionScore: number;
  totalScore: number
}

interface ScoreboardProps {
  currentPlayer: number,
  scores: Scoreboard[];
  enterScore: (player: number, category: string) => void;
}


function ScoreBoard({ currentPlayer, scores, enterScore }: ScoreboardProps) {
  return (
    <>
      <div className="scoreboard">
        <Table responsive bordered striped>
          <thead>
            <tr>
              <th className="font-bold"> </th>
              {scores.map(p =>
                <th key={p.player} className={p.player === currentPlayer + 1 ? "active" : ""}>Player {p.player}</th>
              )}
            </tr>
          </thead>

          <tbody>
            <>
              {upperSectionCategories.map(({ title, description, id }) => (
                <tr key={id}>
                  <td style={{ display: "flex", flexDirection: "column" }}>
                    {title}
                    <span style={{ fontSize: "12px", color: "#707070" }}>({description})</span>
                  </td>
                  {scores.map(p => (
                    <td
                      key={`${p.player}-${id}`}
                      onClick={() => enterScore(p.player, id)}
                      className={p.scores[id] === null && p.player == currentPlayer + 1 ? "clickable" : "disabled"}>
                      {p.scores[id] !== null ? p.scores[id] : " "}
                    </td>
                  ))}
                </tr>
              ))}

              <tr>
                <td style={{ display: "flex", flexDirection: "column" }}>
                  Bonus
                  <span style={{ fontSize: "12px", color: "#707070" }}>(35 points if sum {'>='} 63)</span>
                </td>
                {scores.map(p =>
                  <td key={`${p.player}-section-score`}>{p.upperSectionScore}</td>
                )}
              </tr>
            </>

            <>
              {lowerSectionCategories.map(({ title, description, id }) => (
                <tr key={id}>
                  <td style={{ display: "flex", flexDirection: "column" }}>
                    {title}
                    <span style={{ fontSize: "12px", color: "#707070" }}>({description})</span>
                  </td>
                  {scores.map(p => (
                    <td
                      key={`${p.player}-${id}`}
                      onClick={() => enterScore(p.player, id)}
                      className={p.scores[id] === null && p.player == currentPlayer + 1 ? "clickable" : "disabled"}>
                      {p.scores[id] !== null ? p.scores[id] : " "}
                    </td>
                  ))}
                </tr>
              ))}

              <tr>
                <td style={{ display: "flex", flexDirection: "column" }}>
                  Total
                </td>
                {scores.map(p =>
                  <td key={`${p.player}-total`}>{p.totalScore}</td>
                )}
              </tr>
            </>
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default ScoreBoard