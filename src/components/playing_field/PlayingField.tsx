import { PlayedCard } from "../card/Card";
import './PlayingField.css'

const PlayingField = () => {
    let cards = []
    let limit = 10;

    for (let i = 0; i < limit; i++) {
        cards.push(<PlayedCard
            cardName="TACOCAT"
            cardBorderColour="grey"
            cardImage={null}
            cardIcon={null}
            cardFlavourText={'fdafda'}
            cardEffectText={'fdafadf'}
            key={Math.random() * 100000} />)
    }

    return (
        <div className="playing-field">
            {cards}
        </div>
    )
}

export default PlayingField;