import "./Card.css";
import {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
  useReducer,
} from "react";

import { useDispatch } from "react-redux";
import { selectCard, deselectCard } from "../../redux/slices/GameStateSlice";

import HelpIcon from "./../../assets/question-mark.svg";
import { motion } from "framer-motion";
import styled from "styled-components";

interface ICard {
  cardName: string;
  cardBorderColour: string;
  cardImage: any;
  cardIcon: any;
  cardFlavourText: string | null;
  cardEffectText: string | null;
}

interface IPlayedCard {
  cardId: string;
  cardName: string;
  cardBorderColour: string;
  cardImage: any;
  cardIcon: any;
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
      layout
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
    x: 0,
    y: -100,
    rotateZ: 0,
    transition: {
      type: "tween",
      duration: 0,
      ease: "backOut",
    },
  },

  unselected: {
    opacity: 1,
    x: 0,
    y: 0,
    rotateZ: 0,
    transition: {
      type: "tween",
      duration: 0.27,
      ease: "backOut",
    },
  },

  selected: {
    x: 0,
    y: -50,
    rotateZ: 0,
    opacity: 1,
    transition: {
      type: "tween",
      ease: "circOut",
      duration: 0.27,
    },
  },
};

const InHandCard = (props: IInHandCard): JSX.Element => {
  const [variant, setVariant] = useState("unselected");
  const [_, forceRerender] = useReducer((x) => x + 1, 0);

  const dispatch = useDispatch();

  const handleClick = () => {
    if (variant === "unselected") {
      setVariant("selected");
      dispatch(selectCard(props.cardId));
    } else {
      setVariant("unselected");
      dispatch(deselectCard(props.cardId));
    }
    forceRerender();
  };

  return (
    <motion.li
      layoutId={props.cardId}
      className="in-hand-card"
      initial="enter"
      animate={variant}
      variants={InHandCardVariant}
      onClick={handleClick}
      whileHover={{scale: 1.1}}
    >
      <Card
        cardName={props.cardName}
        cardBorderColour={props.cardBorderColour}
        cardImage={props.cardImage}
        cardIcon={props.cardIcon}
        cardFlavourText={null}
        cardEffectText={null}
      />
    </motion.li>
  );
};

const StyledGraveYardCard = styled(motion.div)<{ rot: number }>`
 
`;

const offsetTranslateScale = 30;
const maxRotation = 10;
const PlayedCard = (props: IPlayedCard) => {
  const [offsets, _] = useState({
    x: Math.random() * offsetTranslateScale - offsetTranslateScale/2,
    y: Math.random() * offsetTranslateScale - offsetTranslateScale/2,
    rot: Math.random() * maxRotation - maxRotation / 2,
  });

  return (
    <motion.div
      layoutId={props.cardId}
      className="card-played"
      initial={{
        x: offsets.x,
        y: offsets.y,
      }}
      animate={{
        x: offsets.x,
        y: offsets.y,
      }}
    >
      <Card
        cardName={props.cardName}
        cardBorderColour={props.cardBorderColour}
        cardImage={props.cardImage}
        cardIcon={props.cardIcon}
        cardFlavourText={null}
        cardEffectText={null}
      />
    </motion.div>
  );
};

export { Card, InHandCard, PlayedCard };
