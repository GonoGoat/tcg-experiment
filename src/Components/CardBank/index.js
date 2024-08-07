import React from 'react'
import shortid from 'shortid'

import Card from '../Card'
import BlankCard from '../BlankCard'

import './card_bank.css'
import { getClassName } from '../../res/utils'

import useDeckStore from '../../Zustand/DeckStore/store'
import useAppStore from '../../Zustand/AppStore/store'

const className = "card-bank"
// TODO : Export/import via File system (same as decks)
const CardBank = () => {
    const bank = useDeckStore(state => state.bank)
    const activeTab = useAppStore(state => state.activeTab)

    return (
        <div className={getClassName(activeTab,className)}>
            <div>
                <h3>Card Bank</h3>
            </div>
            {
                bank.map( (card, index)  =>card.type === "blank"?
                    <BlankCard 
                        index={index}  
                        key={shortid.generate()} 
                        source="bank"
                    />
                    :
                    <Card 
                        cardInfo={card}
                        key={shortid.generate()} 
                        index={index}    
                        source="bank"        
                    />
                )
            }
        </div>
    )
   
}

export default CardBank