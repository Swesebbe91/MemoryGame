import React from "react";
import { useState } from "react";
import "./Card.css";
import pokemonCard from "./pokemonCard.jpg";

const Card = (props) => {
//const [newPicture, setNewPicture] = useState(false)
    
  // const changePicture = () => {
  // <img className="img-size" src={props.items.image}></img>

  return (
    <div className="d-flex"> 
      {/* <img className="img-size" src={newPicture ?
      //  image : pokemonCard}  onClick={() => setNewPicture((prev) => !prev)}/> */}

          <img className="img-size" src={props.checked ? props.image : pokemonCard }  onClick ={props.onClicked}/>
    </div>
    //Få att max två kort att vänder sig
    //Om sant => låt korten ligga kvar uppvända
    //Om falskt => Vänd tillbaka korten till "False"
    //
  );
};

export default Card;
