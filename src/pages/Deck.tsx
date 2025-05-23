import shortid from 'shortid'

import {Card, BlankCard} from 'components'

import { genericCard, cardInfo } from 'types/ygopro.types'
import { CARD_ZONES } from 'types/global.enum'
import 'assets/style/pages/Deck.css'
import useDeckStore from 'context/DeckStore/store'

const Deck = () => {
    const main = useDeckStore(state => state.main)
    const extra = useDeckStore(state => state.extra)

    const getCards = (map: genericCard[], dest: CARD_ZONES) => {
        return map.map( (card, index) => {
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
                        cardInfo={card as cardInfo}
                        key={shortid.generate()} 
                        index={index}
                        isDraggable={false}          
                    />
                )
            }
        })
    }
    
    return (
        <div className="deck">
            <div className="main" tabIndex={0}>
                {getCards(main, CARD_ZONES.MAIN)}
            </div>
            <div className="extra" tabIndex={0}>
                {getCards(extra, CARD_ZONES.EXTRA)}
            </div>
        </div>
    )
   
}

export default Deck