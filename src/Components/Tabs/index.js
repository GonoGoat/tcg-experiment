import React from 'react'

import './tabs.css'
import Search from '../Search'
import Statistics from '../Statistics'
import CardBank from '../CardBank'

import useAppStore from "../../Zustand/AppStore/store"

// TODO : Ajout de carte sur click de la Div (propriété Zustand de zone clickable)
const Tabs = () => {        
    
    const setActiveTab = useAppStore((state) => state.setActiveTab)

    return (
        <div className='tabs'>
            <div className="links">
                <button className='tablinks' value="search" onClick={({target: {value}}) => setActiveTab(value)}>Search</button>
                <button className='tablinks' value="statistics" onClick={({target: {value}}) => setActiveTab(value)}>Statistics</button>
                <button className='tablinks' value="card-bank" onClick={({target: {value}}) => setActiveTab(value)}>Card Bank</button>
            </div>
            
            <Search/>
            <Statistics/>
            <CardBank/>
        </div>
    )
}

export default Tabs

