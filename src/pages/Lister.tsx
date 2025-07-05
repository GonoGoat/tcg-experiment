import React, {useState} from 'react'
import shortid from 'shortid'
import {default as Axios} from 'axios'
import CircularProgress from '@mui/material/CircularProgress'

import 'assets/style/pages/Lister.css'
import { Root, cardInfo } from 'types/ygoOpenAPI.types'
import { incrementPageNumberFromURL } from 'utils/externalAPI'
import useAppStore from "context/AppStore/store"
import useListerStore from 'context/ListerStore/store'

import {Card, BlankCard} from 'components/Cards'

var axios = Axios.create({
    baseURL: 'https://yugioh-open-api.fauzancodes.com/v1'
})

const Lister = () => {
    const [isLoadingMoreItems, setLoadingMoreItems] = useState<boolean>(false)

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
            let response: Root = (await axios.get(nextPageToLoad)).data
            if(response.next){
                setHasMoreItemsToLoad(true)
                setNextPageToLoad(incrementPageNumberFromURL(nextPageToLoad))
            }
            else {
                setHasMoreItemsToLoad(false)
            }
            addListerItems(response.data)
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
                    isDraggable={true}
                    index={0}
                />
                {
                    lister.map((card: cardInfo, index: number) =>
                        <Card 
                            cardInfo={card}  
                            key={card.id} 
                            isDraggable={true}
                            index={index}
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