// Library import
import { nanoid } from "utils/modules/nanoid/nanoid"

// Component imports
import { Card, BlankCard } from 'components/Cards'
import { DisplayMenu } from 'components'
import { Button } from "components/Forms"

// Style imports
import 'assets/style/pages/MarkerDeck.css'

// Enum/Interface/Type imports
import { cardInfo, genericCardWithCount } from 'types/ygoOpenAPI.types'

// Static asset import
import { blankCardPayload } from 'utils/global.const'

// Context imports
import useDeckStore from 'context/DeckStore/store'
import useStatStore from 'context/StatStore/store'

const MarkerDeck = () => {
    const main = useDeckStore(state => state.main)
    const extra = useDeckStore(state => state.extra)
    const side = useDeckStore(state => state.side)

    const markers = useStatStore(state => state.markers)

    const handleMarking = useStatStore(state => state.handleMarking)
    const removeCardFromMarkings = useStatStore(state => state.removeCardFromMarkings)

    const getCards = (cards: Record<string, genericCardWithCount>) => {
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
                return (
                    <BlankCard
                        key={cardId}
                        defaultMenu
                        menuToggleMode
                    >
                        {displayMenu}
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
                            defaultMenu
                            menuToggleMode
                        >
                            {displayMenu}
                        </Card>
                    )
                }
                return res
            }
        }).flat()
    }
    
    return (
        <div className="marker-deck">
            <div className="main" tabIndex={0}>
                {getCards(main)}
            </div>
            <div className="extra" tabIndex={0}>
                {getCards(extra)}
            </div>
            <div className="side" tabIndex={0}>
                {getCards(side)}
            </div>
        </div>
    )
   
}

export default MarkerDeck