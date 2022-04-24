import { motion } from "framer-motion";
import { useState } from "react";
import { useSelector } from "react-redux";

import {
  selectDeck
} from '../../redux/slices/GameStateSlice'

const Deck = () => {
  const deck = useSelector(selectDeck);
  
  return <motion.div layout>
    {deck}
  </motion.div>;
};

export default Deck;
