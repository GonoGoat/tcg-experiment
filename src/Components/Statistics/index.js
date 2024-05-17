import React from 'react'
import {useState} from 'react'

import './statistics.css'

import useAppStore from "../../Zustand/AppStore/store"

const Statistics =  () => {
    const setLoadingState = useAppStore((state) => state.setLoadingState)
    const isActiveTab = useAppStore((state) => state.isActiveTab)
    // TODO : Zustand + Display
    return (
        <div className="statistics tabcontent">
            <div>
                <h3>Statistics</h3>
            </div>
        </div>
    )
}

export default Statistics