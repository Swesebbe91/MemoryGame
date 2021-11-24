import React from "react";
import { useState } from "react/cjs/react.development";
import "./Card.css";
import pokemonCard from "./pokemonCard.jpg";

const Card = (props) => {
    const [newPicture, setNewPicture] = useState(false)
    
  // const changePicture = () => {
  // <img className="img-size" src={props.items.image}></img>

  return (
    <div className="d-flex">
        
      <img src={pokemonCard}  className="img-size" alt="Background of a pokemon card"></img>
      <img className="img-size" src={props.image ? props.items.image : pokemonCard}  onClick={(props.onClick)} />
    </div>
    
  );
};

export default Card;
