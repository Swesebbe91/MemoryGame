import "./App.css";
import { useState, useEffect } from "react";
import Card from "./Components/Card";

function App() {
const[data, setData] = useState([]);
let [twoCardsToAnArray, setTwoCardsToAnArray] = useState ([]);

  useEffect(() => {
    fetchData("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"); //Get deck
  },[] );

  async function fetchData(url) {
    const res = await fetch(url);
    const data = await res.json();
   
    const newDeck = await fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=52`); // Cards
    const newData = await newDeck.json();
    const cards = newData.cards
    addObjects(cards) //add ID & match object to the array
  }

  useEffect(() => {

  }, [twoCardsToAnArray]);

    const addObjects = (cards) => { 
    cards = [...cards] //Kopia av cards
    .map((cards, i) => ({...cards, id: i, match: false})) //Gå igenom listan, sätt id, matchning falskt
    setData(cards) //Sätt ut datan

  }

  const handleClick = (code) => {
    console.log("Click")
    setTwoCardsToAnArray(() => [...twoCardsToAnArray, code] )
    
  }
  
  console.log(twoCardsToAnArray);
  return (
    <div className="App">
      <h2>Welcome to my memory game! </h2>
      <div className="flex">
      {data.map((item) => (
        <Card key={item.id}
         image = {item.image}
         checked = {twoCardsToAnArray.includes(item.code)} //Check if the array includes an item
         onClicked ={() => handleClick(item.code)}
          />
      ))}

    </div>
    </div>
  );
}

export default App;