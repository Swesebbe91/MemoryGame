import "./App.css";
import { useState, useEffect } from "react";
import Card from "./Components/Card";

function App() {
  let first;
  let second;
  const [data, setData] = useState([]);
  let [twoCardsToAnArray, setTwoCardsToAnArray] = useState([]);
  let [ArrayTo, setArrayTo] = useState([]);

  useEffect(() => {
    fetchData("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"); //Get deck
  }, []);

  async function fetchData(url) {
    const res = await fetch(url);
    const data = await res.json();

    const newDeck = await fetch(
      `https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=2`
    ); // Cards
    const newData = await newDeck.json();
    const cards = newData.cards;
    shuffleAndCombineCards(cards); //add ID & match object to the array
  }

  useEffect(() => {
    if (twoCardsToAnArray.length > 4) {
      setTwoCardsToAnArray([]);
    }

    const test = [...twoCardsToAnArray];

    test.forEach((item, index) => {
      if (index % 2 === 1 && first == null) {
        first = item;
        console.log("First: " + first);
      } else if (index % 2 === 1 && second == null) {
        second = item;
        console.log("Second: " + second);

        if (first === second) {
          console.log("Match");
        } else {
         console.log("Not match")
        }
      }
    });
  }, [twoCardsToAnArray]);

  const shuffleAndCombineCards = (cards) => {
    const newCards = [...cards]; //Kopia av cards
    let dubbelCards = newCards.concat(newCards);

    dubbelCards = [...dubbelCards].map((cards, i) => ({
      ...cards,
      id: i,
      match: false,
    })); //'Spränger' in 3 attribut till min kortlek

    shuffle(dubbelCards); //Sätt ut datan
  };

  function shuffle(combined) {
    combined.sort(() => Math.random() - 0.5);
    setData(combined); //Sätt ut datan
  }

  const handleClick = (id, code) => {
    setTwoCardsToAnArray(() => [...twoCardsToAnArray, id, code]);
    console.log("Arrayn innehåller: " + twoCardsToAnArray);
  };

  console.log(twoCardsToAnArray);
  return (
    <div className="App">
      <h2>Welcome to my memory game! </h2>
      <div className="flex">
        {data.map((item) => (
          <Card
            key={item.id}
            image={item.image}
            checked={twoCardsToAnArray.includes(item.id)} //Check if the array includes an item
            onClicked={() => handleClick(item.id, item.code)  }
          />
        ))}
      </div>
    </div>
  );
}

export default App;
