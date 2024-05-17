import React from 'react'

import './tabs.css'
import Search from '../Search'
import Statistics from '../Statistics'

const Tabs = () => {          
    return (
        <div className='tabs'>
            <div class="links">
                <button class="tablinks" onclick="openCity(event, 'London')">Search</button>
                <button class="tablinks" onclick="openCity(event, 'Paris')">Statistics</button>
                {//<button class="tablinks" onclick="openCity(event, 'Tokyo')">Tokyo</button>
                }
            </div>
            
            <div className='test'>
            <Search/>
            <Statistics/>
            </div>
            
            {/*<div id="London" class="tabcontent">
            <h3>London</h3>
            <p>London is the capital city of England.</p>
            </div>
            
            <div id="Paris" class="tabcontent">
            <h3>Paris</h3>
            <p>Paris is the capital of France.</p>
            </div>
            
            <div id="Tokyo" class="tabcontent">
            <h3>Tokyo</h3>
            <p>Tokyo is the capital of Japan.</p>
            </div>*/}
        </div>
    )
}

export default Tabs

