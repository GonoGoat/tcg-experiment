import fileDownload from 'js-file-download'

import 'assets/style/pages/Options.css'
import { cardInfo } from 'types/ygopro.types'
import useDeckStore from '../context/DeckStore/store'

const Options = () => {
/*    const eraseDeck =  useDeckStore(state => state.eraseDeck)
    const main = useDeckStore(state => state.main)
    const extra = useDeckStore(state => state.extra)
      
    const deckBuilder = () => {
        let deckFileToDownload = ''
        
        deckFileToDownload += `#created by DaisukiTamago's Deck Builder https://github.com/DaisukiTamago/yugioh-react-deck-builder\n`
        deckFileToDownload += `#main\n`
        main.map((card: cardInfo) => deckFileToDownload+= card.id.toString() + '\n')
        deckFileToDownload += `#extra\n`
        extra.map((card: cardInfo) => deckFileToDownload+= card.id.toString() + '\n')

        fileDownload(deckFileToDownload, 'deck.ydk', 'application/octet-stream')
    }
    
    return (
            <div className="options">
                <button onClick={() => eraseDeck()} >Erase</button>
                <button onClick={() => deckBuilder()}>Download</button>
            </div>
    )*/
}

export default Options

