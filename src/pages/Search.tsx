import {useState} from 'react'
import {default as Axios} from 'axios'

import 'assets/style/pages/Search.css'
import sample from "data/data.json"

import useAppStore from "context/AppStore/store"
import useListerStore from 'context/ListerStore/store'
import { RadioInputType } from 'components/Forms/RadioInput'
import ToggleSwitch from 'components/Forms/ToggleSwitch'
import { Root } from 'types/ygopro.types'

var axios = Axios.create({
    baseURL: 'https://db.ygoprodeck.com/api/v7/',
})

const cardTypes = ['Monster', 'Spell Card', 'Trap Card']
const monsterTypes = ['Ritual', 'Fusion', 'Synchro', 'Link', 'XYZ', 'Toon', 'Spirit', 'Gemini', 'Union']
const monsterAttributes = ['Earth', 'Wind', 'Fire', 'Water', 'Light', 'Dark', 'Divine']
const monsterRaces = ['Aqua', 'Beast', 'Beast-Warrior', 'Cyberse', 'Dinosaur', 'Divine-Beast', 'Dragon', 'Fairy', 'Fiend', 'Fish', 'Insect', 'Illusion', 'Machine', 'Plant', 'Psychic', 'Pyro', 'Reptile', 'Rock', 'Sea Serpent', 'Spellcaster', 'Thunder', 'Warrior', 'Winged Beast', 'Wyrm', 'Zombie']
const spellRaces = [ 'Normal', 'Field', 'Equip', 'Continuous', 'Quick-Play', 'Ritual']
const trapRaces = ['Normal', 'Continuous', 'Counter']
/*
"Skill Card"
"Token"
*/
const monsterCardTypes = [
    "Effect Monster", "Flip Effect Monster", "Flip Tuner Effect Monster", "Gemini Monster", "Normal Monster", "Normal Tuner Monster", "Pendulum Effect Monster", "Pendulum Effect Ritual Monster", "Pendulum Flip Effect Monster", "Pendulum Normal Monster", "Pendulum Tuner Effect Monster", "Ritual Effect Monster", "Ritual Monster", "Spell Card", "Spirit Monster", "Toon Monster", "Trap Card", "Tuner Monster", "Union Effect Monster", "Fusion Monster", "Link Monster", "Pendulum Effect Fusion Monster", "Synchro Monster", "Synchro Pendulum Effect Monster", "Synchro Tuner Monster", "XYZ Monster", "XYZ Pendulum Effect Monster"
]

const Search =  () => {
    // Generic filters
    const [name, setName] = useState('')
    // const [desc, setDesc] = useState('')
    const [race, setRace] = useState('') // Monster type (aqua, ...) OR S/T Type

    // Monster-specific filters that don't need URL formatting
    const [attribute, setAttribute] = useState('')
    const [level, setLevel] = useState('')
    const [pendulumScale, setPendulumScale] = useState('')
    const [type, setType] = useState('')
    const [atk, setAtk] = useState('')
    const [def, setDef] = useState('')
    
    // Monster type-specific filter (Regex part)
    const [monsterType, setMonsterType] = useState('')
    const [hasEffect, setHasEffect] = useState('')
    const [isPendulum, setPendulum] = useState('')
    const [isTuner, setTuner] = useState('')

    const setLoadingState = useAppStore((state) => state.setLoadingState)
    //const activeTab = useAppStore((state) => state.activeTab)

    const setNextPageToLoad = useListerStore((state) => state.setNextPageToLoad)
    const setHasMoreItemsToLoad = useListerStore((state) => state.setHasMoreItemsToLoad)
    const setListerItems = useListerStore((state) => state.setListerItems)
    
    const request = async () => {
        setLoadingState(true)
        try{
            //let response = await axios.get(queryBuilder())
            console.log(queryBuilder())
            let response: Root = sample;
            console.log(response)
            if(response.meta.pages_remaining !== 0){
                setHasMoreItemsToLoad(true)
                setNextPageToLoad(response.meta.next_page)
            }
            else {
                setHasMoreItemsToLoad(false)
            }
            setListerItems(response.data)
            setLoadingState(false)
        }
        catch (err) {
            console.error(err)
            alert(`I-i'm sorry, something just gone wrong =(.\n Change the parameters and try again`)
            setLoadingState(false)
        }
    }

    const handleNumericChange = (value: string, maximum: number, setter: (val: string) => void, prefix: string) => {
            if (value === "") {
                setter("")
            }
            else if (!isNaN(Number(value))) {
                if (parseInt(value) <= maximum) setter(`&${prefix}=${value}`)
            }
        }
    
        const queryBuilder = () => {        
            var reg = new RegExp(`^${monsterType}${hasEffect}${isPendulum}${isTuner}`)
            var types = monsterCardTypes.filter((type) => reg.test(type.toLowerCase()))
    
            // TODO : Alert si pas de filtre pour tous ceux choisi
    
            return `cardinfo.php?num=30&offset=0`+name+race+atk+def+(types.length > 0 ?`&type=${types.join(',').toLowerCase()}`:type)+level+attribute
            //+desc
        }
    
        //*************GENERIC SELECTORS******************
    
        // Overall type of card : Monster spell or trap
        /*const typeSelector = (
            <div className='row'>
                <div className='col-25'>
                    <label htmlFor="type">Card Type</label>
                </div>
                <div className='col-75'>
                    <select name='type' onChange={({target: {value}}) => setType(value.toLowerCase() === 'unset'?'':`&type=${value.toLowerCase()}`)}>
                        <option key="0">Unset</option>
                        {cardTypes.map((cardType, index) => <option key={index+1}>{cardType}</option>)}
                    </select>
                </div>  
            </div>
        )
    
        // Generic Race selector (sub type : monster type (aqua, machine, ...) or spell/trap type (normal, continuous))
        const cardSubTypeSelector = ( (options: string[], label: string) =>
            <div  className='row'>
                <div className='col-25'>
                    <label htmlFor="card-subtype">{label}</label>
                </div>
                <div className='col-75'>
                    <select name='card-subtype' onChange={({target: {value}}) => setRace(value.toLowerCase() === 'unset'?'':`&race=${value}`)}>
                        <option key="0">Unset</option>
                        {options.map((cardType, index) => <option key={index+1}>{cardType}</option>)}
                    </select>
                </div>  
            </div>
        )
    
        // Race for each type of card
        const monsterTypeSelector = cardSubTypeSelector(monsterRaces, "Monster Type")
        const spellTypeSelector = cardSubTypeSelector(spellRaces, "Spell Type")
        const trapTypeSelector = cardSubTypeSelector(trapRaces, "Trap Type")*/
    
        //*************MONSTER SPECIFIC SELECTORS******************
        // TODO use enum
        const effectSelector = <ToggleSwitch className='row' label='Monster effect' name='state-e' radioInputs={
            [
                {
                    id: "normal",
                    name: "state-e",
                    displayName: "Normal",
                    checked: Boolean(hasEffect === "(?=.*normal)"),
                    onClick: () => setHasEffect("(?=.*normal)")
                },
                {
                    id: "na-effect",
                    name: "state-e",
                    displayName: "N/A",
                    checked: Boolean(hasEffect === ""),
                    onClick: () => setHasEffect("")
                },
                {
                    id: "effect",
                    name: "state-e",
                    displayName: "Effect",
                    checked: Boolean(hasEffect === "(?=.*effect)"),
                    onClick: () => setHasEffect("(?=.*effect)")
                }
            ]
        }/>
        /*
        (
            // <div class="switch-toggle switch-3 switch-candy">
            <div className='row'>
                <div className='col-25'>
                    <label htmlFor='state-e'>Monster effect</label>
                </div>
                <div className="switch-toggle col-75">
                    <RadioInput id="normal" name="state-e" checked={Boolean(hasEffect === "(?=.*normal)")} displayName='Normal' onClick={() => setHasEffect("(?=.*normal)")}/>
                    <RadioInput id="na-effect" name="state-e" checked={Boolean(hasEffect === "")} displayName='N/A' onClick={() => setHasEffect("")}/>
                    <RadioInput id="effect" name="state-e" checked={Boolean(hasEffect === "(?=.*effect)")} displayName='Effect' onClick={() => setHasEffect("(?=.*effect)")}/>
                </div>
            </div>*/


        /*const levelSelector = (
            <div className='row'>
                <div className='col-25'>
                    <label htmlFor="monster-level">Level/ Rank</label>
                </div>
                <div className='col-75'>
                    {<input className='number-input' name="monster-level" type="text" inputMode='decimal' value={/\d+/.test(level)?level.match(/\d+/)[0]:""} onChange={({target: {value}}) => handleNumericChange(value,13,setLevel,"level")}/>
                    }
                </div>
            </div>
        )*/
    
        /*const symbolMap = new Map()
        symbolMap.set("=", '=')
        symbolMap.set("=lt", "<")
        symbolMap.set("=gt",">")
    
        const getSymbol = (state: string) => {
            let sub;
            if (!state) sub = "=";
            else sub = state.match(/=[a-z]{0,2}/)[0];
            return symbolMap.get(sub);
        }
    
        const changeSymbol = (state: string, setter: (val: string) => void) =>  {
            if (state) {
                let sub = state.match(/=[a-z]{0,2}/)[0]; // Extract the "=..."
                let nextIndex = (symbolMap.keys().toArray().indexOf(sub) + 1) % symbolMap.size; // Get the index in symbolMap
                setter(`${state.match(/&[a-z]+/)[0]}${symbolMap.keys().toArray()[nextIndex]}${state.match(/\d+/)[0]}`); // Change the stat depending on new symbol
            }
        }
    
        const atkSelector = (
            <div className='row'>
                <div className='col-25'>
                    <label htmlFor="atk">Atk</label>
                </div>
                <div className='col-75'>
                    <button className="atk-filter" disabled={!Boolean(atk)} onClick={() => changeSymbol(atk,setAtk)}>{getSymbol(atk)}</button>
                    <input className='number-input' name="atk" type="text" inputMode='decimal' value={/\d+/.test(atk)?atk.match(/\d+/)[0]:""} onChange={({target: {value}}) => handleNumericChange(value,9999,setAtk,"atk")}/>
                </div>
            </div>
        )
    
        const defSelector = (
            <div className='row'>
                <div className='col-25'>
                    <label htmlFor="def">Def</label>
                </div>
                <div className='col-75'>
                    <button className="def-filter" disabled={!Boolean(def)} onClick={() => changeSymbol(def,setDef)}>{getSymbol(def)}</button>
                    <input className='number-input' name="def" type="text" inputMode='decimal' value={/\d+/.test(def)?def.match(/\d+/)[0]:""} onChange={({target: {value}}) => handleNumericChange(value,9999,setDef,"def")}/>
                </div>
            </div>
        )
    
        // Type of monster card : Ritual, Fusion, ...
        const monsterCardTypeSelector = (
            <div className='row'>
                <div className='col-25'>
                    <label htmlFor="monster-card-type">Type of Monster Card</label>
                </div>
                <div className='col-75'>
                    <select name="monster-card-type" onChange={({target: {value}}) => setMonsterType(value.toLowerCase() === 'unset'?'':`(/^(?!.*${value.toLowerCase()})/)`)}>
                        <option key='0'>Unset</option>
                        {monsterTypes.map((cardType, index) => <option key={index+1}>{cardType}</option>)}
                    </select>
                </div>
            </div>
        )
    
        const attributeSelector = (
            <div className='row'>
                <div className='col-25'>
                    <label htmlFor="monster-attribute">Attribute</label>
                </div>
                <div className='col-75'>
                    <select name='monster-attribute' onChange={({target: {value}}) => setAttribute(value.toLowerCase() === 'unset'?'':`&attribute=${value}`)}>
                        <option key="0">Unset</option>
                        {monsterAttributes.map((cardAttribute, index) => <option key={index+1}>{cardAttribute}</option>)}
                    </select>
                </div>
            </div>
        )

    
        const isPendulumSelector = (
            // <div class="switch-toggle switch-3 switch-candy">
            <div className='row'>
                <div className='col-25'>
                    <label htmlFor='state-p'>Pendulum</label>
                </div>
                <div className="switch-toggle col-75">
    
                    <input id="non-pendulum" name="state-p" type="radio" readOnly checked={Boolean(isPendulum === "(?!.*pendulum)")} />
                    <label htmlFor="non-pendulum" onClick={() => setPendulum("(?!.*pendulum)")}>No</label>
                
                    <input id="na-pendulum" name="state-p" type="radio" readOnly checked={Boolean(isPendulum === "")}/>
                    <label htmlFor="na-pendulum" onClick={() => setPendulum("")}>N/A</label>
                
                    <input id="pendulum" name="state-p" type="radio" readOnly checked={Boolean(isPendulum === "(?=.*pendulum)")}/>
                    <label htmlFor="pendulum" onClick={() => setPendulum("(?=.*pendulum)")}>Yes</label>
                </div>
            </div>
        )
    
        const isTunerSelector = (
            <div className='row'>
                <div className='col-25'>
                    <label htmlFor='state-t'>Tuner</label>
                </div>
                <div className="switch-toggle col-75">
    
                    <input id="non-tuner" name="state-t" type="radio" readOnly checked={Boolean(isTuner === "(?!.*tuner)")} />
                    <label htmlFor="non-tuner" onClick={() => setTuner("(?!.*tuner)")}>No</label>
                
                    <input id="na-tuner" name="state-t" type="radio" readOnly checked={Boolean(isTuner === "")} />
                    <label htmlFor="na-tuner" onClick={() => setTuner("")}>N/A</label>
                
                    <input id="tuner" name="state-t" type="radio" readOnly checked={Boolean(isTuner === "(?=.*tuner)")}/>
                    <label htmlFor="tuner" onClick={() => setTuner("(?=.*tuner)")}>Yes</label>
                </div>
            </div>
        )
    
        const pendulumSelector = (
            <div className='row'>
                <div className='col-25'>
                    <label htmlFor="pendulum-scale">Pendulum Scale</label>
                </div>
                <div className='col-75'> 
                    <input className='number-input' name="pendulum-scale" type="text" inputMode='decimal' value={/\d+/.test(pendulumScale)?pendulumScale.match(/\d+/)[0]:""} onChange={({target: {value}}) => handleNumericChange(value,13,setPendulumScale,"scale")}/>
                </div>
            </div>
        )*/
    
        return (
            //<div className={getClassName(activeTab,className)}>
            <div className='search'>
                <div>
                    <h3>Search</h3>
                </div>
                <div className='row'>
                    <input className='full-text-input' name='card-name' type="text" placeholder="Type card name"
                        onChange={({target: {value}}) => setName(`&fname=${value}`)}
                    />
                    {/*
                    <input type="text" placeholder="Type card description"
                        onChange={({target: {value}}) => setDesc(`&description=${value}`)}
                    />
                    */}
                </div>
                {//typeSelector}
}
                {/*type.includes("monster")?
                    <>
                        {monsterCardTypeSelector}
                        {monsterTypeSelector}
                        {levelSelector}
                        {atkSelector}
                        {defSelector}
                        {attributeSelector}
                        {effectSelector}
                        {isTunerSelector}
                        {isPendulumSelector}
                        {isPendulum === "(?=.*pendulum)" ?
                            pendulumSelector
                            :
                            <></>
                        }
                    </>
                    :
                    <></>
                */effectSelector}
                {/*type.includes("spell")?
                    <>
                        {spellTypeSelector}
                    </>
                    :
                    <></>*/
                }
                {/*type.includes("trap")?
                    <>
                        {trapTypeSelector}
                    </>
                    :
                    <></>*/
                }
                {
                    //<button className="search-button" onClick={() => setLoadingState(true)}>Search</button>
                }
                <button className="search-button" onClick={() => {request()}}>Search</button>
            </div>
        )
    }
    
    export default Search