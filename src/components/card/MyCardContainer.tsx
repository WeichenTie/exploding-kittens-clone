import './Card.css'

interface Props {
    cards: JSX.Element[]
}

const MyCardContainer = (props: Props) => {
    function MyCard() {
        
    }
    return (
        <div className="my-card-container">
            {props.cards}
        </div>
    )
}


export default MyCardContainer;