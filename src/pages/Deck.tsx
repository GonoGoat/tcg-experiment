import shortid from 'shortid'

import {Card, BlankCard, ActionMenu, DisplayMenu} from 'components'

import { genericCard, cardInfo } from 'types/ygopro.types'
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

    const blankCardActions = (index: number, dest: CARD_ZONES) => 
    [
        ...(Object.keys(CARD_ZONES).map( (key) => {
            return {
                label: capitalizeFirstLetter(CARD_ZONES[key as keyof typeof CARD_ZONES]),
                onClick: () => addCard({...blankCardPayload, id: shortid.generate()}, CARD_ZONES[key as keyof typeof CARD_ZONES])
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
                    }
                ]
                break;
            default: // In MD and ED
                res = [
                    ...res,
                    {
                        label: "Side",
                        onClick: () => addCard(card, CARD_ZONES.SIDE)
                    }
                ]
        }
        return res;
    }

    const getCards = (map: genericCard[], dest: CARD_ZONES) => {
        return map.map( (card, index) => {
            const displayMenu = <DisplayMenu display={markers[card.id] ? markers[card.id] : [card.id.toString()]} onClickHandler={() => handleMarking(card.id.toString())}/>
            if (card.type === blankCardPayload.type) {
                const actionMenu = <ActionMenu actions={blankCardActions(index, dest)}/>
                return (
                    <BlankCard
                        index={index}
                        key={card.id}
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
                const actionMenu = <ActionMenu actions={cardActions(card, index, dest)}/>
                return (
                    <Card
                        cardInfo={card as cardInfo}
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