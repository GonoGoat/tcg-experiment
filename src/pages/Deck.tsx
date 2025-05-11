import shortid from 'shortid'

import {Card, BlankCard} from 'components'

import { cardInfo } from 'types/ygopro.types'
import 'assets/style/pages/Deck.css'
import useDeckStore from 'context/DeckStore/store'

const Deck = () => {
    const main = useDeckStore(state => state.main)
    const extra = useDeckStore(state => state.extra)

    const getCardComponent = (card: cardInfo, index: number) => {
        if (card.type === "blank") {
            return (
                <BlankCard 
                    index={index}  
                    key={shortid.generate()}
                    isDraggable={false} 
                />
            )
        }
        else {
            return (
                <Card
                    cardInfo={card}
                    key={shortid.generate()} 
                    index={index}
                    isDraggable={false}          
                />
            )
        }
    }
    
    return (
        <div className="deck">
            {main.map(getCardComponent)}
            {extra.map(getCardComponent)}
        </div>
    )
   
}

export default Deck