import {default as Axios} from 'axios'
import { REGEX } from "types/regex.enum"

import { getSingleRegexMatchString } from '../../regex'

export var axios = Axios.create({
    baseURL: 'https://yugioh-open-api.fauzancodes.com/v1'
})

export function getURL(queryPrams: string, pageNumber: number) {
    return `/card?page=${pageNumber}${queryPrams}`
}

export function incrementPageNumberFromURL (url: string) {
    let pageNumber = getSingleRegexMatchString(REGEX.NUMBER, url)
    return url.replace(pageNumber, (parseInt(pageNumber) + 1).toString())
}