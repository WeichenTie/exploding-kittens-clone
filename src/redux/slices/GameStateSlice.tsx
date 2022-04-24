import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../Store";

export const GameStateSlice = createSlice({
  name: "gameState",
  initialState: {
    myCards: [],
    selectedCards: [],
    graveyardCards: [],
    gameEvent: "",
    cardsInDeck: 0,
  },
  reducers: {
    ////////////////////////////////////////////////////////
    //                   My Card Actions                  //
    ////////////////////////////////////////////////////////
    setCards: (state, action) => {
      state.myCards = [...action.payload];
    },
    addCard: (state, action) => {
      state.myCards = [...state.myCards, action.payload];
    },
    removeCard: (state, action) => {
      state.myCards = state.myCards.filter((card) => {
        return card.id !== action.payload;
      });
      state.selectedCards = state.selectedCards.filter((card) => {
        return card.id !== action.payload;
      });
    },
    clearSelectedCards: (state) => {
      state.selectedCards = [];
    },
    selectCard: (state, action) => {
      state.selectedCards = [...state.selectedCards, action.payload];
    },
    deselectCard: (state, action) => {
      state.selectedCards = state.selectedCards.filter((card) => {
        return card !== action.payload;
      });
    },
    ////////////////////////////////////////////////////////
    //                 Deck Cards Actions                 //
    ////////////////////////////////////////////////////////
    setDeck: (state, action) => {
      state.cardsInDeck = action.payload;
    },
    ////////////////////////////////////////////////////////
    //             Graveyard Cards Actions                //
    ////////////////////////////////////////////////////////
    setGraveYard: (state, action) => {
      state.graveyardCards = [...action.payload];
    },
    ////////////////////////////////////////////////////////
    //                   Game Events                      //
    ////////////////////////////////////////////////////////
    setGameEvent: (state, action) => {
      state.gameEvent = action.payload;
    },
  },
});

export const {
  addCard,
  selectCard,
  deselectCard,
  removeCard,
  clearSelectedCards,
  setGameEvent,
  setCards,
  setDeck,
  setGraveYard,
} = GameStateSlice.actions;

export const selectMyCards = (state: RootState) =>
  state.GameStateReducers.myCards;
export const selectSelectedCards = (state: RootState) =>
  state.GameStateReducers.selectedCards;
export const selectDeck = (state: RootState) =>
  state.GameStateReducers.cardsInDeck;
export const selectGraveyard = (state: RootState) =>
  state.GameStateReducers.graveyardCards;
export const selectGameEvents = (state: RootState) =>
  state.GameStateReducers.gameEvent;

export default GameStateSlice.reducer;
