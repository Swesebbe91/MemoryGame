import React from "react";
import "./Card.css";
import pokemonCard from "./pokemonCard.jpg";

const Card = ({checked, image, onClicked}) => {

  return (
    <div className="d-flex"> 
          <img className="img-size" src={checked ? image : pokemonCard }  onClick ={onClicked}/>
    </div>
    
  );
};

export default Card;
