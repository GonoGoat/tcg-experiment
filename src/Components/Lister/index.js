import React, {useState} from 'react'
import shortid from 'shortid'
import {default as Axios} from 'axios'

import Card from '../Card'
import BlankCard from '../BlankCard'

import './lister.css'
import CircularProgress from '@mui/material/CircularProgress'

import useAppStore from "../../Zustand/AppStore/store"
import useListerStore from '../../Zustand/ListerStore/store'

var axios = Axios.create({
    baseURL: 'https://db.ygoprodeck.com/api/v7/',
})

const Lister = () => {
    const [isLoadingMoreItems, setLoadingMoreItems] = useState(false)

    const isLoading = useAppStore(state => state.isLoading)
    const setLoadingState = useAppStore(state => state.setLoadingState)

    const lister = useListerStore((state) => state.lister)
    const hasMoreItemsToLoad = useListerStore((state) => state.hasMoreItemsToLoad)
    const nextPageToLoad = useListerStore((state) => state.nextPageToLoad)
    const setNextPageToLoad = useListerStore((state) => state.setNextPageToLoad)
    const setHasMoreItemsToLoad = useListerStore((state) => state.setHasMoreItemsToLoad)
    const addListerItems = useListerStore((state) => state.addListerItems)
   
    async function loadMoreItems(){
        setHasMoreItemsToLoad(false)
        setLoadingMoreItems(true)
        try{
            let response = await axios.get(nextPageToLoad)
            console.log(response)
            if(response.data.meta.pages_remaining !== 0){
                setHasMoreItemsToLoad(true)
                setNextPageToLoad(true)
            }
            else {
                setHasMoreItemsToLoad(false)
            }
            addListerItems(response.data.data)
        } 
        catch (err) {
            alert(err)
            setLoadingState(false)
        }
        setLoadingMoreItems(false)
    }

    if(isLoading){
       return (
        <div className="lister" style={{justifyContent: 'center', alignItems: 'center'}}>
            <CircularProgress color="secondary"/>
        </div>
       )
    } 
    else {
        return (
            <div className="lister">
                <BlankCard 
                    index={shortid.generate()}  
                    isDraggable={true}
                />
                {
                    lister.map(card=>
                        <Card 
                            cardInfo={card} 
                            index={shortid.generate()} 
                            key={card.id} 
                            isDraggable={true}
                        />
                    )
                }
                <div style={{display: 'flex', flexDirection: 'column', width: '100%', margin: 0, justifyContent: 'center', alignItems: 'center'}}>
                    {isLoadingMoreItems?
                        <CircularProgress color="secondary"/>
                        :
                        <></>
                    }
                    {hasMoreItemsToLoad?
                        <button onClick={()=>loadMoreItems()}>Load more cards</button>
                        :
                        <></>
                    }
                </div>
           </div>
       )
    }
   
    
}

export default Lister