import './Card.css'
import { InHandCard } from './Card'

const MyCardContainer = () => {

    let cards = [];
    const limit = 10;
    for (let i = 0; i < limit; i++) {
        cards.push(
            <InHandCard cardName="TACOCAT"
                cardBorderColour="grey"
                cardImage={null}
                cardIcon={null}
                key={Math.random()*100000}/>
        );
    }



    return (
        <div className="my-card-container">
            {cards}
        </div>
    )
}


export default MyCardContainer;