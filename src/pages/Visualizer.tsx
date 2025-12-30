// Library imports
import { MouseEvent } from 'react'

// Component imports
import { CardPlaceholder, CardDescription } from "components/Cards"

// Style imports
import 'assets/style/pages/Visualizer.css'

// Static asset import
import { capitalizeFirstLetter } from 'utils/beautifiers'
import { getClassName } from 'utils/utils'

// Enum/Interface/Type imports
import { cardInfo, genericCardWithCount } from 'types/ygopro.types'
import { MARKER, ACTIVE_TAB } from 'types/global.enum'

// Context imports
import useVisualizerStore from "context/VisualizerStore/store"
import useAppStore from 'context/AppStore/store'

const Visualizer =  () => {

    const card = useVisualizerStore((state) => state.card)

    const activeTab = useAppStore(state => state.activeTab)

    if (Boolean(card.id)) {
        return (
            <div className={getClassName(activeTab, ACTIVE_TAB.VISUALIZER)}>
                <CardPlaceholder img={card.card_images[0].image_url} name={card.name} clickHandler={(e: MouseEvent)=>null}/>
                <CardDescription cardInfo={card}/>
            </div>
        )
    }
    else {
        return (
            <div className={getClassName(activeTab, ACTIVE_TAB.VISUALIZER)}>
                Please select a card
            </div>
        )
    }
}

export default Visualizer