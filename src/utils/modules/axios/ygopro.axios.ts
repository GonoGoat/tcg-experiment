import {default as Axios} from 'axios'

export var axios = Axios.create({
    baseURL: 'https://db.ygoprodeck.com/api/v7'
})

export function getURL(queryPrams: string) {
    return `/cardinfo.php?offset=0&num=30${queryPrams}`
}