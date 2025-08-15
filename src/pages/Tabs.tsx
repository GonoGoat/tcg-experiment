import 'assets/style/pages/Tabs.css'
import { ACTIVE_TAB } from 'types/global.enum'
import { capitalizeFirstLetter } from 'utils/beautifiers'
import useAppStore from 'context/AppStore/store'

import { Button } from 'components/Forms'

import {Bank, Statistics, Options} from '.'

const Tabs = () => {        
    
    const setActiveTab = useAppStore((state) => state.setActiveTab)

    return (
        <div className='tabs'>
            <div className="links">
                {
                    Object.values(ACTIVE_TAB).map(tab => 
                        <Button key={tab} className='tablinks' value={tab} onClick={() => setActiveTab(tab)} label={capitalizeFirstLetter(tab)}
                        />
                    )
                }
            </div>
            
            <Statistics/>
            <Bank/>
            <Options/>
        </div>
    )
}

export default Tabs