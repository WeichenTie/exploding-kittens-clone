import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";

export const GameStateSlice = createSlice({
  name: "gameState",
  initialState:
  {
    myCards: [],
    graveyardCards: [],
    gameEvent: '',
    cardsInDeck: [],
  },
  reducers: {
    ////////////////////////////////////////////////////////
    //                   My Card Actions                  //
    ////////////////////////////////////////////////////////
    addCard: (state, action) => {
      state.myCards = [...state.myCards, action.payload];
    },
    removeCard: (state, action) => {
      state.myCards = state.myCards.filter((card) => {
        return card.id !== action.payload;
      });
    },
    removeSelectedCards: (state) => {
      state.myCards = state.myCards.filter((card) => {
        return !card.isSelected;
      });
    },
    selectCard: (state, action) => {
      for (let index in state.myCards) {
        if (state.myCards[index].id === action.payload) {
          const newCard = {
            ...state.myCards[index],
            isSelected: true,
          };
          state.myCards[index] = newCard;
          break;
        }
      }
    },
    deselectCard: (state, action) => {
      for (let index in state.myCards) {
        if (state.myCards[index].id === action.payload) {
          const newCard = {
            ...state.myCards[index],
            isSelected: false,
          };
          state.myCards[index] = newCard;
          break;
        }
      }
    },
    ////////////////////////////////////////////////////////
    //             Graveyard Cards Actions                //
    ////////////////////////////////////////////////////////
    setGraveYard: (state, action) => {

    },
    ////////////////////////////////////////////////////////
    //                   Game Events                      //
    ////////////////////////////////////////////////////////
    setGameEvent: (state, action) => {
      state.gameEvent = action.payload;
    } 
  },
  
});

export const {
  addCard,
  selectCard,
  deselectCard,
  removeCard,
  removeSelectedCards,
  setGameEvent,
} = GameStateSlice.actions;

export const selectMyCards = (state: RootState) =>
  state.GameStateReducers.myCards;

export const selectGameEvents = (state: RootState) =>
  state.GameStateReducers.gameEvent;

export default GameStateSlice.reducer;
