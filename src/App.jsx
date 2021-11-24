import "./App.css";
import { useState, useEffect } from "react";
import Card from "./Components/Card";


//Skapa ett memory
//Skapa ett objekt att hålla korten i
//Skapa en lista, duplicera listan
//Skapa id
//Skapa image
//value

//ID === ID, TA BORT FRÅN LISTAN
//OM ARRAY === {0} = GAME OVER
//RESET FETCH CARD

function App() {
const[data, setData] = useState([]);
const [image, setImg] = useState(false);

// let fiveCards = [];
// let duplicate = [];
// let combined = [];

  useEffect(() => {
    fetchData("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
  },[] );

  async function fetchData(url) {
    const res = await fetch(url);
    const data = await res.json();
   
    const newDeck = await fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=52`);
    const newData = await newDeck.json();
    const cards = newData.cards
    createObjectsFunction(cards)
  }

  
    const createObjectsFunction = (cards) => { //Funktion med argument cards
    const shuffledCards = [...cards] //Kopia av cards
    .map((cards, i) => ({...cards, id: i, match: false})) //Gå igenom listan, sätt id, matchning falskt
  
    setData(shuffledCards) //Sätt ut datan
    console.log(shuffledCards)
  }

  return (
    <div className="App">
      <h2>Welcome to my memory game! </h2>
      <div className="flex">
      {data.map((item) => (
        <Card key={item.id} items = {item}/>
      
      ))}

    </div>
    </div>
  );
}

export default App;