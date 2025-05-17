type objectOfString = Record<string,string>

export interface cardList {
    data: {
        data: cardInfo[]
    } 
}

export interface blankCardInfo {
    type: "blank"
}

export interface cardInfo {
    id: number,
    name: string,
    type: string,
    frameType: string,
    desc: string,
    race: string,
    archetype: string,
    ygoprodeck_url: string,
    card_sets: objectOfString[],
    card_images: objectOfString[],
    card_prices: objectOfString[],
    atk?: number,
    def?: number,
    level?: number,
    attribute?: string
}

export type genericCard = cardInfo | blankCardInfo