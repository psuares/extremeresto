import './App.css';
import {useState, useEffect} from 'react'
import Square from "./Componets/Square";
import { Patterns } from "./Patterns";
function App() {
const [board,setBoard] = useState(["","","","","","","","",""])
const [player,setPlayer] = useState("O");
const [result,setResult] = useState({ Winner : "none", State: "none" }) 

useEffect(()=>{
checkWin();
checkTie();
if (player == "X")
{
  setPlayer("O");
}else
{ setPlayer("X");
}

}, [board]);

useEffect(()=>{
  if (result.State != "none"){

 alert(`game finished! winning Player: ${result.Winner}`);
 restartGame();
}
},[result]);  

  const chooseSquare = (square) =>{
    setBoard(
      board.map((val,idx) =>{
        if (idx == square && val == "") {
          return player;
        }
        return val;
      
      })
    );
}
const checkWin = () => {
  Patterns.forEach((currPattern) => {
    const firstPlayer = board[currPattern[0]];
    if (firstPlayer == "") return;
    let foundWinningPattern = true
    currPattern.forEach((idx) => {
      if (board[idx] != firstPlayer) {
        foundWinningPattern = false

      }
    })
    if (foundWinningPattern == true) {
      setResult({Winner:player, State:"Won"})

    }
  });
};
const checkTie = () => {
  let filled = true;
  board.forEach((square) => {
    if (square == "") {
      filled = false;
    } 
  });
  if (filled) {
    setResult({Winner: "No one", State: "Tie"});
  }
}
const restartGame = () => {
setPlayer("O");
setBoard(["","","","","","","","",""]);
}
return (

    <div className="App">
      <div className="board">
      <div className="row">
        <Square val={board[0]} chooseSquare={()=>{chooseSquare(0)}}/>
        <Square val={board[1]} chooseSquare={()=>{chooseSquare(1)}}/>
        <Square val={board[2]} chooseSquare={()=>{chooseSquare(2)}}/>
      </div>
      <div className="row">
        <Square val={board[3]} chooseSquare={() => {chooseSquare(3)}}/>
        <Square val={board[4]} chooseSquare={() => {chooseSquare(4)}}/>
        <Square val={board[5]} chooseSquare={() => {chooseSquare(5)}}/>
      </div>
      <div className="row">
        <Square val={board[6]} chooseSquare={() => {chooseSquare(6)}}/>
        <Square val={board[7]} chooseSquare={() => {chooseSquare(7)}}/>
        <Square val={board[8]} chooseSquare={() => {chooseSquare(8)}}/>
      </div>
      </div>
    </div>
  );
}

export default App;
