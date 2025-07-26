import React, {useState} from 'react'
import shortid from 'shortid'
import {default as Axios} from 'axios'

import 'assets/style/pages/Bank.css'
import { cardInfo, Root, genericCard } from 'types/ygoOpenAPI.types'
import { CARD_ZONES, ACTIVE_TABS } from 'types/global.enum'
import { capitalizeFirstLetter } from 'utils/beautifiers'
import useDeckStore from 'context/DeckStore/store'
import useAppStore from 'context/AppStore/store'
import { getClassName } from 'utils/utils'

import {Card} from 'components/Cards'
import ActionMenu from 'components/ActionMenu'

const Bank = () => {

    const bank = useDeckStore(state => state.bank)

    const addCard = useDeckStore(state => state.addCard)
    const dispatchCard = useDeckStore(state => state.dispatchCard)
    const removeCard = useDeckStore(state => state.removeCard)

    const activeTab = useAppStore(state => state.activeTab)

    const cardActions = (card: genericCard) => 
    [
        {
            label: "Main/Extra",
            onClick: () => dispatchCard(card)
        },
        {
            label: "Side",
            onClick: () => addCard(card, CARD_ZONES.SIDE)
        },
        {
            label: "Remove",
            onClick: () => removeCard(card.id.toString(), CARD_ZONES.BANK) 
        }
    ]

    return (
        <div className={getClassName(activeTab, ACTIVE_TABS.BANK)}>
            <div>
                <h3>Card Bank</h3>
            </div>
            {
                Object.keys(bank).sort( (a,b) => bank[a].addedDate.getTime() - bank[b].addedDate.getTime())
                .map( (cardId) =>
                    <Card 
                        cardInfo={bank[cardId].card as cardInfo}  
                        key={cardId} 
                    >
                        <ActionMenu actions={cardActions(bank[cardId].card)}/>
                    </Card> 
                )
            }
        </div>
    )  
}

export default Bank