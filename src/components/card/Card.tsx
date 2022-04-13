import './Card.css';
import { useState, useEffect, useRef }  from "react";
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
    cardId:string;
    cardClass: string;
    cardName: string;
    cardOnClick: Function;
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
    cardId:string;
    cardName: string;
    cardBorderColour: string;
    cardImage: any;
    cardIcon: any;
}

const Card = (props:ICard) => {
    return (
        <div id={props.cardId}
            className={props.cardClass}
            style={{outline: `3px solid ${props.cardBorderColour}`}}
            onClick={()=>props.cardOnClick()}
        >
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

const InHandCard = (props:IInHandCard) :JSX.Element => {
    const selected = useRef(false);
    const thisCard = useRef(null);


    const cardOnEnter = async () => {
        thisCard.current = document.getElementById(props.cardId);
        await new Promise(resolve => setTimeout(()=> {
            thisCard.current.classList.remove('card-begin-enter');
            resolve('');
        }, 0))
        await new Promise(resolve => setTimeout(resolve, 400))
        thisCard.current.classList.remove('card-entering');
    }
    useEffect(()=>{
        console.log("loaded in");
            cardOnEnter()
        }
    , []);

    return (
        <Card
            cardId={props.cardId}
            cardClass='card in-hand-card card-entering card-begin-enter'
            cardName={props.cardName}
            cardOnClick={()=>{
                if (selected.current) {
                    thisCard.current.classList.remove('card-selected');
                } else {
                    thisCard.current.classList.add('card-selected');
                }
                selected.current = !selected.current;
            }}
            cardBorderColour={props.cardBorderColour}
            cardImage={props.cardImage}
            cardIcon={props.cardIcon}
            cardFlavourText={null}
            cardEffectText={null}/>
    )
}

const PlayedCard = (props:IPlayedCard) => {
    const id = Math.random() * 1000;
    return (
        <div className='card-played' 
            style={{
                transform: `rotateZ(${(randn_bm() -0.5) * 60}deg)`}}>
            <Card cardId={'card-'+id}
                cardClass='card'
                cardName={props.cardName}
                cardOnClick={()=>{console.log('====================================');
                    console.log('Pressed');
                    console.log('====================================');}}
                cardBorderColour={props.cardBorderColour}
                cardImage={props.cardImage}
                cardIcon={props.cardIcon}
                cardFlavourText={null}
                cardEffectText={null}/>
        </div>
    )
}


export { Card, InHandCard, PlayedCard };