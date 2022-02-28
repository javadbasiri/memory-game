import { useState,useEffect } from 'react';
import Card from './components/Card';
import './App.css';

const imageCards = [
  {src:"images/helmet-1.png", matched:false},
  {src:"images/potion-1.png", matched:false},
  {src:"images/ring-1.png", matched:false},
  {src:"images/scroll-1.png", matched:false},
  {src:"images/shield-1.png", matched:false},
  {src:"images/sword-1.png", matched:false},
]

function App() {

  const [cards , setCards] = useState([])
  const [turns , setTurns] = useState(0)
  const [choiceOne , setChoiceOne] = useState(null)
  const [choiceTwo , setChoiceTwo] = useState(null)
  const [disabled , setDisabled] = useState(false)
  const [finished , setFinished] = useState(false)


  const shuffleCards = ()=>{
    const shuffled = [...imageCards,...imageCards].sort(()=>Math.random() - 0.5)
    setCards(shuffled.map(item =>({...item,id:Math.random()})))
    setTurns(0)
    setFinished(false)
  }

  useEffect(()=>{
    shuffleCards()
  },[])

  const choiceHandler = (item)=>{
    choiceOne ? setChoiceTwo(item) : setChoiceOne(item);
  }

  const match = ()=>{
    if(choiceOne && choiceTwo){
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src){
        setCards(cards.map(card => {
          if(card.src === choiceOne.src){
            return{...card,matched:true}
          }
          else{
            return card
          }
        }))
        resetTurn()
      }else{
        setTimeout(()=> resetTurn() , 1000)
      }
    }
   
  }

  const resetTurn = ()=>{
    setDisabled(false)
    setChoiceTwo(null)
    setChoiceOne(null)
    setTurns(turns => turns + 1)
  }


  useEffect(()=>{
    match();
  },[choiceOne , choiceTwo])

  useEffect(()=>{
    finish()
  },[cards])

  const finish = ()=>{
    setFinished(cards.every(item=>item.matched))
  }

  console.log(finished)

  return (
    <div className="App">
      <div className={`modal ${finished && "open"}`}>
        <div className="inner-modal">
          <p>Good Job</p>
          <p>You Finished with<span> {turns} </span> moves! </p>
          <button onClick={shuffleCards}>NEW GAME</button>
        </div>
      </div>
      <h2>Challenge Your Memory</h2>
      <div className="button">
        <button onClick={shuffleCards}>NEW GAME</button>
        <h3>Turns : {turns}</h3>
      </div>
      <div className="container">
          {cards.map(card => <Card 
                                choiceHandler={choiceHandler} 
                                key={card.id} 
                                card={card} 
                                disabled={disabled}
                                flipped={card === choiceOne || card === choiceTwo || card.matched}
                              />)}
      </div>
    </div>
  );
}

export default App;
