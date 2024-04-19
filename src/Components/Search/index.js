import React from 'react'
import {useState} from 'react'
//import {useDispatch} from 'react-redux'
import {default as Axios} from 'axios'

import './search.css'

import useAppStore from "../../Zustand/AppStore/store"
import useListerStore from '../../Zustand/ListerStore/store'
import data from "../../res/data.json"

var axios = Axios.create({
    baseURL: 'https://db.ygoprodeck.com/api/v7/',
})

const cardTypes = ['Monster', 'Spell Card', 'Trap Card']
const monsterTypes = ['Normal', 'Effect', 'Ritual', 'Fusion', 'Synchro', 'Link', 'XYZ']
const monsterAttributes = ['Earth', 'Wind', 'Fire', 'Water', 'Light', 'Dark', 'Divine']
const monsterRaces = ['Aqua', 'Beast', 'Beast-Warrior', 'Cyberse', 'Dinosaur', 'Divine-Beast', 'Dragon', 'Fairy', 'Fiend', 'Fish', 'Insect', 'Illusion', 'Machine', 'Plant', 'Psychic', 'Pyro', 'Reptile', 'Rock', 'Sea Serpent', 'Spellcaster', 'Thunder', 'Warrior', 'Winged Beast', 'Wyrm', 'Zombie']
const spellRaces = [ 'Normal', 'Field', 'Equip', 'Continuous', 'Quick-Play', 'Ritual']
const trapRaces = ['Normal', 'Continuous', 'Counter']

const Search =  () => {

    //const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [race, setRace] = useState('') //race is what usually is called type
    const [type, setType] = useState('')
    const [attribute, setAttribute] = useState('')
    const [level, setLevel] = useState('')
    const [cardType, setCardType] = useState('')

    const setLoadingState = useAppStore((state) => state.setLoadingState)

    const setNextPageToLoad = useListerStore((state) => state.setNextPageToLoad)
    const setHasMoreItemsToLoad = useListerStore((state) => state.setHasMoreItemsToLoad)
    const setListerItems = useListerStore((state) => state.setListerItems)
    
    const request = async () => {
        setLoadingState(true)
        try{
            //let response = await axios.get(queryBuilder())
            let response = data;
            console.log(response)
            if(response.data.meta.pages_remaining !== 0){
                setHasMoreItemsToLoad(true)
                setNextPageToLoad(response.data.meta.next_page)
            }
            else {
                setHasMoreItemsToLoad(false)
            }
            setListerItems(response.data.data)
            setLoadingState(false)
        }
        catch (err) {
            console.error(err)
            alert(`I-i'm sorry, something just gone wrong =(.\n Change the parameters and try again`)
            setLoadingState(false)
        }
    }
    

    const queryBuilder = () => {
        // setLevel(value.toLowerCase() === 'unset'?'':`&level=${value}`)
        return `cardinfo.php?num=30&offset=0`+name+race+type+level+attribute+desc
    }

    //(value < 0 || value > 14)?setLevel(level):setLevel(value)
    const levelSelector = (
        <select onChange={({target: {value}}) => setLevel(value.toLowerCase() === 'unset'?'':`&level=${value}`)}>
            <option defaultChecked={true}>Unset</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
        </select>
    )

    const cardTypeSelector = (
        <select onChange={({target: {value}}) => setCardType(value.toLowerCase() === 'unset'?'':`:&type=${value}`)}>
            <option>Unset</option>
            {cardTypes.map((cardType) => <option>{cardType}</option>)}
        </select>
    )

    const cardSubTypeSelector = ( (options) =>
        <select onChange={({target: {value}}) => setRace(value.toLowerCase() === 'unset'?'':`&race=${value}`)}>
            <option>Unset</option>
            {options.map((cardType) => <option>{cardType}</option>)}
        </select>
    )

    const monsterTypeSelector = cardSubTypeSelector(monsterRaces)
    const spellTypeSelector = cardSubTypeSelector(spellRaces)
    const trapTypeSelector = cardSubTypeSelector(trapRaces)

    /*
        <optgroup label="Main Deck Types">
        <option>Effect Monster</option>
        <option>Flip Effect Monster</option>
        <option>Flip Tuner Effect Monster</option>
        <option>Gemini Monster</option>
        <option>Normal Monster</option>
        <option>Normal Tuner Monster</option>
        <option>Pendulum Effect Monster</option>
        <option>Pendulum Flip Effect Monster</option>
        <option>Pendulum Normal Monster</option>
        <option>Pendulum Tuner Effect Monster</option>
        <option>Ritual Effect Monster</option>
        <option>Ritual Monster</option>
        <option>Skill Card</option>
        <option>Spell Card</option>
        <option>Spirit Monster</option>
        <option>Toon Monster</option>
        <option>Trap Card</option>
        <option>Tuner Monster</option>
        <option>Union Effect Monster</option>
        </optgroup>
        <optgroup label="Extra Deck Types">
            <option>Fusion Monster</option>
            <option>Link Monster</option>
            <option>Pendulum Effect Fusion Monster</option>
            <option>Synchro Monster</option>
            <option>Synchro Pendulum Effect Monster</option>
            <option>Synchro Tuner Monster</option>
            <option>XYZ Monster</option>
            <option>XYZ Pendulum Effect Monster</option>
        </optgroup>
    */
    const monsterCardTypeSelector = (
        <select onChange={({target: {value}}) => setType(value.toLowerCase() === 'unset'?'':`&type=${value}`)}>
            <option>Unset</option>
            <optgroup label="Main Deck Types">
                <option>Effect Monster</option>
                <option>Flip Effect Monster</option>
                <option>Flip Tuner Effect Monster</option>
                <option>Gemini Monster</option>
                <option>Normal Monster</option>
                <option>Normal Tuner Monster</option>
                <option>Pendulum Effect Monster</option>
                <option>Pendulum Flip Effect Monster</option>
                <option>Pendulum Normal Monster</option>
                <option>Pendulum Tuner Effect Monster</option>
                <option>Ritual Effect Monster</option>
                <option>Ritual Monster</option>
                <option>Skill Card</option>
                <option>Spell Card</option>
                <option>Spirit Monster</option>
                <option>Toon Monster</option>
                <option>Trap Card</option>
                <option>Tuner Monster</option>
                <option>Union Effect Monster</option>
            </optgroup>
            <optgroup label="Extra Deck Types">
                <option>Fusion Monster</option>
                <option>Link Monster</option>
                <option>Pendulum Effect Fusion Monster</option>
                <option>Synchro Monster</option>
                <option>Synchro Pendulum Effect Monster</option>
                <option>Synchro Tuner Monster</option>
                <option>XYZ Monster</option>
                <option>XYZ Pendulum Effect Monster</option>
            </optgroup>
        </select>
    )

    const attributeSelector = (
        <select onChange={({target: {value}}) => setAttribute(value.toLowerCase() === 'unset'?'':`&attribute=${value}`)}>
                <option>Unset</option>
                {monsterAttributes.map((cardAttribute) => <option>{cardAttribute}</option>)}
        </select>
    )


    return (
        <div className="search">
            <input type="text" placeholder="Type card name"
                onChange={({target: {value}}) => setName(`&fname=${value}`)}
            />
            <input type="text" placeholder="Type card description"
                onChange={({target: {value}}) => setDesc(`&description=${value}`)}
            />
            <table>
                <tbody>
                    <tr>
                        <td>Card Type</td>
                        <td>{cardTypeSelector}</td>
                    </tr>
                    {cardType === "monster"?
                        <React.Fragment>
                            <tr>
                                <td>Monster Card Type</td>
                                <td>{monsterTypeSelector}</td>
                            </tr>
                            <tr>
                                <td>Rank/Level</td>
                                <td>{levelSelector}</td>
                            </tr>
                            <tr>
                                <td>Attribute</td>
                                <td>{attributeSelector}</td>
                            </tr>
                        </React.Fragment>
                        :
                        ''
                    }
                    {cardType === "spell card"?
                        <tr>
                            <td>Spell Card Type</td>
                            <td>{spellTypeSelector}</td>
                        </tr>
                        :
                        ''
                    }
                    {cardType === "trap card"?
                        <tr>
                            <td>Trap Card Type</td>
                            <td>{trapTypeSelector}</td>
                        </tr>
                        :
                        ''
                    }
                </tbody>
            </table>
            
            {
                //<button className="search-button" onClick={() => setLoadingState(true)}>Search</button>
            }
            <button className="search-button" onClick={() => {request()}}>Search</button>
        </div>
    )
}

export default Search