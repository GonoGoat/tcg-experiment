import shortid from 'shortid'

import {Card, BlankCard, ActionMenu} from 'components'

import { genericCard, cardInfo } from 'types/ygopro.types'
import { CARD_ZONES } from 'types/global.enum'
import { capitalizeFirstLetter } from 'utils/beautifiers'
import { blankCardPayload } from 'utils/global.const'
import 'assets/style/pages/Deck.css'
import useDeckStore from 'context/DeckStore/store'

const Deck = () => {
    const main = useDeckStore(state => state.main)
    const extra = useDeckStore(state => state.extra)
    const side = useDeckStore(state => state.side)

    const addCard = useDeckStore(state => state.addCard)
    const dispatchCard = useDeckStore(state => state.dispatchCard)
    const removeCard = useDeckStore(state => state.removeCard)

    const blankCardActions = (index: number, dest: CARD_ZONES) => 
    [
        ...(Object.keys(CARD_ZONES).map( (key) => {
            return {
                label: capitalizeFirstLetter(CARD_ZONES[key as keyof typeof CARD_ZONES]),
                onClick: () => addCard(blankCardPayload, CARD_ZONES[key as keyof typeof CARD_ZONES])
            }
        })),
        {
            label: "Remove",
            onClick: () => removeCard(index, dest)
        }
    ]

    const cardActions = (card: genericCard, index: number, dest: CARD_ZONES) => {
        let res = [
            {
                label: "Remove",
                onClick: () => removeCard(index, dest) 
            }
        ];
        switch(dest) {
            case (CARD_ZONES.SIDE):
                res = [
                    ...res,
                    {
                        label: "Main/Extra",
                        onClick: () => dispatchCard(card)
                    },
                    {
                        label: "Card Bank",
                        onClick: () => addCard(card, CARD_ZONES.BANK)
                    }
                ]
                break;
            case (CARD_ZONES.BANK):
                res = [
                    ...res,
                    {
                        label: "Main/Extra",
                        onClick: () => dispatchCard(card)
                    },
                    {
                        label: "Side",
                        onClick: () => addCard(card, CARD_ZONES.SIDE)
                    }
                ]
                break;
            default: // In MD and ED
                res = [
                    ...res,
                    {
                        label: "Side",
                        onClick: () => addCard(card, CARD_ZONES.SIDE)
                    },
                    {
                        label: "Card Bank",
                        onClick: () => addCard(card, CARD_ZONES.BANK)
                    }
                ]
        }
        return res;
    }

    const getCards = (map: genericCard[], dest: CARD_ZONES) => {
        return map.map( (card, index) => {
            if (card.type === "blank") {
                return (
                    <BlankCard index={index} key={shortid.generate()}>
                        <ActionMenu actions={blankCardActions(index, dest)}/>
                    </BlankCard>
                )
            }
            else {
                return (
                    <Card
                        cardInfo={card as cardInfo}
                        key={shortid.generate()} 
                        index={index}
                    >
                        <ActionMenu actions={cardActions(card, index, dest)}/>
                    </Card>
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
            <div className="side" tabIndex={0}>
                {getCards(side, CARD_ZONES.SIDE)}
            </div>
        </div>
    )
   
}

export default Deck