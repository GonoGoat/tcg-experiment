import React from 'react'
import shortid from 'shortid'

import Card from '../Card'

import './card_bank.css'
import { getClassName } from '../../res/utils'

import useDeckStore from '../../Zustand/DeckStore/store'
import useAppStore from '../../Zustand/AppStore/store'

const className = global.config.activeTabs.CARD_BANK
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
                bank.map( (card, index)  =>
                    <Card 
                        cardInfo={card}
                        key={shortid.generate()} 
                        index={index}    
                        source={global.config.sources.CARD_BANK}   
                    />
                )
            }
        </div>
    )
   
}

export default CardBank