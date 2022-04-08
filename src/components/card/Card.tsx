import './Card.css';
import { useState } from "react";
import AOS from './../../assets/AOS.png'



const Card = () => {
    const [cardClass, setCardClass] = useState('card')


    const handleMouseDown = (e:React.MouseEvent) => {
        
        if (cardClass === 'card') {
            setCardClass('card card-selected');
        }
        else {
            setCardClass('card');
        }
    }


    return (
        <div unselectable="on" className={cardClass}
            onMouseDown={(e)=>handleMouseDown(e)}>
            
            <img src={AOS} alt="" className="card-image" draggable="false"/>
        </div>
    )
}


export default Card;