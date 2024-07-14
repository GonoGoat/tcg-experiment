import React from 'react'
import {useState} from 'react'

import './statistics.css'
import { getClassName } from '../../res/utils'

import useAppStore from "../../Zustand/AppStore/store"

const className = "statistics";

const typeOfCard = ["Engine", "Non-Engine", "Starter", "Extender"]

const Statistics =  () => {
    const setLoadingState = useAppStore((state) => state.setLoadingState)
    const activeTab = useAppStore((state) => state.activeTab)

    return (
        <div className={getClassName(activeTab,className)}>
            <div>
                <h3>Statistics</h3>
            </div>
        </div>
    )
}

export default Statistics