import "./Game.css";

import { MyCardContainer } from "../../components/card/MyCardContainer";
import AllPlayers from "../../components/player/AllPlayers";
import Cat from "../../assets/cat-fish.gif";
import PlayingField from "../../components/playing_field/PlayingField";
import ButtonBtn from "../../components/button/Button";

import { useSelector } from "react-redux";
import { selectGameEvents } from "../../redux/slices/GameStateSlice";

import BombShuffleModal from "../../components/game_events/bomb_shuffle/BombShuffleModal";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import useGameClient from "../../components/hooks/useGameClient";
import { useReducer } from "react";

const Game = () => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const gameClient = useGameClient();

  return (
    <div className="game-container">
      <AllPlayers />
      <LayoutGroup>
        <div className="game-field">
          <PlayingField />
          <ButtonBtn onClick={gameClient.drawCard} text="Draw Card" />
          <ButtonBtn onClick={gameClient.playCards} text="Play Cards" />
          <ButtonBtn onClick={gameClient.resetGame} text="Reset Game" />
          <ButtonBtn onClick={forceUpdate} text="Rerender" />
        </div>
        <div className="lower-game-container">
          <div className="self-avatar">
            <img src={Cat} alt="" />
          </div>
          <MyCardContainer />
        </div>
      </LayoutGroup>
    </div>
  );
};

export default Game;
