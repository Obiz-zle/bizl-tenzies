import { useState, useEffect } from 'react'
import './App.css'
import { nanoid } from "nanoid"
import Die from "./components/Die"
import Confetti from "react-confetti"

function App() {
 


  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [numberOfRolls, setNumberOfRolls] = useState(0);
  const [highScoreRolls, setHighScoreRolls] = useState(parseInt(localStorage.getItem("lowestRolls")) || 50);
  const [finishTime, setFinishTime] = useState(0);
  const [bestTime, setBestTime] = useState(parseInt(localStorage.getItem("bestTime")) || 120000);
  const [dieCustom, setDieCustom] = useState({colorDot:"", colorSide:""});

  const [gitStateTest, setTGitStateTest] = useState(0);
  


  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
        setTenzies(true)
    }
    }, [dice]);



  useEffect(() => {
    if(tenzies && numberOfRolls <= highScoreRolls){
      localStorage.setItem("lowestRolls", numberOfRolls);
      setHighScoreRolls(numberOfRolls);
    }
    else{
      localStorage.setItem("lowestRolls", highScoreRolls);
    }
  }, [tenzies]);



  useEffect(()=>{
  const gameTime = Date.now() - parseInt(localStorage.getItem("startTime"));

  if(tenzies){
  
    if(gameTime <= bestTime){
      localStorage.setItem("bestTime", gameTime);
      setBestTime(gameTime);
    }
    else{
          localStorage.setItem("bestTime", bestTime );
      }

    }

    setFinishTime(gameTime);
  
  },[tenzies]);




  function generateNewDie(){
    return(
      {
        value: Math.floor(Math.random()* 6) + 1,
        isHeld: false,
        id: nanoid()
      }

    );
  }

  function allNewDice(){
    const newDice = [];
    for(let i = 0; i < 10; i++){
      newDice.push(generateNewDie());
    }
    return newDice
  }

  
    function holdDice(id) {
      setDice(oldDice => oldDice.map(die => {
          return die.id === id ? 
              {...die, isHeld: !die.isHeld} :
              die
      }))
  }


  


  function rollDice() {
    
    if(!tenzies) {
        setNumberOfRolls(previousNumber => previousNumber + 1);
        
        setDice(oldDice => oldDice.map(die => {
            return die.isHeld ? 
                die :
                generateNewDie()
        }))
    } else {
        setTenzies(false);
        setDice(allNewDice());
        setNumberOfRolls(0);
    }

    if(numberOfRolls < 1){
      localStorage.setItem("startTime", Date.now());
    }
}



 
  const diceElements = dice.map(die => 
    <Die 
      key={die.id} 
      value={die.value}
      isHeld={die.isHeld} 
      id={die.id} 
      holdDice={() => holdDice(die.id)}
      dieSidesColor = {dieCustom.colorSide}
      dieDotsColor= {dieCustom.colorDot}
      
    />);




    function diceChange(event){
      setDieCustom(prevCustom =>{
        return(
          {...prevCustom, [event.target.name]: event.target.value}
        );
      });

    }








  return (
    <>
    
      <main>
            {tenzies && <Confetti /> }
            
            <h1 className="title">Obizzle@TENZIES</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
            {diceElements}
            </div>

            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll Dice"}
            </button>
            {tenzies && <h3>Number of Rolls:{numberOfRolls}</h3>}
            {tenzies && <h3>Lowest Rolls:{localStorage.getItem("lowestRolls")}</h3>}
            {tenzies && <h3>Finish Time:{finishTime/1000}secs</h3>}
            {tenzies && <h3>Best Time:{parseInt(localStorage.getItem("bestTime"))/1000}secs</h3>}

            <div className="custom">
                    <h3>Dice Color</h3>
                    <input className="picker" id="dice-color" type="color" value={dieCustom.colorSide} onChange={diceChange} name='colorSide' />
                    <h3>Dot Color</h3>
                    <input className="picker" id="dot-color" type="color" value={dieCustom.colorDot} onChange={diceChange} name='colorDot'/>
            </div>
     
      </main>
    </>
  )




}

export default App
