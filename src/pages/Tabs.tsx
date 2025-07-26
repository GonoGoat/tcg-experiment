import 'assets/style/pages/Tabs.css'
import { ACTIVE_TABS } from 'types/global.enum'
import { capitalizeFirstLetter } from 'utils/beautifiers'
import useAppStore from 'context/AppStore/store'

import {Bank, Statistics} from '.'

const Tabs = () => {        
    
    const setActiveTab = useAppStore((state) => state.setActiveTab)

    return (
        <div className='tabs'>
            <div className="links">
                {
                    Object.values(ACTIVE_TABS).map(tab => 
                        <button key={tab} className='tablinks' value={tab} onClick={() => setActiveTab(tab)}>
                            {capitalizeFirstLetter(tab)}
                        </button>
                    )
                }
            </div>
            
            <Statistics/>
            <Bank/>
        </div>
    )
}

export default Tabs