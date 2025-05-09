import shortid from 'shortid'

import {Card, BlankCard} from 'components'

import 'assets/style/pages/Deck.css'
import useDeckStore from 'context/DeckStore/store'

const Deck = () => {
    const main = useDeckStore(state => state.main)
    const extra = useDeckStore(state => state.extra)
    
    return (
        <div className="deck">
                    {
                        main.map( (card, index) =>card.type === "blank"?
                            <BlankCard 
                                index={index}  
                                key={shortid.generate()} 
                            />
                            :
                            <Card 
                                cardInfo={card}
                                key={shortid.generate()} 
                                index={index}           
                            />
                        )
                    }
                    {
                        extra.map( (card, index)  =>card.type === "blank"?
                            <BlankCard 
                                index={index}  
                                key={shortid.generate()} 
                            />
                            :
                            <Card 
                                cardInfo={card}
                                key={shortid.generate()} 
                                index={index}            
                            />
                        )
                    }
        </div>
    )
   
}

export default Deck