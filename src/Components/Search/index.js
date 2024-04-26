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
const monsterTypes = ['Ritual', 'Fusion', 'Synchro', 'Link', 'XYZ']
const monsterAttributes = ['Earth', 'Wind', 'Fire', 'Water', 'Light', 'Dark', 'Divine']
const monsterRaces = ['Aqua', 'Beast', 'Beast-Warrior', 'Cyberse', 'Dinosaur', 'Divine-Beast', 'Dragon', 'Fairy', 'Fiend', 'Fish', 'Insect', 'Illusion', 'Machine', 'Plant', 'Psychic', 'Pyro', 'Reptile', 'Rock', 'Sea Serpent', 'Spellcaster', 'Thunder', 'Warrior', 'Winged Beast', 'Wyrm', 'Zombie']
const spellRaces = [ 'Normal', 'Field', 'Equip', 'Continuous', 'Quick-Play', 'Ritual']
const trapRaces = ['Normal', 'Continuous', 'Counter']

const Search =  () => {

    //const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [race, setRace] = useState('') //race is what usually is called type

    const [attribute, setAttribute] = useState('')
    const [level, setLevel] = useState('')
    
    const [type, setType] = useState('')
    const [monsterType, setMonsterType] = useState('')
    const [hasEffect, setHasEffect] = useState('')
    const [isPendulum, setPendulum] = useState(false)
    const [isTuner, setTuner] = useState(false)
    const [pendulumScale, setPendulumScale] = useState('')

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

    const handleLevelChange = (value) => {
        if (value === "") {
            setLevel ("")
        }
        else if (!isNaN(value)) {
            if (parseInt(value) > 13) setLevel("&level=13")
            else setLevel(`&level=${value}`)
        }
        else {
            setLevel(level)
        }  
    }

    const handlePendulumScaleChange = (value) => {
        if (value === "") {
            setPendulumScale ("")
        }
        else if (!isNaN(value)) {
            if (parseInt(value) > 13) setLevel("&scale=13")
            else setPendulumScale(`&scale=${value}`)
        }
        else {
            setPendulumScale(level)
        }  
    }

    

    const queryBuilder = () => {
        // setLevel(value.toLowerCase() === 'unset'?'':`&level=${value}`)
        /*let parameters = [];
        if (name) parameters.push(`&fname=${name}`);
        if (desc) parameters.push(`&desc=${desc}`);
        if (cardType !== "unset") {
            if (type !== "unset") parameters.push(`&type=${type}`); // TODO
            if (race !== "unset") parameters.push(`&race=${race}`);
            if (cardType === "monster") {
                if (attribute !== "unset") parameters.push(`&attribute=${attribute}`)
                if (level) parameters.push(`&level=${level}`)
            }
        }*/
        // Passe dans tous les filtres pour créer liste de params
        // Filtrage en boucle de tous les types possibles de l'api
        // Si 1 on prend et on sauve dans type au format URL
        // Si 0 : alert
        
        
        
        //cardType, setCardType] = useState('')
        return `cardinfo.php?num=30&offset=0`+name+race+type+level+attribute+desc
        
    }

    //*************GENERIC SELECTORS******************

    // Overall type of card : Monster spell or tra
    const typeSelector = (
        <div>
            <div>
                <label htmlFor="type">Card Type</label>
            </div>
            <div>
                <select name='type' onChange={({target: {value}}) => setType(value.toLowerCase() === 'unset'?'':`&type=${value.toLowerCase()}`)}>
                    <option key="0">Unset</option>
                    {cardTypes.map((cardType, index) => <option key={index+1}>{cardType}</option>)}
                </select>
            </div>  
        </div>
    )

    // Generic Race selector (sub type : monster type (aqua, machine, ...) or spell/trap type (normal, continuous))
    const cardSubTypeSelector = ( (options, label) =>
        <div>
            <div>
                <label htmlFor="cardSubType">{label}</label>
            </div>
            <div>
                <select name='cardSubType' onChange={({target: {value}}) => setRace(value.toLowerCase() === 'unset'?'':`&race=${value}`)}>
                    <option key="0">Unset</option>
                    {options.map((cardType, index) => <option key={index+1}>{cardType}</option>)}
                </select>
            </div>  
        </div>
    )

    // Race for each type of card
    const monsterTypeSelector = cardSubTypeSelector(monsterRaces, "Monster Type")
    const spellTypeSelector = cardSubTypeSelector(spellRaces, "Spell Type")
    const trapTypeSelector = cardSubTypeSelector(trapRaces, "Trap Type")

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

    //*************MONSTER SPECIFIC SELECTORS******************
    const levelSelector = (
        <div>
            <div>
                <label htmlFor="monsterLevel">Level/Rank</label>
            </div>
            <div>
                <input name="monsterLevel" type="text" placeholder='Type a number from 0 to 13' inputMode='decimal' value={level.substring(7)} onChange={({target: {value}}) => handleLevelChange(value)}/>
            </div>
        </div>
    )

    const monsterCardTypeSelector = (
        <div>
            <div>
                <label htmlFor="monsterCardType">Type of Monster Card</label>
            </div>
            <div>
                <select name="monsterCardType" onChange={({target: {value}}) => setType(value.toLowerCase() === 'unset'?'':value.toLowerCase())}>
                    <option key='0'>Unset</option>
                    {monsterTypes.map((cardType, index) => <option key={index+1}>{cardType}</option>)}
                </select>
            </div>
        </div>
    )

    const attributeSelector = (
        <div>
            <div>
                <label htmlFor="monsterAttribute">Attribute</label>
            </div>
            <div>
                <select name='monsterAttribute' onChange={({target: {value}}) => setAttribute(value.toLowerCase() === 'unset'?'':`&attribute=${value}`)}>
                    <option key="0">Unset</option>
                    {monsterAttributes.map((cardAttribute, index) => <option key={index+1}>{cardAttribute}</option>)}
                </select>
            </div>
        </div>
    )

    const effectSelector = (
        // <div class="switch-toggle switch-3 switch-candy">
        <div>
            <div>
                <label htmlFor='state-d'>Monster effect ?</label>
            </div>
            <div className="switch-toggle">

                <input id="normal" name="state-d" type="radio" readOnly checked={hasEffect === 0 ?"checked":""} />
                <label htmlFor="normal" onClick={() => setHasEffect(0)}>Normal</label>
            
                <input id="na" name="state-d" type="radio" readOnly checked={hasEffect === ""?"checked":""} />
                <label htmlFor="na" onClick={() => setHasEffect("")}>N/A</label>
            
                <input id="effect" name="state-d" type="radio" readOnly checked={hasEffect === 1 ?"checked":""}/>
                <label htmlFor="effect" onClick={() => setHasEffect(1)}>Effect</label>
            </div>
        </div>
    )

    const isPendulumCheckbox = (
        <div className="checkbox-wrapper">
            <label>
                <input type="checkbox" checked={isPendulum} onChange={() => setPendulum(!isPendulum)}/>
                <span>Pendulum</span>
            </label>
        </div>
    )

    const isTunerCheckbox = (
        <div className="checkbox-wrapper">
            <label>
                <input type="checkbox" checked={isTuner} onChange={() => setTuner(!isPendulum)}/>
                <span>Tuner</span>
            </label>
        </div>
    )

    const pendulumSelector = (
        <div>
            <div>
                <label htmlFor="pendulumScale">Pendulum Scale</label>
            </div>
            <div>
                <input name="pendulumScale" type="text" placeholder='Type a number from 0 to 13' inputMode='decimal' value={pendulumScale.substring(7)} onChange={({target: {value}}) => handlePendulumScaleChange(value)}/>
            </div>
        </div>
    )


    return (
        <div className="search">
            <div>
                <input name='cardName' type="text" placeholder="Type card name"
                    onChange={({target: {value}}) => setName(`&fname=${value}`)}
                />
                <input type="text" placeholder="Type card description"
                    onChange={({target: {value}}) => setDesc(`&description=${value}`)}
                />
            </div>
            {typeSelector}
            {type.includes("monster")?
                <React.Fragment>
                    {monsterCardTypeSelector}
                    {monsterTypeSelector}
                    {levelSelector}
                    {attributeSelector}
                    {effectSelector}
                    {isPendulumCheckbox}
                    {isTunerCheckbox}
                    {isPendulum?
                        pendulumSelector
                        :
                        <React.Fragment/>
                    }
                </React.Fragment>
                :
                <React.Fragment/>
            }
            {type.includes("spell")?
                <React.Fragment>
                    {spellTypeSelector}
                </React.Fragment>
                :
                <React.Fragment/>
            }
            {type.includes("trap")?
                <React.Fragment>
                    {trapTypeSelector}
                </React.Fragment>
                :
                <React.Fragment/>
            }
            {
                //<button className="search-button" onClick={() => setLoadingState(true)}>Search</button>
            }
            <button className="search-button" onClick={() => {request()}}>Search</button>
        </div>
    )
}

export default Search