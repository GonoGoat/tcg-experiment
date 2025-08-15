import 'assets/style/pages/Statistics.css'
import { genericCardWithCount } from 'types/ygoOpenAPI.types'
import { capitalizeFirstLetter } from 'utils/beautifiers'
import { getClassName } from 'utils/utils'
import { MARKER, ACTIVE_TAB } from 'types/global.enum'
import useDeckStore from "context/DeckStore/store"
import useStatStore from 'context/StatStore/store'
import useAppStore from 'context/AppStore/store'

const Statistics =  () => {

    const main = useDeckStore((state) => state.main)
    const extra = useDeckStore((state) => state.extra)
    const side = useDeckStore((state) => state.side)

    const activeMarker = useStatStore((state) => state.activeMarker)
    const markers = useStatStore((state) => state.markers)

    const enableMarking = useStatStore((state) => state.enableMarking)
    const disableMarking = useStatStore((state) => state.disableMarking)
    const resetMarkings = useStatStore((state) => state.resetMarkings)

    const activeTab = useAppStore(state => state.activeTab)

    function countCardsInCollection (collection: genericCardWithCount[]) {
        return collection.reduce(
            (accumulator, currentValue) => accumulator + currentValue.count, 0,
        );
    }

    function countCardsInCollectionPerCardType (collection: genericCardWithCount[], cardType: string) {
        return countCardsInCollection(collection.filter( (card) => new RegExp(cardType).test(card.card.type.toLowerCase())))
    }

    function countCardsInCollectionPerMarking (collection: genericCardWithCount[], marker: MARKER) {
        return countCardsInCollection(collection.filter( (card) => (markers[card.card.id] || []).includes(marker) ))
    }

    return (
        <div className={getClassName(activeTab, ACTIVE_TAB.STATS)}>
            <button onClick={() => resetMarkings()}>Reset all markings</button>
            <div className='markers'>
                {Object.values(MARKER).filter(value => value !== MARKER.DEFAULT).map( (value, index) =>
                    <div
                        className={value === activeMarker ? "selected":""}
                        key={index} 
                        onMouseDown={value === activeMarker ? (() => disableMarking()) : (() => enableMarking(value))}
                    >
                        {value}
                    </div>
                )}
            </div>
            <hr/>
            <div className='results'>
                <div>
                    <h3>Statistics</h3>
                </div>
                <div>
                    <span><strong>Main size:</strong> {countCardsInCollection(Object.values(main))}</span><br/>
                    <span><strong>Extra size:</strong> {countCardsInCollection(Object.values(extra))}</span><br/>
                    <span><strong>Side size:</strong> {countCardsInCollection(Object.values(side))}</span><br/>
                </div>
                <br/>
                <div>
                    <span><strong>Monster cards count:</strong> {countCardsInCollectionPerCardType(Object.values(main), "monster")}</span><br/>
                    <span><strong>Spell cards count:</strong> {countCardsInCollectionPerCardType(Object.values(main), "spell")}</span><br/>
                    <span><strong>Trap cards count:</strong> {countCardsInCollectionPerCardType(Object.values(main), "trap")}</span><br/>
                </div>
                <br/>
                <div>
                    {Object.values(MARKER).filter(value => value !== MARKER.DEFAULT).map( (marker) =>
                        <> 
                            <span><strong>{capitalizeFirstLetter(marker)} count: </strong>{countCardsInCollectionPerMarking(Object.values(main), marker)} {countCardsInCollectionPerMarking(Object.values(side), marker) > 0 ? `(+${countCardsInCollectionPerMarking(Object.values(side), marker)} in side)` : ""}</span><br/>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Statistics