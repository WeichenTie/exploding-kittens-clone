import './Player.css'
import CardIcon from '../../assets/card-icon.svg';

import Cat from '../../assets/cat.gif'


const Player = () => {

    
    return (
        <div className="player-container">
            <div className="player-avatar">
                <img src={Cat} alt=""/>
            </div>
            <div className="player-name">
                A Penguin
            </div>
            <div className="player-card-count">
                <img src={CardIcon} alt="card icon"></img>
                <p> ✖ 10</p>
            </div>
        </div>
    );
}

export default Player;