import './Card.css';
import { useState } from "react";
import AOS from './../../assets/tacocat.webp'
import Icon from './../../assets/cat-icon.svg'
import HelpIcon from './../../assets/question-mark.svg'


function randn_bm():number {
    let u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) return randn_bm() // resample between 0 and 1
    return num
  }

interface ICard {
    cardClass: string;
    cardName: string;
    cardBorderColour: string;
    cardImage: any;
    cardIcon: any;
    cardFlavourText: string | null;
    cardEffectText: string | null;
}

interface IPlayedCard {
    cardName: string;
    cardBorderColour: string;
    cardImage: any;
    cardIcon: any;
    cardFlavourText: string | null;
    cardEffectText: string | null;
}

interface IInHandCard {
    cardName: string;
    cardBorderColour: string;
    cardImage: any;
    cardIcon: any;
}

const Card = (props:ICard) => {
    return (
        <div className={props.cardClass} style={{outline: `3px solid ${props.cardBorderColour}`}}>
            <img className="card-help-icon" src={HelpIcon} alt="HelpIcon"/>
            <div className="card-top card-banner">
                <img className="card-icon" src={Icon} alt={props.cardName}/>
                <h1 className="card-name">{props.cardName}</h1>
            </div>
            <div className="card-middle">
                <img src={AOS} alt="" className="card-image" draggable="false"/>
            </div>
            <div className="card-bottom card-banner">
                <img className="card-icon" src={Icon} alt={props.cardName}/>
                <h1 className="card-name">{props.cardName}</h1>
            </div>
        </div>
    )
}

const InHandCard = (props:IInHandCard) => {
    return (
        <Card cardClass='card in-hand-card'
            cardName={props.cardName}
            cardBorderColour={props.cardBorderColour}
            cardImage={props.cardImage}
            cardIcon={props.cardIcon}
            cardFlavourText={null}
            cardEffectText={null}
            key={Math.random()*100000}/>
    )
}

const PlayedCard = (props:IPlayedCard) => {
    return (
        <div className='card-played' 
            style={{
                transform: `rotateZ(${(randn_bm() -0.5) * 60}deg)`}}>
            <Card 
                cardClass='card'
                cardName={props.cardName}
                cardBorderColour={props.cardBorderColour}
                cardImage={props.cardImage}
                cardIcon={props.cardIcon}
                cardFlavourText={null}
                cardEffectText={null}
                key={Math.random()*100000}/>
        </div>
    )
}


export { Card, InHandCard, PlayedCard };