import "./PlayingField.css";
import { PlayedCard } from "../card/Card";

import { selectGraveyard } from "../../redux/slices/GameStateSlice";
import { useSelector } from "react-redux";
import { CardInGraveyardFactory } from "../card/CardFactory";
import { motion } from "framer-motion";

const PlayingField = () => {
  const graveyard = useSelector(selectGraveyard);

  let cards = [];
  let limit = 10;

  for (let i = Math.min(limit, graveyard.length) - 1; i >= 0; i--) {
    cards.push(CardInGraveyardFactory(graveyard[graveyard.length - i - 1].id, graveyard[graveyard.length - i - 1].type));
  }

  return (
    <motion.div className="playing-field">
      {cards}
    </motion.div>
  );
};

export default PlayingField;
