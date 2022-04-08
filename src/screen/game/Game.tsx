import './Game.css'

import Card from './../../components/card/Card';
import MyCardContainer from './../../components/my_card_container/MyCardContainer';
import AllPlayers from '../../components/player/AllPlayers';

const Game = () => {
    return (
        <div className="game-container">
            <div className="upper-container">
                <div className="players-field">
                    <AllPlayers/>
                </div>
                <div className="game-field">
                    <span className="slam">Slam</span>
                </div>
            </div>
            
            <div className="my-hand">
                <MyCardContainer/>
            </div>
        </div>
    )
}


export default Game;