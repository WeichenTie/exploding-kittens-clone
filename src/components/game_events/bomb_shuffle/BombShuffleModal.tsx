import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import {
  setGameEvent,
  selectGameEvents,
} from "../../../redux/slices/GameStateSlice";

const StyledModal = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  position: absolute;
  background-color: #000000c0;
  z-index: 100;
`;

const BombShuffleModal = () => {
  // Redux hooks
  const selectedGameEvent = useSelector(selectGameEvents);
  const dispatch = useDispatch();

  const handleExitModal = () => {
    dispatch(setGameEvent(""));
  };

  // Get number cards in the deck from the server
  return (
      <StyledModal
        initial={{
          opacity: 0,
          y: '-100vh',
        }}
        animate={{
          y: 0,
          opacity: 1,
          transition: {
            type: "tween",
            duration: 0.5,
          },
        }}
        exit={{
          opacity: 1,
          y: '-100vh',
          transition: {
            type: "tween",
            duration: 0.5,
          },
        }}
        className="backdrop modal"
        onClick={handleExitModal}
      ></StyledModal>
  );
};

export default BombShuffleModal;
