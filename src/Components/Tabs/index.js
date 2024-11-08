import React, { useState } from 'react'

import './tabs.css'
import Search from '../Search'

const Tabs = () => { 
    
    const [isSearch, setSearch] = useState(true)

    return (
        <div className='tabs'>
            <div className="links">
                <button className='tablinks' value={global.config.activeTabs.SEARCH} onClick={() => setSearch(true)}>Search</button>
                <button className='tablinks' value={global.config.activeTabs.STATS} onClick={() => setSearch(false)}>Statistics</button>
                <button className='tablinks' value={global.config.activeTabs.CARD_BANK} onClick={() => setSearch(false)}>Card Bank</button>
            </div>
            {isSearch ? <Search/> : <div>Coming soon...</div>}
        </div>
    )
}

export default Tabs

