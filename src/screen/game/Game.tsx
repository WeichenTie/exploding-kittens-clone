import './Game.css'

import MyCardContainer from '../../components/card/MyCardContainer';
import AllPlayers from '../../components/player/AllPlayers';
import Cat from '../../assets/cat-fish.gif'
import { PlayedCard } from '../../components/card/Card';
import PlayingField from '../../components/playing_field/PlayingField';
import Button from '../../components/button/Button'
import { CardInHandFactory } from '../../components/card/CardFactory';

import { useState, useRef } from 'react'
import React from 'react';

var testCards = ['nope', 'tacocat']



const Game = () => {
    const myCardsIdMap = useRef(new Map<string, JSX.Element>());
    const [myCards, setMyCards] = useState<JSX.Element[]>([]);

    const [selectedCards, setSelectedCards] = useState<JSX.Element[]>([]);

    const [graveyard, setGraveyard] = useState([]);

    const handleAddCardToHand = () => {
        const key = Math.floor(Math.random() * 10000);
        const id = 'card-' + Math.floor(Math.random() * 10000);
        
        console.log(id);
        

        const newCard = <CardInHandFactory key={key} id={id} cardName={testCards[Math.floor(Math.random() * testCards.length)]} />
        
        myCardsIdMap.current.set(id, newCard);
        setMyCards([...myCards, newCard])
    }

    const handlePlayCardsFromHand = () => {
        const selectedCards = document.getElementsByClassName('card-selected');

        for (let i = 0; i < selectedCards.length; i++) {
            const cardToDelete = myCardsIdMap.current.get(selectedCards.item(i).id)
            console.log(cardToDelete.props.id);
             
            myCardsIdMap.current.delete(selectedCards.item(i).id);
        }
        const newMyCards: JSX.Element[] = [];
        let cardsIter = myCardsIdMap.current.values()
        let n = cardsIter.next();
        while (!n.done) {
            newMyCards.push(n.value);
            n = cardsIter.next();
        }
        setMyCards(newMyCards);
    }

    return (
        <div className="game-container">
            <AllPlayers />

            <div className="game-field">
                <PlayingField />
            </div>

            <div className="lower-game-container">
                <Button onClick={handleAddCardToHand} text="Add Card" />
                <Button onClick={handlePlayCardsFromHand} text="Play Cards" />
                <div className="self-avatar">
                    <img src={Cat} alt='' />
                </div>
                <MyCardContainer cards={myCards} />
            </div>
        </div>
    )
}


export default Game;