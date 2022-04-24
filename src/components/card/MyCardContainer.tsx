import "./Card.css";
// React hooks
import { useState, useEffect, useReducer, useLayoutEffect } from "react";
import useComponentDimension from "../hooks/useComponentDimension";

import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import styled from "styled-components";

// Redux
import { useSelector } from "react-redux";
import { selectMyCards } from "../../redux/slices/GameStateSlice";

import { CardInHandFactory } from "./CardFactory";

const StyledMyCardContainer = styled(motion.ol)<{ margin: number }>`
  & .in-hand-card {
    &:not(:last-of-type) {
      margin-right: ${(props) => -props.margin}px;
    }
    &:hover ~ .in-hand-card {
      left: ${(props) => props.margin}px;
    }
  }
`;
const MyCardContainer = () => {
  const [myCards, setMyCards] = useState<JSX.Element[]>([]);
  const { width } = useComponentDimension("my-card-container");
  // Redux
  const myCardsSelector = useSelector(selectMyCards);

  // Load in all cards into container
  useEffect(() => {
    setMyCards(() =>
      myCardsSelector.map((card: any) => {
        return CardInHandFactory(card.id, card.type);
      })
    );
  }, [myCardsSelector]);

  return (
    <div>
      <StyledMyCardContainer
        layout
        margin={Math.max(
          window.innerHeight / 10,
          ((window.innerHeight / 5 + 16) * myCards.length - (width - 60)) /
            (myCards.length - 1)
        )}
        id="my-card-container"
      >
        {myCards}
      </StyledMyCardContainer>
    </div>
  );
};

export { MyCardContainer };
