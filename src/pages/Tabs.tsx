// Component imports
import { Button } from 'components/Forms'
import { Bank, Statistics, Options, Visualizer } from '.'

// Style imports
import 'assets/style/pages/Tabs.css'

// Static asset import
import { capitalizeFirstLetter } from 'utils/beautifiers'

// Enum/Interface/Type imports
import { ACTIVE_TAB } from 'types/global.enum'

// Context imports
import useAppStore from 'context/AppStore/store'

const Tabs = () => {        
    
    const activeTab = useAppStore((state) => state.activeTab)
    const setActiveTab = useAppStore((state) => state.setActiveTab)

    return (
        <div className='tabs'>
            <div className="links">
                {
                    Object.values(ACTIVE_TAB).map(tab => 
                        <Button 
                            key={tab}
                            className={tab === activeTab? "active" : ""}
                            value={tab}
                            onClick={() => setActiveTab(tab)}
                            label={capitalizeFirstLetter(tab)}
                        />
                    )
                }
            </div>
            <div className='subtabs'>
                <Statistics/>
                <Bank/>
                <Options/>
                <Visualizer/>
            </div>
        </div>
    )
}

export default Tabs