import fileDownload from 'js-file-download'

import 'assets/style/pages/Options.css'
import { genericCardWithCount, blankCardTypePayload } from 'types/ygoOpenAPI.types'
import useDeckStore from 'context/DeckStore/store'
import useAppStore from 'context/AppStore/store'
import { getClassName } from 'utils/utils'
import { ACTIVE_TAB } from 'types/global.enum'

import { Button } from 'components/Forms'
import { blankCardPayload } from 'utils/global.const'

const Options = () => {
    const activeTab = useAppStore(state => state.activeTab)

    const eraseDeck =  useDeckStore(state => state.eraseDeck)
    const main = useDeckStore(state => state.main)
    const extra = useDeckStore(state => state.extra)
    const side = useDeckStore(state => state.side)

    const getYdkCardsPerDeck = (deck: Record<string, genericCardWithCount>, inputString: string ) => {
        let output = inputString
        Object.values(main).forEach((card: genericCardWithCount) => {
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
        deckFileToDownload += getYdkCardsPerDeck(main, deckFileToDownload)
        deckFileToDownload += `#extra\n`
        deckFileToDownload += getYdkCardsPerDeck(extra, deckFileToDownload)
        deckFileToDownload += `!side\n`
        deckFileToDownload += getYdkCardsPerDeck(side, deckFileToDownload)
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

