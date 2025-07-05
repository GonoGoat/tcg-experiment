export interface blankCardInfo {
    type: "blank"
}

export type genericCard = cardInfo | blankCardInfo

/*export interface Root {
  data: cardInfo[]
  meta: Meta
}

export interface cardInfo {
  id: number
  name: string
  type: string
  frameType: string
  desc: string
  race: string
  archetype: string
  ygoprodeck_url: string
  card_sets: CardSet[]
  card_images: CardImage[]
  card_prices: CardPrice[]
  atk?: number
  def?: number
  level?: number
  attribute?: string
}

export interface CardSet {
  set_name: string
  set_code: string
  set_rarity: string
  set_rarity_code: string
  set_price: string
}

export interface CardImage {
  id: number
  image_url: string
  image_url_small: string
  image_url_cropped: string
}

export interface CardPrice {
  cardmarket_price: string
  tcgplayer_price: string
  ebay_price: string
  amazon_price: string
  coolstuffinc_price: string
}

export interface Meta {
    current_rows: number,
    total_rows: number,
    rows_remaining: number,
    total_pages: number,
    pages_remaining: number,
    next_page?: string,
    next_page_offset?: number
}*/


export interface Root {
  total: number
  total_filtered: number
  error: string
  status: number
  message: string
  data: cardInfo[]
  search: string
  next: boolean
  back: boolean
  limit: number
  offset: number
  total_page: number
  current_page: number
  order: string
}

export interface cardInfo {
  id: number
  created_at: string
  updated_at: string
  name: string
  type: string
  description: string
  race: string
  archetype: string
  attack: number
  defense: number
  level: number
  attribute: string
  card_sets: string
  image_url: string
  rarity: string
  rarity_code: string
}