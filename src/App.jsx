import "./App.css";
import { useState, useEffect } from "react";
import Card from "./Components/Card";

function App() {
const[data, setData] = useState([]);
let [testArray, setTestArray] = useState ([]);

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

  }, [testArray]);

    const addObjects = (cards) => { 
    cards = [...cards] //Kopia av cards
    .map((cards, i) => ({...cards, id: i, match: false})) //Gå igenom listan, sätt id, matchning falskt
    setData(cards) //Sätt ut datan

  }

  const handleClick = (id) => {
    console.log("Click")
    setTestArray(() => [...testArray, id] )
    console.log(id);
    
  }
  
  console.log(testArray);
  return (
    <div className="App">
      <h2>Welcome to my memory game! </h2>
      <div className="flex">
      {data.map((item, id) => (
        <Card key={id}
         image = {item.image}
         checked = {testArray.includes(id)}
         value = {item.value}
         onClicked ={() => handleClick(id)}
          />
      ))}
     

    </div>
    </div>
  );
}

export default App;