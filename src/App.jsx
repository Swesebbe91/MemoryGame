import "./App.css";
import { useState, useEffect } from "react";
import Card from "./Components/Card";

function App() {
  let firstCodeValue;
  let secondCodeValue;
  const [data, setData] = useState([]);
  const [firstCardArray, setFirstCardArray] = useState([]);
  const [secondCardArray, setSecondCardArray] = useState([]);
  const [count, setCounts] = useState(0);

  useEffect(() => {
    fetchData("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"); //use a function to get a card deck from API
  }, []);

  async function fetchData(url) {
    const res = await fetch(url);
    const data = await res.json();

    const newDeck = await fetch(
      `https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=4` //Use data in id to get cards to work with
    );
    const newData = await newDeck.json();
    const cards = newData.cards;
    shuffleAndCombineCards(cards); //Call a function to add ID, flip and match objects with type boolean to the array. Then shuffle the cards
  }

  useEffect(() => {
    const firstCard = [...firstCardArray]; //get the first array with values
    const secondCard = [...secondCardArray]; //get the second array with values

    firstCard.forEach((item) => {
      firstCodeValue = item.code;
    }); //Open the first object "code" value

    secondCard.forEach((item) => {
      secondCodeValue = item.code;
    }); //Open the second object "code" value
    if (firstCodeValue === secondCodeValue) {
      //If the code value it´s the same, we got a match! else continue

      firstCard.map((item) => (item.match = true)); //Change boolean "match" from false to true so we can flip the card
      secondCard.map((item) => (item.match = true)); //Change boolean "match" from false to true so we can flip the card
    }
  }, [firstCardArray, secondCardArray]);

  const shuffleAndCombineCards = (cards) => {
    const newCards = [...cards]; //get the array
    let doubledCards = newCards.concat(newCards); //Copy the array and combine them

    doubledCards = [...doubledCards].map((cards, i) => ({
      //Open the array and add more objects to it
      ...cards,
      id: i,
      flip: false,
      match: false,
    }));

    doubledCards.sort(() => Math.random() - 0.5); //Method to shuffle the deck
    setData(doubledCards); //Set the data to the "Data" variable.
  };

  const handleClick = (item) => {
    if (firstCardArray.length === 0) {
      //Set the first card to the first array
      setFirstCardArray(() => [...firstCardArray, item]);
    } else if (secondCardArray.length === 0) {
      //Set the second card to the second array
      setSecondCardArray(() => [...secondCardArray, item]);
    } else {
      //If both arrays include 1 object, empty the arrays
      setFirstCardArray([]);
      setSecondCardArray([]);
      setCounts((count) => (count += 1)); //Set games of rounds to +1
    }
  };

  return (
    <div className="App">
      <h2>Welcome to my memory game! </h2>
      <div className="flex">
        {data.map((item) => (
          <Card
            key={item.id} //connect "key" with the id values
            matched={item.match} //Create a prop to get a chance to flip the card in "card.jsx"
            image={item.image} //Create a prop to display the cards in "card.jsx"
            flip={
              //Create a flip prop to display the card in "card.jsx"
              firstCardArray.includes(item) || secondCardArray.includes(item) //Check if the arrays include one item, if so boolean will get true
            }
            onClicked={() => handleClick(item)} //Create a prop to get the chance to start a function when clicked on a card.
          />
        ))}
      </div>
      <p> Antal rundor spelade: {count}</p>
    </div>
  );
}

export default App;
