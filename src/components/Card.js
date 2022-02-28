import React,{useState} from "react";
import "./card.css"
const Card = ({card , choiceHandler,flipped,disabled})=>{

    const clickHandler =()=>{
        if(!disabled){
            choiceHandler(card)
        }
    }

    return(
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img className="front" src={card.src} alt="card" />
                <img className="back" onClick={clickHandler} src="/images/cover.png" alt="card" />
            </div>
        </div>
    )
}

export default Card;