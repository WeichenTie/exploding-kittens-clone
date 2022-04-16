import { InHandCard } from "./Card";
import TacocatImage from "../../assets/tacocat.webp";
import TacoCatIcon from "../../assets/card-icon.svg";
import NopeIcon from "../../assets/nope.svg";

import { CSSTransition, TransitionGroup } from "react-transition-group";

import { useState, useEffect, useRef } from "react";

interface ICardInHand {
  id: string;
  cardName: string;
}

const CardInHandFactory = (id: string, cardName:string) => {
  switch (cardName) {
    case "tacocat":
      return (
        <InHandCard
          key={id}
          cardId={id}
          cardName="TACOCAT"
          cardBorderColour="grey"
          cardImage={TacocatImage}
          cardIcon={TacoCatIcon}
        />
      );
    case "nope":
      return (
        <InHandCard
          key={id}
          cardId={id}
          cardName="NOPE"
          cardBorderColour="red"
          cardImage={NopeIcon}
          cardIcon={NopeIcon}
        />
      );
  }

  return (
    <InHandCard
      key={id}
      cardId={id}
      cardName="BROKEN"
      cardBorderColour="red"
      cardImage={TacocatImage}
      cardIcon={TacoCatIcon}
    />
  );
};

export { CardInHandFactory };
