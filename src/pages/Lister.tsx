import {useState} from 'react'
import { nanoid } from "utils/modules/nanoid/nanoid"
import CircularProgress from '@mui/material/CircularProgress'

import 'assets/style/pages/Lister.css'
import { cardInfo, Root, genericCard } from 'types/ygoOpenAPI.types'
import { CARD_ZONES } from 'types/global.enum'
import { capitalizeFirstLetter } from 'utils/beautifiers'
import { blankCardPayload } from 'utils/global.const'
import { incrementPageNumberFromURL } from 'utils/modules/axios/ygoOpenAPI.axios'
import useAppStore from "context/AppStore/store"
import useListerStore from 'context/ListerStore/store'
import useDeckStore from 'context/DeckStore/store'
import { axios } from 'utils/modules/axios/ygoOpenAPI.axios'

import {Card, BlankCard} from 'components/Cards'
import {ActionMenu} from 'components'

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
            if(response.next) {
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

    // Blank card can be added to anywhere EXPECT the Card Bank
    const blankCardActions = Object.values(CARD_ZONES).filter( (value) => value !== CARD_ZONES.BANK).map( (value) => {
        return {
            label: capitalizeFirstLetter(value),
            onClick: () => addCard({...blankCardPayload, id: nanoid()}, value)
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
        },
        {
            label: "Card Bank",
            onClick: () => addCard(card, CARD_ZONES.BANK)
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