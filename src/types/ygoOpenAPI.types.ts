export interface blankCardTypePayload {
  type: "blank"
}

export interface blankCardInfo extends blankCardTypePayload {
  id: string
}

export interface genericCardWithCount {
  card: genericCard
  count: number
  addedDate: Date
}

export type genericCard = cardInfo | blankCardInfo

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