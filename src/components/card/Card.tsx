import "./Card.css";
import { useState, useEffect, useRef, useContext, useCallback, useReducer } from "react";

import { useDispatch } from "react-redux";
import { selectCard, deselectCard } from "../../redux/slices/GameStateSlice";

import HelpIcon from "./../../assets/question-mark.svg";
import { motion } from "framer-motion";

function randn_bm(): number {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  num = num / 10.0 + 0.5; // Translate to 0 -> 1
  if (num > 1 || num < 0) return randn_bm(); // resample between 0 and 1
  return num;
}

interface ICard {
  cardId: string;
  cardName: string;
  cardBorderColour: string;
  cardImage: any;
  cardIcon: any;
  cardFlavourText: string | null;
  cardEffectText: string | null;
}

interface IPlayedCard {
  cardName: string;
  cardBorderColour: string;
  cardImage: any;
  cardIcon: any;
  cardFlavourText: string | null;
  cardEffectText: string | null;
}

interface IInHandCard {
  cardId: string;
  cardName: string;
  cardBorderColour: string;
  cardImage: any;
  cardIcon: any;
}

const Card = (props: ICard) => {
  return (
    <motion.div
      className="card"
      style={{ outline: `3px solid ${props.cardBorderColour}` }}
    >
      <img className="card-help-icon" src={HelpIcon} alt="HelpIcon" />
      <div className="card-top card-banner">
        <img className="card-icon" src={props.cardIcon} alt={props.cardName} />
        <h1 className="card-name">{props.cardName}</h1>
      </div>
      <div className="card-middle">
        <img
          src={props.cardImage}
          alt=""
          className="card-image"
          draggable="false"
        />
      </div>
      <div className="card-bottom card-banner">
        <img className="card-icon" src={props.cardIcon} alt={props.cardName} />
        <h1 className="card-name">{props.cardName}</h1>
      </div>
    </motion.div>
  );
};

const InHandCardVariant = {
  enter: {
    opacity: 0,
    y: -100,
  },

  unselected: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween",
      duration: 0.27,
      ease: "backOut",
    },
  },

  selected: {
    y: -50,
    opacity: 1,
    transition: {
      type: "tween",
      ease: "circOut",
      duration: 0.27,
    },
  },

  exit: {
    y: -50,
    opacity: 0,
    rotate: 0,
    scale: 0.5,
    transition: {
      type: "tween",
      duration: 0.5,
    }
  },
};

const InHandCard = (props: IInHandCard): JSX.Element => {
  
  const [variant, setVariant] = useState("unselected");

  const dispatch = useDispatch();

  const handleClick = () => {
    if (variant === "unselected") {
      dispatch(selectCard(props.cardId));
      setVariant("selected");
    } else {
      dispatch(deselectCard(props.cardId));
      setVariant("unselected");
    }
  };

  return (
    <motion.li
      layout="position"
      layoutId={props.cardId}
      className="in-hand-card"
      initial="enter"
      animate={variant}
      variants={InHandCardVariant}
      whileHover={{ scale: 1.07 }}
      onClick={handleClick}
    >
      <motion.div
        className="card"
        style={{ outline: `3px solid ${props.cardBorderColour}` }}
      >
        <img className="card-help-icon" src={HelpIcon} alt="HelpIcon" />
        <div className="card-top card-banner">
          <img
            className="card-icon"
            src={props.cardIcon}
            alt={props.cardName}
          />
          <h1 className="card-name">{props.cardName}</h1>
        </div>
        <div className="card-middle">
          <img
            src={props.cardImage}
            alt=""
            className="card-image"
            draggable="false"
          />
        </div>
        <div className="card-bottom card-banner">
          <img
            className="card-icon"
            src={props.cardIcon}
            alt={props.cardName}
          />
          <h1 className="card-name">{props.cardName}</h1>
        </div>
      </motion.div>
    </motion.li>
  );
};

const PlayedCard = (props: IPlayedCard) => {
  const id = Math.random() * 100000;
  return (
    <div
      className="card-played"
      style={{
        transform: `rotateZ(${(randn_bm() - 0.5) * 60}deg)`,
      }}
    >
      <Card
        cardId={"card-" + id}
        cardName={props.cardName}
        cardBorderColour={props.cardBorderColour}
        cardImage={props.cardImage}
        cardIcon={props.cardIcon}
        cardFlavourText={null}
        cardEffectText={null}
      />
    </div>
  );
};

export { Card, InHandCard, PlayedCard };
