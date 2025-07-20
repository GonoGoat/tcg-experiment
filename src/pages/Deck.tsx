import shortid from 'shortid'

import {Card, BlankCard, ActionMenu, DisplayMenu} from 'components'

import { genericCard, cardInfo,genericCardWithCount } from 'types/ygopro.types'
import { CARD_ZONES, MARKING_MODE } from 'types/global.enum'
import { capitalizeFirstLetter } from 'utils/beautifiers'
import { blankCardPayload } from 'utils/global.const'
import 'assets/style/pages/Deck.css'
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

    const blankCardActions = (cardId: string, dest: CARD_ZONES) => 
    [
        ...(Object.keys(CARD_ZONES).map( (key) => {
            return {
                label: capitalizeFirstLetter(CARD_ZONES[key as keyof typeof CARD_ZONES]),
                onClick: () => addCard({...blankCardPayload, id: shortid.generate()}, CARD_ZONES[key as keyof typeof CARD_ZONES])
            }
        })),
        {
            label: "Remove",
            onClick: () => removeCard(cardId, dest)
        }
    ]

    const cardActions = (card: genericCardWithCount, dest: CARD_ZONES) => {
        let res = [
            {
                label: "Remove",
                onClick: () => removeCard(card.card.id.toString(), dest) 
            }
        ];
        switch(dest) {
            case (CARD_ZONES.SIDE):
                res = [
                    ...res,
                    {
                        label: "Main/Extra",
                        onClick: () => dispatchCard(card.card)
                    }
                ]
                break;
            default: // In MD and ED
                res = [
                    ...res,
                    {
                        label: "Side",
                        onClick: () => addCard(card.card, CARD_ZONES.SIDE)
                    }
                ]
        }
        return res;
    }

    const getCards = (cards: Record<string, genericCardWithCount>, dest: CARD_ZONES) => {
        let index = -1; // started at -1 to be at 0 on first card
        return Object.keys(cards).sort( (a,b) => cards[a].addedDate.getTime() - cards[b].addedDate.getTime())
        .map( (cardId) => {
            const displayMenu = <>
                <DisplayMenu display={markers[cardId] ? markers[cardId] : [cardId]} onClickHandler={() => handleMarking(cardId)}/>
                {cardId in markers ?
                    <button className="row" style={{zIndex: 10, position: "absolute"}} onClick={() => removeCardFromMarkings(cardId.toString())}>Remove all above markings</button>
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
                const actionMenu = <ActionMenu actions={cardActions(cards[cardId], dest)}/>
                let res = [];
                for (let i = 0; i < cards[cardId].count; i++) {
                    index += 1;
                    res.push(                    
                        <Card
                            cardInfo={cards[cardId].card as cardInfo}
                            key={shortid.generate()} 
                            index={index}
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