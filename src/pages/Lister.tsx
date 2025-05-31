import React, {useState} from 'react'
import shortid from 'shortid'
import {default as Axios} from 'axios'
import CircularProgress from '@mui/material/CircularProgress'

import 'assets/style/pages/Lister.css'
import { cardInfo, Root, genericCard } from 'types/ygopro.types'
import { CARD_ZONES } from 'types/global.enum'
import { capitalizeFirstLetter } from 'utils/beautifiers'
import { blankCardPayload } from 'utils/global.const'
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
    const dispatchCard = useDeckStore(state => state.dispatchCard)
   
    async function loadMoreItems(){
        setHasMoreItemsToLoad(false)
        setLoadingMoreItems(true)
        try{
            let response: Root = (await axios.get(nextPageToLoad)).data
            console.log(response)
            if(response.meta.pages_remaining !== 0){
                setHasMoreItemsToLoad(true)
                setNextPageToLoad(response.meta.next_page || '') // TODO to change, is boolean operator and not default value
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

    const blankCardActions = Object.keys(CARD_ZONES).map( (key) => {
        return {
            label: capitalizeFirstLetter(CARD_ZONES[key as keyof typeof CARD_ZONES]),
            onClick: () => addCard({...blankCardPayload, id: shortid.generate()}, CARD_ZONES[key as keyof typeof CARD_ZONES])
        }
    })

    const cardActions = (card: genericCard) => 
    [
        {
            label: "Main/Extra",
            onClick: () => dispatchCard(card)
        },
        {
            label: "Side",
            onClick: () => addCard(card, CARD_ZONES.SIDE)
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
                <BlankCard  index={0}>
                    <ActionMenu actions={blankCardActions}/>
                </BlankCard>
                {
                    lister.map( (card: cardInfo, index: number) =>
                        <Card 
                            cardInfo={card}  
                            key={card.id} 
                            index={index+1}
                        >
                            <ActionMenu actions={cardActions(card)}/>
                        </Card>
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