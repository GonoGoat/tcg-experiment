import React, {useState} from 'react'
import shortid from 'shortid'
import {default as Axios} from 'axios'
import CircularProgress from '@mui/material/CircularProgress'

import 'assets/style/pages/Lister.css'
import { cardInfo, Root, blankCardInfo } from 'types/ygopro.types'
import { CARD_ZONES } from 'types/global.enum'
import useAppStore from "context/AppStore/store"
import useListerStore from 'context/ListerStore/store'
import useDeckStore from 'context/DeckStore/store'

import {Card, BlankCard, ActionMenu} from 'components'

var axios = Axios.create({
    baseURL: 'https://db.ygoprodeck.com/api/v7/',
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

    const addCard = useDeckStore(state => state.addCard)

    const blankCardPayload: blankCardInfo = {type: "blank"}
   
    async function loadMoreItems(){
        setHasMoreItemsToLoad(false)
        setLoadingMoreItems(true)
        try{
            let response: Root = (await axios.get(nextPageToLoad)).data
            console.log(response)
            if(response.meta.pages_remaining !== 0){
                setHasMoreItemsToLoad(true)
                setNextPageToLoad(response.meta.next_page || '')
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

    const blankCardActions = [
        {
            label: "Main",
            onClick: () => addCard(blankCardPayload, CARD_ZONES.MAIN)
        },
        {
            label: "Extra",
            onClick: () => addCard(blankCardPayload, CARD_ZONES.EXTRA)
        }
    ]

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
                >
                    <ActionMenu
                        actions={blankCardActions}
                    />
                </BlankCard>
                {
                    lister.map((card: cardInfo, index: number) =>
                        <Card 
                            cardInfo={card}  
                            key={card.id} 
                            isDraggable={true}
                            index={index+1}
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