import { InHandCard } from './Card';
import TacocatImage from '../../assets/tacocat.webp'
import TacoCatIcon from '../../assets/card-icon.svg'

import { CSSTransition, TransitionGroup }  from 'react-transition-group';

import { useState, useEffect, useRef } from 'react';



interface ICardInHand {
    id: string, cardName: string
}

const CardInHandFactoryHelper = (id: string, card: string): JSX.Element => {
    const key = Math.floor(Math.random() * 10000)

    switch (card) {
        case 'tacocat':
            return (<InHandCard cardId={id}
                cardName="TACOCAT"
                cardBorderColour="grey"
                cardImage={TacocatImage}
                cardIcon={TacoCatIcon}
                key={key} />)
        case 'nope':
            return (<InHandCard cardId={id}
                cardName="NOPE"
                cardBorderColour="red"
                cardImage={TacocatImage}
                cardIcon={TacoCatIcon}
                key={key} />)
    }

    return (<InHandCard cardId={id}
        cardName="BROKEN"
        cardBorderColour="red"
        cardImage={TacocatImage}
        cardIcon={TacoCatIcon}
        key={key} />)
}



const CardInHandFactory = (props: ICardInHand) => {
    return (
        CardInHandFactoryHelper(props.id, props.cardName)
    );
}






export { CardInHandFactory };