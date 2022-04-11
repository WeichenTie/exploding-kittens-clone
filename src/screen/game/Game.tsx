import './Game.css'

import MyCardContainer from '../../components/card/MyCardContainer';
import AllPlayers from '../../components/player/AllPlayers';
import Cat from '../../assets/cat-fish.gif'
import { PlayedCard } from '../../components/card/Card';
import PlayingField from '../../components/playing_field/PlayingField';

const Game = () => {
    return (
        <div className="game-container">
            <AllPlayers />

            <div className="game-field">
                <PlayingField/>
            </div>

            <div className="lower-game-container">
                <div className="self-avatar">
                    <img src={Cat} alt=''/>
                </div>
                <MyCardContainer />
            </div>
        </div>
    )
}


export default Game;