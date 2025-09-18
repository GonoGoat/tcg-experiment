// Component imports
import { Button } from 'components/Forms'
import { Bank, Statistics, Options } from '.'

// Style imports
import 'assets/style/pages/Tabs.css'

// Static asset import
import { capitalizeFirstLetter } from 'utils/beautifiers'

// Enum/Interface/Type imports
import { ACTIVE_TAB } from 'types/global.enum'

// Context imports
import useAppStore from 'context/AppStore/store'

const Tabs = () => {        
    
    const setActiveTab = useAppStore((state) => state.setActiveTab)

    return (
        <div className='tabs'>
            <div className="links">
                {
                    Object.values(ACTIVE_TAB).map(tab => 
                        <Button 
                            key={tab}
                            className='tablinks'
                            value={tab}
                            onClick={() => setActiveTab(tab)}
                            label={capitalizeFirstLetter(tab)}
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