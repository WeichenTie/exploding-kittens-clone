import "./Game.css";

import { MyCardContainer } from "../../components/card/MyCardContainer";
import AllPlayers from "../../components/player/AllPlayers";
import Cat from "../../assets/cat-fish.gif";
import PlayingField from "../../components/playing_field/PlayingField";
import ButtonBtn from "../../components/button/Button";

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  addCard,
  removeSelectedCards,
  setGameEvent,
  selectGameEvents,
} from "../../redux/slices/GameStateSlice";

// React Hooks
import React, {
  useState,
  useRef,
  createContext,
  useContext,
  useReducer,
} from "react";
import { useEffect } from "react";
import BombShuffleModal from "../../components/game_events/bomb_shuffle/BombShuffleModal";
import { AnimatePresence } from "framer-motion";

interface IGameContext {
  myCardsIdMap: Map<string, JSX.Element>;
  myCards: JSX.Element[];
  mySelectedCards: string[];
  graveyard: string[];
}

var testCards = ["nope", "tacocat"];

const gameContextData: IGameContext = {
  myCardsIdMap: new Map<string, JSX.Element>(),
  myCards: [],
  mySelectedCards: [],
  graveyard: [],
};

const Game = () => {
  // For testing
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  
  // WORKING CODE V V V V V 
  const [modal, setModal] = useState(false)

  // Redux hooks
  const dispatch = useDispatch();
  const selectedGameEvent = useSelector(selectGameEvents);

  // Adding a card to hand
  const handleAddCardToHand = () => {
    // Create the id for the card
    const id = "card-" + Math.floor(Math.random() * 99999999);
    const cardName = testCards[Math.floor(Math.random() * testCards.length)];
    // Converting to serializable form for redux
    const jsonCard = {
      id,
      cardName,
      isSelected: false,
    };
    // Add to redux store
    dispatch(addCard(jsonCard));
  };

  // Playing selected cards
  const handlePlayCardsFromHand = () => {
    dispatch(removeSelectedCards());
  };

  // Playing selected cards
  const handleSetBombShuffalModal = () => {
    dispatch(setGameEvent('bomb'));
  };

  return (
    <div className="game-container">
      <AnimatePresence>
        {selectedGameEvent === 'bomb' && <BombShuffleModal></BombShuffleModal>}

      </AnimatePresence>

      <AllPlayers />

      <div className="game-field">
        <PlayingField />
        <ButtonBtn onClick={handleAddCardToHand} text="Add Card" />
        <ButtonBtn onClick={handlePlayCardsFromHand} text="Play Cards" />
        <ButtonBtn onClick={handleSetBombShuffalModal} text="OpenModal" />
        <ButtonBtn onClick={forceUpdate} text="ReRender" />
      </div>

      <div className="lower-game-container">
        <div className="self-avatar">
          <img src={Cat} alt="" />
        </div>
        <MyCardContainer />
      </div>
    </div>
  );
};

export { Game };
