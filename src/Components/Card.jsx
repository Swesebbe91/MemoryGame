import React from "react";
import "./Card.css";
import pokemonCard from "./pokemonCard.jpg";

const Card = ({ flip, image, onClicked, matched }) => {
  return (
    <div className="d-flex">
      <img
        className="img-size"
        src={flip || matched ? image : pokemonCard}
        alt="A card is displayed"
        onClick={onClicked}
      />
    </div>
  );
};

export default Card;