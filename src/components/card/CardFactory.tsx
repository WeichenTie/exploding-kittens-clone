import { InHandCard, PlayedCard } from "./Card";
import TacocatImage from "../../assets/tacocat.webp";
import TacoCatIcon from "../../assets/card-icon.svg";
import NopeIcon from "../../assets/nope.svg";

const CardInHandFactory = (id: string, type: string) => {
  switch (type) {
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
const CardInGraveyardFactory = (id: string, type: string) => {
  switch (type) {
    case "tacocat":
      return (
        <PlayedCard
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
        <PlayedCard
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

export { CardInHandFactory, CardInGraveyardFactory };
