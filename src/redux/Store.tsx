import { configureStore } from '@reduxjs/toolkit';

import GameStateReducers from './slices/GameStateSlice'




const store = configureStore({
    reducer: {
        GameStateReducers
    },
})

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch