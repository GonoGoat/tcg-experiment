// Library import
import { nanoid } from "utils/modules/nanoid/nanoid"

// Component imports
import { Card, BlankCard } from 'components/Cards'
import { ActionMenu } from 'components'

// Style imports
import 'assets/style/pages/Deck.css'

// Enum/Interface/Type imports
import { genericCard, cardInfo, genericCardWithCount } from 'types/ygopro.types'
import { CARD_ZONE } from 'types/global.enum'

// Static asset import
import { capitalizeFirstLetter } from 'utils/beautifiers'
import { blankCardPayload } from 'utils/global.const'

// Context imports
import useDeckStore from 'context/DeckStore/store'

const Deck = () => {
    const main = useDeckStore(state => state.main)
    const extra = useDeckStore(state => state.extra)
    const side = useDeckStore(state => state.side)

    const addCard = useDeckStore(state => state.addCard)
    const dispatchCard = useDeckStore(state => state.dispatchCard)
    const removeCard = useDeckStore(state => state.removeCard)

    const blankCardActions = (cardId: string, dest: CARD_ZONE) => 
    [
        ...( Object.values(CARD_ZONE).filter( (value) => value !== CARD_ZONE.BANK).map( (value) => {
            return {
                label: capitalizeFirstLetter(value),
                onClick: () => addCard({...blankCardPayload, id: nanoid()}, value)
            }
        })),
        {
            label: "Remove",
            onClick: () => removeCard(cardId, dest)
        }
    ]

    const cardActions = (card: genericCard, dest: CARD_ZONE) => {
        let res = [
            {
                label: "Remove",
                onClick: () => removeCard(card.id.toString(), dest) 
            }
        ];
        switch(dest) {
            case (CARD_ZONE.SIDE):
                res = [
                    ...res,
                    {
                        label: "Main/Extra",
                        onClick: () => dispatchCard(card)
                    },
                    {
                        label: "Bank",
                        onClick: () => addCard(card, CARD_ZONE.BANK)
                    }
                ]
                break;
            case (CARD_ZONE.BANK):
                res = [
                    ...res,
                    {
                        label: "Main/Extra",
                        onClick: () => dispatchCard(card)
                    },
                    {
                        label: "Side",
                        onClick: () => addCard(card, CARD_ZONE.SIDE)
                    }
                ]
                break;
            default: // In MD and ED
                res = [
                    ...res,
                    {
                        label: "Side",
                        onClick: () => addCard(card, CARD_ZONE.SIDE)
                    },
                    {
                        label: "Bank",
                        onClick: () => addCard(card, CARD_ZONE.BANK)
                    }
                ]
        }
        return res;
    }

    const getCards = (cards: Record<string, genericCardWithCount>, dest: CARD_ZONE) => {
        return Object.keys(cards).sort( (a,b) => cards[a].addedDate.getTime() - cards[b].addedDate.getTime())
        .map( (cardId) => {
            if (cards[cardId].card.type === blankCardPayload.type) {
                return (
                    <BlankCard key={cardId}>
                        <ActionMenu actions={blankCardActions(cardId, dest)}/>
                    </BlankCard>
                )
            }
            else {
                let res = [];
                for (let i = 0; i < cards[cardId].count; i++) {
                    res.push(                    
                        <Card
                            cardInfo={cards[cardId].card as cardInfo}
                            key={nanoid()} 
                        >
                            <ActionMenu actions={cardActions(cards[cardId].card, dest)}/>
                        </Card>
                    )
                }
                return res
            }
        }).flat()
    }
    
    return (
        <div className="deck">
            <div className="main" tabIndex={0}>
                {getCards(main, CARD_ZONE.MAIN)}
            </div>
            <div className="extra" tabIndex={0}>
                {getCards(extra, CARD_ZONE.EXTRA)}
            </div>
            <div className="side" tabIndex={0}>
                {getCards(side, CARD_ZONE.SIDE)}
            </div>
        </div>
    )
   
}

export default Deck