import React, {useState} from 'react'
import shortid from 'shortid'
import {default as Axios} from 'axios'

import 'assets/style/pages/Bank.css'
import { cardInfo, Root, genericCard } from 'types/ygopro.types'
import { CARD_ZONES } from 'types/global.enum'
import { capitalizeFirstLetter } from 'utils/beautifiers'
import useDeckStore from 'context/DeckStore/store'

import {Card, ActionMenu} from 'components'

const Bank = () => {

    const bank = useDeckStore(state => state.bank)
    const addCard = useDeckStore(state => state.addCard)
    const dispatchCard = useDeckStore(state => state.dispatchCard)

    const cardActions = (card: genericCard) => 
    [
        {
            label: "Main/Extra",
            onClick: () => dispatchCard(card)
        },
        {
            label: "Side",
            onClick: () => addCard(card, CARD_ZONES.BANK)
        }
    ]

    return (
        <div className="bank">
            {
                bank.map( (card: cardInfo, index: number) =>
                    <Card 
                        cardInfo={card}  
                        key={card.id} 
                        index={index}
                    >
                        <ActionMenu actions={cardActions(card)}/>
                    </Card>
                )
            }
        </div>
    )  
}

export default Bank