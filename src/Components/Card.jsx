import React from "react";
import "./Card.css";
import pokemonCard from "./pokemonCard.jpg"; //Get card from computer source

const Card = ({ flip, image, onClicked, matched }) => {
  return (
    <div className="d-flex">
      <img
        className="img-size"
        src={flip || matched ? image : pokemonCard} //Set a condition to tell if the card should display or not (True or False)
        alt="A card is displayed"
        onClick={onClicked} //Use the inbuilt onclick method.
      />
    </div>
  );
};

export default Card;