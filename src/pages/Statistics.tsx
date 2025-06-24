import 'assets/style/pages/Statistics.css'
import { genericCardWithCount } from 'types/ygopro.types'
import { MARKERS } from 'types/global.enum'
import useDeckStore from "context/DeckStore/store"
import useStatStore from 'context/StatStore/store'

const Statistics =  () => {

    const main = useDeckStore((state) => state.main)
    const extra = useDeckStore((state) => state.extra)
    const side = useDeckStore((state) => state.side)

    const activeMarker = useStatStore((state) => state.activeMarker)

    const enableMarking = useStatStore((state) => state.enableMarking)
    const disableMarking = useStatStore((state) => state.disableMarking)
    const resetMarkings = useStatStore((state) => state.resetMarkings)

    function countCardsInCollection (collection: Record<string, genericCardWithCount>) {
        return Object.values(collection).reduce(
            (accumulator, currentValue) => accumulator + currentValue.count, 0,
        );
    }

    function countMarkedCardsInCollection (collection: Record<string, genericCardWithCount>) {
        return Object.values(collection).reduce(
            (accumulator, currentValue) =>  accumulator + currentValue.count, 0,
        );
    }

    return (
        <div className="statistics">
            <button onClick={() => resetMarkings()}>Reset all markings</button>
            <div className='markers'>
                {Object.values(MARKERS).filter(value => value !== MARKERS.DEFAULT).map( (value, index) =>
                    <div
                        className={value === activeMarker ?"selected":""}
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
                    <span><strong>Main size:</strong> {countCardsInCollection(main)}</span><br/>
                    <span><strong>Extra size:</strong> {countCardsInCollection(extra)}</span><br/>
                    <span><strong>Side size:</strong> {countCardsInCollection(side)}</span><br/>
                </div>
                <br/>
                {/*
                <div>
                    <span><strong>Monster cards count:</strong> {main.filter( (card) => new RegExp("monster").test(card.type.toLowerCase()))}</span><br/>
                    <span><strong>Spell cards count:</strong> {main.filter( (card) => new RegExp("spell").test(card.type.toLowerCase())).length}</span><br/>
                    <span><strong>Trap cards count:</strong> {main.filter( (card) => new RegExp("trap").test(card.type.toLowerCase())).length}</span><br/>
                </div>*/}
            </div>
        </div>
    )
}

export default Statistics