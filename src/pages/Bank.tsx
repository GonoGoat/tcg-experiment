// Component imports
import { Card } from 'components/Cards'
import ActionMenu from 'components/ActionMenu'

// Style imports
import 'assets/style/pages/Bank.css'

// Enum/Interface/Type imports
import { cardInfo, genericCard } from 'types/ygoOpenAPI.types'
import { CARD_ZONE, ACTIVE_TAB } from 'types/global.enum'

// Static asset imports
import { getClassName } from 'utils/utils'

// Context imports
import useDeckStore from 'context/DeckStore/store'
import useAppStore from 'context/AppStore/store'

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
            onClick: () => addCard(card, CARD_ZONE.SIDE)
        },
        {
            label: "Remove",
            onClick: () => removeCard(card.id.toString(), CARD_ZONE.BANK) 
        }
    ]

    return (
        <div className={getClassName(activeTab, ACTIVE_TAB.BANK)}>
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