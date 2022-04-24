import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

import { useDispatch, useSelector } from "react-redux";
import {
  selectMyCards,
  selectSelectedCards,
  setCards,
  clearSelectedCards,
  setGraveYard,
  setDeck
} from "../../redux/slices/GameStateSlice";

interface Card {
  id: string;
  type: string;
}

interface LobbyResponse {
  cardsInHand: Card[];
  cardsInDeck: number;
  cardsInGraveyard: Card[];
}

const useGameClient = () => {
  const [socket, setSocket] = useState<Socket>(null);

  const myCards = useSelector(selectMyCards);
  const selectedCards = useSelector(selectSelectedCards);
  const dispatch = useDispatch();

  /**
   *
   *  Helpers
   *
   */

  const getCardFromSet = (set: Card[], id: string) => {
    return set.find((card) => {
      return card.id === id;
    });
  };

  /**
   *
   *  Setting up
   *
   */
  useEffect(() => {
    setSocket(io("http://192.168.1.103:8080"));
  }, []);

  useEffect(() => {
    if (socket === null) return;
    // When client connects to the server
    socket.on("connect", () => {
      socket.emit("join-lobby", "Lobby1");
      console.log("connected");
    });
    // When client disconnects to the server
    socket.on("disconnect", () => {
      socket.emit("leave-lobby", "Lobby1");
      console.log(socket.id); // undefined
    });
    // When the client recieves the state of the lobby
    socket.on("get-lobby-response", (response: LobbyResponse) => {
      dispatch(setCards(response.cardsInHand));
      dispatch(setGraveYard(response.cardsInGraveyard));
      dispatch(setDeck(response.cardsInDeck));
    });
  }, [socket]);

  /**
   *
   *  Playing a Card
   *
   */
  const playCards = () => {
    // Play single card
    if (selectedCards.length === 1) {
      socket.emit("play-cards", selectedCards);
      dispatch(clearSelectedCards());
      return true;
    }
    // Double and triple for stealing
    else if (selectedCards.length === 2 || selectedCards.length === 3) {
      const cards: Card[] = [];
      for (let card of selectedCards) {
        cards.push(getCardFromSet(myCards, card));
      }
      if (
        cards.every((card) => {
          return card.type === cards[0].type;
        })
      ) {
        socket.emit("play-cards", selectedCards);
        dispatch(clearSelectedCards());
        return true;
      }
    }
    // 5 to take from graveyard
    else if (selectedCards.length === 5) {
      const set = new Set();
      for (let card of selectedCards) {
        set.add(getCardFromSet(myCards, card).type);
      }
      if (set.size === 5) {
        socket.emit("play-cards", selectedCards);
        dispatch(clearSelectedCards());
        return true;
      }
    }
    return false;
  };
  /**
   *
   *  Drawing a Card
   *
   */
  const drawCard = () => {
    socket.emit("draw-card");
  };
  const resetGame = () => {
    socket.emit("reset-game");
  };

  return { playCards, drawCard, resetGame };
};

export default useGameClient;
