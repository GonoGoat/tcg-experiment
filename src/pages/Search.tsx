import {useState} from 'react'
import {default as Axios} from 'axios'

import 'assets/style/pages/Search.css'
import sample from "data/data.json"

import useAppStore from "context/AppStore/store"
import useListerStore from 'context/ListerStore/store'
import {ToggleSwitch, Select, NumberInput, NumberInputWithButton} from 'components/Forms'
import { Root } from 'types/ygopro.types'

var axios = Axios.create({
    baseURL: 'https://db.ygoprodeck.com/api/v7/',
    // https://yugioh-open-api.vercel.app/
})

const cardTypes = ['Monster', 'Spell Card', 'Trap Card']
const monsterTypes = ['Ritual', 'Fusion', 'Synchro', 'Link', 'XYZ', 'Toon', 'Spirit', 'Gemini', 'Union']
const monsterAttributes = ['Earth', 'Wind', 'Fire', 'Water', 'Light', 'Dark', 'Divine']
const monsterRaces = ['Aqua', 'Beast', 'Beast-Warrior', 'Cyberse', 'Dinosaur', 'Divine-Beast', 'Dragon', 'Fairy', 'Fiend', 'Fish', 'Insect', 'Illusion', 'Machine', 'Plant', 'Psychic', 'Pyro', 'Reptile', 'Rock', 'Sea Serpent', 'Spellcaster', 'Thunder', 'Warrior', 'Winged Beast', 'Wyrm', 'Zombie']
const spellRaces = ['Normal', 'Field', 'Equip', 'Continuous', 'Quick-Play', 'Ritual']
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
            console.log(queryBuilder())
            let response: Root = (await axios.get(queryBuilder())).data
            console.log(queryBuilder())
            //let response: Root = sample;
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
    // TODO adapt filter
    const queryBuilder = () => {
        var reg = new RegExp(`^${monsterType}${hasEffect}${isPendulum}${isTuner}${type}`)
        var types = monsterCardTypes.filter((cardType) => reg.test(cardType.toLowerCase()))

        // TODO : Alert si pas de filtre pour tous ceux choisi

        return `cardinfo.php?num=30&offset=30`+name+race+atk+def+(types.length > 0 ?`&type=${types.join(',').toLowerCase()}`:type)+level+attribute
        //+desc
    }

    //*************GENERIC SELECTORS******************

    // Overall type of card : Monster spell or trap
    const typeSelector = <Select
        className='row'
        label='Card type'
        name='type'
        options={cardTypes}
        onChange={({target: {value}}) => setType(value.toLowerCase() === 'unset'?'':`(?=.*${value.toLowerCase()})`)}
    />
    
    // Generic Race selector (sub type : monster type (aqua, machine, ...) or spell/trap type (normal, continuous))
    const cardSubTypeSelector = (options: string[], label: string) => <Select
        className='row'
        label={label}
        name='card-subtype'
        options={options}
        onChange={({target: {value}}) => setRace(value.toLowerCase() === 'unset'?'':`&race=${value}`)}
    />

    // Race for each type of card
    const monsterTypeSelector = cardSubTypeSelector(monsterRaces, "Monster Type")
    const spellTypeSelector = cardSubTypeSelector(spellRaces, "Spell Type")
    const trapTypeSelector = cardSubTypeSelector(trapRaces, "Trap Type")
    
    //*************MONSTER SPECIFIC SELECTORS******************
    // TODO use enum for values
    const effectSelector = <ToggleSwitch 
        className='row'
        label='Monster effect'
        name='state-e'
        radioInputs={
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
        }
    />

    const attributeSelector = <Select
        className='row'
        label='Attribute'
        name='monster-attribute'
        options={monsterAttributes}
        onChange={({target: {value}}) => setAttribute(value.toLowerCase() === 'unset'?'':`&attribute=${value}`)}
    />

    // Type of monster card : Ritual, Fusion, ...
    const monsterCardTypeSelector = <Select
        className='row'
        label='Type of Monster Card'
        name='monster-card-type'
        options={monsterTypes}
        onChange={({target: {value}}) => setMonsterType(value.toLowerCase() === 'unset'?'':`(/^(?!.*${value.toLowerCase()})/)`)}
    />

    const isPendulumSelector = <ToggleSwitch 
        className='row'
        label='Pendulum'
        name='state-p'
        radioInputs={
            [
                {
                    id: "non-pendulum",
                    name: "state-p",
                    displayName: "No",
                    checked: Boolean(isPendulum === "(?!.*pendulum)"),
                    onClick: () => setPendulum("(?!.*pendulum)")
                },
                {
                    id: "na-pendulum",
                    name: "state-p",
                    displayName: "N/A",
                    checked: Boolean(isPendulum === ""),
                    onClick: () => setPendulum("")
                },
                {
                    id: "pendulum",
                    name: "state-p",
                    displayName: "Yes",
                    checked: Boolean(isPendulum === "(?=.*pendulum)"),
                    onClick: () => setPendulum("(?=.*pendulum)")
                }
            ]
        }
    />

    const isTunerSelector = <ToggleSwitch 
        className='row'
        label='Tuner'
        name='state-t'
        radioInputs={
            [
                {
                    id: "non-tuner",
                    name: "state-t",
                    displayName: "No",
                    checked: Boolean(isTuner === "(?!.*tuner)"),
                    onClick: () => setTuner("(?!.*tuner)")
                },
                {
                    id: "na-tuner",
                    name: "state-t",
                    displayName: "N/A",
                    checked: Boolean(isTuner === ""),
                    onClick: () => setTuner("")
                },
                {
                    id: "tuner",
                    name: "state-t",
                    displayName: "Yes",
                    checked: Boolean(isTuner === "(?=.*tuner)"),
                    onClick: () => setTuner("(?=.*tuner)")
                }
            ]
        }
    />

    // TODO add enum in regex
    const levelSelector = <NumberInput
        className='row'
        label='Level / Rank'
        name='monster-level'
        value={(/\d+/.exec(level) || [""])[0]}
        onChange={({target: {value}}) => handleNumericChange(value,13,setLevel,"level")}
    />
        
    const pendulumSelector = <NumberInput
        className='row'
        label='Pendulum Scale'
        name='pendulum-scale'
        value={(/\d+/.exec(pendulumScale) || [""])[0]}
        onChange={({target: {value}}) => handleNumericChange(value,13,setPendulumScale,"scale")}
    />

    const symbolMap = new Map()
    symbolMap.set("=", '=')
    symbolMap.set("=lt", "<")
    symbolMap.set("=gt",">")

    const getSymbol = (state: string) => {
        let sub;
        if (!state) sub = "=";
        else sub = (/=[a-z]{0,2}/.exec(state) || [""])[0];
        return symbolMap.get(sub);
    }

    // TODO move regex evaluation to utils
    const changeSymbol = (state: string, setter: (val: string) => void) =>  {
        if (state) {
            let sub = (/=[a-z]{0,2}/.exec(state) || [""])[0]; // Extract the "=..."
            let nextIndex = (Array.from(symbolMap.keys()).indexOf(sub) + 1) % symbolMap.size; // Get the index in symbolMap
            setter(`${(/&[a-z]+/.exec(state) || [""])[0]}${Array.from(symbolMap.keys())[nextIndex]}${(/\d+/.exec(state) || [""])[0]}`); // Change the stat depending on new symbol
        }
    }
    
    const atkSelector = <NumberInputWithButton
        className='row'
        label='ATK'
        name='atk'
        value={(/\d+/.exec(atk) || [""])[0]}
        onChange={({target: {value}}) => handleNumericChange(value,9999,setAtk,"atk")}
        isButtonDisabled={!Boolean(atk)}
        onClick={() => changeSymbol(atk,setAtk)}
        displayName={getSymbol(atk)}
    />

    const defSelector = <NumberInputWithButton
        className='row'
        label='DEF'
        name='def'
        value={(/\d+/.exec(def) || [""])[0]}
        onChange={({target: {value}}) => handleNumericChange(value,9999,setDef,"def")}
        isButtonDisabled={!Boolean(def)}
        onClick={() => changeSymbol(def,setDef)}
        displayName={getSymbol(def)}
    />

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
            {typeSelector}

            {type.includes("monster")?
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
            }
            {type.includes("spell")?
                <>
                    {spellTypeSelector}
                </>
                :
                <></>
            }
            {type.includes("trap")?
                <>
                    {trapTypeSelector}
                </>
                :
                <></>
            }
            {
                //<button className="search-button" onClick={() => setLoadingState(true)}>Search</button>
            }
            <button className="search-button" onClick={() => {request()}}>Search</button>
        </div>
    )
}

export default Search