import shortid from 'shortid'

import {Card, BlankCard} from 'components'

import { cardInfo } from 'types/ygopro.types'
import 'assets/style/pages/Deck.css'
import useDeckStore from 'context/DeckStore/store'

const Deck = () => {
    const main = useDeckStore(state => state.main)
    const extra = useDeckStore(state => state.extra)

    //const getCardComponent = () TODO Add function + component
    
    return (
        <div className="deck">
                    {
                        main.map( (card: cardInfo, index: number) =>card.type === "blank"?
                            <BlankCard 
                                index={index}  
                                key={shortid.generate()}
                                isDraggable={false} 
                            />
                            :
                            <Card
                                cardInfo={card}
                                key={shortid.generate()} 
                                index={index}
                                isDraggable={false}          
                            />
                        )
                    }
                    {
                        extra.map( (card: cardInfo, index: number)  =>card.type === "blank"?
                            <BlankCard 
                                index={index}  
                                key={shortid.generate()}
                                isDraggable={false}     
                            />
                            :
                            <Card 
                                cardInfo={card}
                                key={shortid.generate()} 
                                index={index}
                                isDraggable={false}                
                            />
                        )
                    }
        </div>
    )
   
}

export default Deck