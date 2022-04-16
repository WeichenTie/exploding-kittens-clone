import "./Card.css";
// React hooks
import { useState, useEffect, useReducer } from "react";
import useComponentDimension from "../hooks/useComponentDimension";

import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import styled from "styled-components";

// Redux
import { useSelector } from "react-redux";
import { selectMyCards } from "../../redux/slices/GameStateSlice";

import { CardInHandFactory } from "./CardFactory";

let cardProperties = {
  width: 100,
};

const StyledMyCardContainer = styled(motion.ol)`
  & .in-hand-card {
    &:not(:first-child) {
      margin-left: ${() => -cardProperties.width}px;
    }
    &:hover ~ .in-hand-card {
      left: ${() => cardProperties.width}px;
    }
  }
`;

const MyCardContainer = () => {
  const [myCards, setMyCards] = useState<JSX.Element[]>([]);
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  const { width } = useComponentDimension("my-card-container");
  // Redux
  const myCardsSelector = useSelector(selectMyCards);
  
  // Load in all cards into container
  useEffect(() => {
    setMyCards(() =>
      myCardsSelector.map((card) => {
        return CardInHandFactory(card.id, card.cardName);
      })
    );
    setTimeout(() => forceUpdate(), 60);
  }, [myCardsSelector]);

  // Calculates the nominal card offset to ensure it does
  // not overflow the container
  const cardWidth = window.innerHeight / 5 + 16; // 5 from 20vh 16 for border
  cardProperties.width = Math.max(
    window.innerHeight / 10,
    (cardWidth * document.getElementsByClassName("in-hand-card").length -
      (width - 60)) /
      (document.getElementsByClassName("in-hand-card").length - 1)
  ); // 60 from padding: ;

  return (
    <StyledMyCardContainer id="my-card-container">
      <LayoutGroup>
        <AnimatePresence>
          {myCards}
        </AnimatePresence>
      </LayoutGroup>
    </StyledMyCardContainer>
  );
};

export { MyCardContainer, cardProperties };
