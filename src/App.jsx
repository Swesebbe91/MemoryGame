import "./App.css";
import { useState, useEffect } from "react";
import Card from "./Components/Card";

function App() {
  
  let firstCodeValue;
  let secondCodeValue;
  const [data, setData] = useState([]);
  let [firstCardArray, setFirstCardArray] = useState([]);
  let [secondCardArray, setSecondCardArray] = useState([]);
  let [count, setCounts] = useState(0)
  

  useEffect(() => {
    fetchData("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"); //Get deck
  }, []);

  async function fetchData(url) {
    const res = await fetch(url);
    const data = await res.json();

    const newDeck = await fetch(
      `https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=4`
    ); // Cards
    const newData = await newDeck.json();
    const cards = newData.cards;
    shuffleAndCombineCards(cards); //add ID & match object to the array
  }

  useEffect(() => {
    const firstCard = [...firstCardArray];
    const secondCard = [...secondCardArray];

    firstCard.map((item) => 
      firstCodeValue = item.code);
   
    secondCard.map((item) => secondCodeValue = item.code);
  
    
      if (firstCodeValue === secondCodeValue) {
        
        firstCard.map((item) => item.match = true);
        secondCard.map((item) => item.match = true);
      } 
    
   
  }, [secondCardArray]);

  const shuffleAndCombineCards = (cards) => {
    const newCards = [...cards]; //Kopia av cards
    let doubledCards = newCards.concat(newCards);

    doubledCards = [...doubledCards].map((cards, i) => ({
      ...cards,
      id: i,
      flip: false,
      match: false,
    })); //'Spränger' in 3 attribut till min kortlek

    shuffleDeck(doubledCards); //Sätt ut datan
  };

  function shuffleDeck(combined) {
    combined.sort(() => Math.random() - 0.5);
    setData(combined); //Sätt ut datan
  }

  const handleClick = (item) => {
    if (firstCardArray.length && secondCardArray.length === 1) {
      setFirstCardArray([]);
      setSecondCardArray([]);
      setCounts((count) => count +=1)
    }
    if (firstCardArray.length === 0) {
      setFirstCardArray(() => [...firstCardArray, item]);
    } else if (secondCardArray.length === 0) {
      setSecondCardArray(() => [...secondCardArray, item]);
    }
  };

  return (
    <div className="App">
      <h2>Welcome to my memory game! </h2>
      <div className="flex">
        {data.map((item) => (
          <Card
            key={item.id}
            matched={item.match}
            image={item.image}
            flip={
              firstCardArray.includes(item) ||
              secondCardArray.includes(item)
            }
            onClicked={() => handleClick(item)}
          />

        ))}
        </div>
        <p> Antal rundor {count}</p>
    </div>
    

  );
}

export default App;