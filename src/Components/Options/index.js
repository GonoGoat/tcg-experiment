import React from 'react'
import './options.css'
import useDeckStore from '../../Zustand/DeckStore/store'
import fileDownload from 'js-file-download'

const Options = () => {
    const eraseDeck =  useDeckStore(state => state.eraseDeck)
    const main = useDeckStore(state => state.main)
    const extra = useDeckStore(state => state.extra)
      
    const deckBuilder = () => {
        let deckFileToDownload = ''
        
        deckFileToDownload += `#created by DaisukiTamago's Deck Builder https://github.com/DaisukiTamago/yugioh-react-deck-builder\n`
        deckFileToDownload += `#main\n`
        main.map(card => deckFileToDownload+= card.id.toString() + '\n')
        deckFileToDownload += `#extra\n`
        extra.map(card => deckFileToDownload+= card.id.toString() + '\n')

        fileDownload(deckFileToDownload, 'deck.ydk', 'application/octet-stream')
    }
    
    return (
            <div className="options">
                <button onClick={() => eraseDeck()} >Erase</button>
                <button onClick={() => deckBuilder()}>Download</button>
            </div>
    )
}

export default Options

