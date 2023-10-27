import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import SingleCard from "./SingleCard";
const cardImages =[
  {"src": "/img/helmet-1.png",matched:false},
  {"src": "/img/potion-1.png",matched:false},
  {"src": "/img/ring-1.png",matched:false},
  {"src": "/img/scroll-1.png",matched:false},
  {"src": "/img/shield-1.png",matched:false},
  {"src": "/img/sword-1.png",matched:false},
]

function App() {

const [cards, setCards] = useState([])
const [turns, setTurns] = useState(0)
const [choiseOne,setChoiceOne]= useState(null)
const [choiseTwo,setChoiceTwo]= useState(null)
const [disabled, setDisabled]= useState(false)

useEffect(()=>{
  if (choiseOne && choiseTwo){
    setDisabled(true) 
    if (choiseOne.src === choiseTwo.src){
      setCards(prevCards =>{
        return prevCards.map(card =>{
          if(card.src === choiseOne.src){
            return {...card, matched:true}
          }
          else{
            return card
          }
        })
      })
      resetTurn()
    }
    else {
      
      setTimeout(()=>resetTurn(),3000)
    }
}
},[choiseOne,choiseTwo])


const resetTurn = () => {
  setChoiceOne(null)
  setChoiceTwo(null)
  setTurns(prevTurns => prevTurns + 1)
  setDisabled(false) 
 }

 const  shuffleCards = () => {
  const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) =>({...card, id: Math.random()}))
  
  setCards(shuffledCards)
  setTurns(0)
 }

 const handleChoice =(card)=>{
    choiseOne ? setChoiceTwo(card): setChoiceOne(card)
 }
 
  return (
    <div className="App">
      <h1>MyMemory Game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {
          cards.map(card => (
            <SingleCard 
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiseOne || card === choiseTwo || card.matched}
            disabled ={disabled}
            />
          ))
        }
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;