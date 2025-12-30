// Library import
import fileDownload from 'js-file-download'

// Component imports
import { Button } from 'components/Forms'
import { blankCardPayload } from 'utils/global.const'

// Style imports
import 'assets/style/pages/Options.css'

// Enum/Interface/Type imports
import { genericCardWithCount } from 'types/ygopro.types'

// Static asset import
import { getClassName } from 'utils/utils'
import { ACTIVE_TAB } from 'types/global.enum'

// Context imports
import useDeckStore from 'context/DeckStore/store'
import useAppStore from 'context/AppStore/store'

const Options = () => {
    const activeTab = useAppStore(state => state.activeTab)

    const eraseDeck =  useDeckStore(state => state.eraseDeck)
    const main = useDeckStore(state => state.main)
    const extra = useDeckStore(state => state.extra)
    const side = useDeckStore(state => state.side)

    const getYdkCardsPerDeck = (deck: Record<string, genericCardWithCount>) => {
        let output = ``
        Object.values(deck).forEach((card: genericCardWithCount) => {
            if (card.card.type !== blankCardPayload.type) {
                for (let i = 0; i<card.count ; i++) {
                    output += (card.card.id.toString() + '\n')
                }
            }
        })
        return output
    }
      
    const deckBuilder = () => {
        let deckFileToDownload = ''
        
        deckFileToDownload += `#created by YuGiKnow's Deck Builder\n`
        deckFileToDownload += `#main\n`
        deckFileToDownload += getYdkCardsPerDeck(main)
        deckFileToDownload += `#extra\n`
        deckFileToDownload += getYdkCardsPerDeck(extra)
        deckFileToDownload += `!side\n`
        deckFileToDownload += getYdkCardsPerDeck(side)
        
        fileDownload(deckFileToDownload, 'deck.ydk', 'application/octet-stream') // TODO custom name for generated file
    }
    
    return (
        <div className={getClassName(activeTab, ACTIVE_TAB.OPTIONS)}>
            <Button onClick={() => eraseDeck()} label="Erase"/>
            <Button onClick={() => deckBuilder()} label="Download"/>
        </div>
    )
}

export default Options

