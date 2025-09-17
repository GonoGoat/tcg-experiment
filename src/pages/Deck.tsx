// Library import
import { nanoid } from "utils/modules/nanoid/nanoid"

// Component imports
import { Card, BlankCard } from 'components/Cards'
import ActionMenu from 'components/ActionMenu'
import DisplayMenu from 'components/DisplayMenu'
import { Button } from "components/Forms"

// Style imports
import 'assets/style/pages/Deck.css'

// Enum/Interface/Type imports
import { genericCard, cardInfo, genericCardWithCount } from 'types/ygoOpenAPI.types'
import { CARD_ZONE, MARKING_MODE } from 'types/global.enum'

// Static asset import
import { capitalizeFirstLetter } from 'utils/beautifiers'
import { blankCardPayload } from 'utils/global.const'

// Context imports
import useDeckStore from 'context/DeckStore/store'
import useStatStore from 'context/StatStore/store'

const Deck = () => {
    const main = useDeckStore(state => state.main)
    const extra = useDeckStore(state => state.extra)
    const side = useDeckStore(state => state.side)

    const addCard = useDeckStore(state => state.addCard)
    const dispatchCard = useDeckStore(state => state.dispatchCard)
    const removeCard = useDeckStore(state => state.removeCard)

    const markers = useStatStore(state => state.markers)
    const markingMode = useStatStore(state => state.markingMode)

    const handleMarking = useStatStore(state => state.handleMarking)
    const removeCardFromMarkings = useStatStore(state => state.removeCardFromMarkings)

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
                        label: "Card Bank",
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
                        label: "Card Bank",
                        onClick: () => addCard(card, CARD_ZONE.BANK)
                    }
                ]
        }
        return res;
    }

    const getCards = (cards: Record<string, genericCardWithCount>, dest: CARD_ZONE) => {
        let index = -1; // started at -1 to be at 0 on first card
        return Object.keys(cards).sort( (a,b) => cards[a].addedDate.getTime() - cards[b].addedDate.getTime())
        .map( (cardId) => {
            const displayMenu = <>
                <DisplayMenu display={markers[cardId] ? markers[cardId] : [cardId]} onClickHandler={() => handleMarking(cardId)}/>
                {cardId in markers ?
                    <Button className="row" onClick={() => removeCardFromMarkings(cardId.toString())} label="Remove all above markings"/>
                    :
                    <></>
                }
            </>
            if (cards[cardId].card.type === blankCardPayload.type) {
                const actionMenu = <ActionMenu actions={blankCardActions(cardId, dest)}/>
                index += 1;
                return (
                    <BlankCard
                        index={index}
                        key={cardId}
                        defaultMenu={markingMode === MARKING_MODE.ACTIVE}
                        menuToggleMode={markingMode !== MARKING_MODE.ACTIVE}
                    >
                        {markingMode !== MARKING_MODE.INACTIVE? 
                            displayMenu   
                            :
                            actionMenu
                        }
                    </BlankCard>
                )
            }
            else {
                const actionMenu = <ActionMenu actions={cardActions(cards[cardId].card, dest)}/>
                let res = [];
                for (let i = 0; i < cards[cardId].count; i++) {
                    index += 1;
                    res.push(                    
                        <Card
                            cardInfo={cards[cardId].card as cardInfo}
                            key={nanoid()} 
                            defaultMenu={markingMode === MARKING_MODE.ACTIVE}
                            menuToggleMode={markingMode !== MARKING_MODE.ACTIVE}
                        >
                            {markingMode !== MARKING_MODE.INACTIVE? 
                                displayMenu   
                                :
                                actionMenu
                            }
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